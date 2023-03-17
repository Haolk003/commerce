import React from "react";
import { CategoryItem } from ".";
const Category = () => {
  return (
    <div className="w-[350px] rounded-lg shadow-sm py-1 px-3 shadow-gray-400">
      <h2 className="font-semibold text-2xl border-b-[1px]  border-color-collection-pr relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[100px] after:h-[1px] after:bg-link-hover py-2">
        Category
      </h2>
      <div className="mt-4 flex flex-col gap-2"></div>
    </div>
  );
};

export default Category;
