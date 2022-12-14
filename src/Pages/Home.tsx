import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import qs from "qs";
import {
  ActionTypeBBB,
  selectFilter,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import { selectorSearch } from "../redux/slices/searchSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, orderType, sortType, currentPage } =
    useSelector(selectFilter);
  const { searchValue } = useSelector(selectorSearch);
  const { items, limit, status } = useSelector(selectPizzaData);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({ category, search, limit, orderType, sortType, currentPage })
    );
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
      console.log(params);
      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortType
      );

      const actionAAA: ActionTypeBBB = {
        categoryId: String(params.categoryId),
        currentPage: String(params.currentPage),
        orderType: String(params.orderType),
        sortType: sortType || sortList[0],
      };
      dispatch(setFilters(actionAAA));
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все товары</h2>
      {status === "error" ? (
        <div>
          <h2>Произошла ошибка</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
