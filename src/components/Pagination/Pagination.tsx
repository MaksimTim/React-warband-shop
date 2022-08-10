import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import { selectPizzaData } from "../../redux/slices/pizzaSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { pagesCount } = useSelector(selectPizzaData);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={2}
      pageCount={pagesCount}
      previousLabel="<"
    />
  );
};

export default Pagination;
