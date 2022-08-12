import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, setCategoryId } from "../redux/slices/filterSlice";

const categories: string[] = [
  "Все",
  "Еда",
  "Питьё",
  "Материалы",
  "Ресурсы",
];

const Categories: React.FC = React.memo(() => {
  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

Categories.displayName = "Categories";

export default Categories;
