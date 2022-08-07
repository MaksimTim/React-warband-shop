import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { setFilters } from "../redux/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, orderType, sortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const { searchValue } = useSelector((state) => state.search);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagesCount, setPagesCount] = useState(1);
  const limit = 8;

  const fetchPizzas = () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://62ea84cfad295463258e96ec.mockapi.io/items?page=${currentPage}&limit=${limit}&${category}&sortBy=${sortType.sortProperty}&order=${orderType}${search}`
      )
      .then((res) => {
        setItems(res.data.items);
        setPagesCount(Math.ceil(res.data.count / limit));
        setIsLoading(false);
      });
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortType: sortType.sortProperty,
        orderType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, orderType, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortType
      );
      dispatch(setFilters({ ...params, sortType }));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination pagesCount={pagesCount} />
    </div>
  );
};

export default Home;
