import React from "react";

interface CategoryProps {
  title: string;
  img: string;
  key: string;
  selectedCategory: string;
  handChangeSelecteCategory: (item: string) => void;
}
const CategoryItem = ({
  img,
  title,
  key,
  selectedCategory,
  handChangeSelecteCategory,
}: CategoryProps) => {
  return (
    <div
      key={key}
      className={`flex items-center justify-between relative  w-full py-1 border-[1px] border-gray-200 ${
        selectedCategory === title.replace("&", "%26") &&
        "border-link-hover border-[2px]"
      } mb-3 rounded-md px-2`}
      onClick={() => handChangeSelecteCategory(title)}
    >
      <div className="flex items-center gap-3">
        <img src={img} alt="" className="w-[40px] h-auto" />
        <h4>{title}</h4>
      </div>
      <span className="w-[25px] h-[25px] text-heading-color rounded-full bg-green-100 flex items-center justify-center">
        1
      </span>
    </div>
  );
};

export default CategoryItem;
