import React from "react";
import Blog1 from "../../assets/images/blog-1.jpg";
const BlogCard = () => {
  return (
    <div className="w-full bg-white rounded-md shadow-md shadow-gray-300 pb-3 ">
      <img src={Blog1} alt="" className="w-full h-[300px] rounded-t-md" />
      <div className="px-2 mt-2">
        <p className="text-text-primary2 text-sm">11 JUNE, 2022</p>
        <h2 className="font-semibold text-md my-1.5">
          A Beatiful Sunday Morning Renalssance{" "}
        </h2>
        <p className="text-text-primary2 mb-3">
          You're Only As Good As Your Last Collection, which is An Enormous
          Pressure. I think There is Something About ...
        </p>
        <button className="bg-header-bottom py-2 px-3 rounded-[25px] text-[13px] text-white font-[500]">
          READ MORE
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
