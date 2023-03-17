import React, { useEffect, useState } from "react";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { ProductCard } from "../components";
import { Category, CategoryItem } from "../components/Product";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getProducts } from "../features/products/ProductSlice";
import { getPCategories } from "../features/pCategory/pCategorySlice";
import { AiOutlineSearch } from "react-icons/ai";
import { TbArrowsSort } from "react-icons/tb";
import Pagination from "@mui/material/Pagination";
import { ColorRing } from "react-loader-spinner";

const OurStore = () => {
  const category = useAppSelector((state) => state.category.categories);
  const { products, productCount, isLoading } = useAppSelector(
    (state) => state.product
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const [grid, setGrid] = useState<number>(2);
  const [page, setPage] = React.useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const handleChange = (key: string) => {
    setSelectedCategory(key.replace("&", "%26"));
  };
  const handleSort = (e: any) => {
    setSort(e.target.value);
    const value = e.target.value;
    dispatch(
      getProducts(
        `${selectedCategory !== "" ? `category=${selectedCategory}` : ""}&${
          search !== "" ? `title=${search}` : ""
        }&${value !== "" ? `sort=${value}` : ""} `
      )
    );
  };
  const handleChangInput = (e: any) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      getProducts(
        `${selectedCategory !== "" ? `category=${selectedCategory}` : ""}&${
          search !== "" ? `title=${search}` : ""
        }&${sort !== "" ? `sort=${sort}` : ""} `
      )
    );
  };

  useEffect(() => {
    dispatch(
      getProducts(
        `${selectedCategory !== "" ? `category=${selectedCategory}` : ""}${
          search !== "" ? `&title=${search}` : ""
        }${sort !== "" ? `&sort=${sort}` : ""}${
          page > 0 ? `&page=${page}` : 1
        } `
      )
    );
    dispatch(getPCategories());
  }, [selectedCategory, search, sort, page]);

  return (
    <>
      <div className="px-5 py-10 bg-bg-primary flex gap-2">
        <div className="w-[350px] rounded-lg shadow-sm py-1 px-3 shadow-gray-400">
          <h2 className="font-semibold text-2xl border-b-[1px]  border-color-collection-pr relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[100px] after:h-[1px] after:bg-link-hover py-2">
            Category
          </h2>
          <div className="mt-4 flex flex-col gap-2 ">
            <div
              className={`flex items-center justify-between relative h-[40px] w-full py-1 border-[1px] border-gray-200 ${
                selectedCategory === "" && "border-link-hover border-[2px]"
              } mb-3 rounded-md px-2`}
              onClick={() => handleChange("")}
            >
              <div className="flex items-center gap-3">
                <IoFileTrayFullOutline className="text-4xl w-[40px] text-link-hover" />
                <h4>All</h4>
              </div>
              <span className="w-[25px] h-[25px] text-heading-color rounded-full bg-green-100 flex items-center justify-center">
                1
              </span>
            </div>
            {category &&
              category.map((item, index) => {
                return (
                  <CategoryItem
                    selectedCategory={selectedCategory}
                    handChangeSelecteCategory={(item) => handleChange(item)}
                    key={item._id}
                    img={item.image}
                    title={item.title}
                  />
                );
              })}
          </div>
        </div>
        <div className="w-full ">
          <div className="flex items-center justify-between">
            <form
              className=" flex items-center relative justify-between w-[50%]  h-[50px]"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="px-2 w-full h-full outline-link-hover  border-[2px] border-link-color rounded-lg text-text-color "
                placeholder="Search "
                onKeyDown={handleChangInput}
              />
              <button className="absolute right-2 top-[50%] -translate-y-[50%]">
                <AiOutlineSearch className="text-xl" />
              </button>
            </form>
            <div className="flex items-center border-[1px] border-color-collection-pr gap-2 py-2 px-3 rounded-md">
              <TbArrowsSort />
              <span>Sort by:</span>
              <select
                defaultValue=""
                onChange={handleSort}
                className="border-none outline-none"
              >
                <option value="">Featured</option>
                <option value="-sold">Best selling</option>
                <option value="title">Alphabetically, A-Z</option>
                <option value="-title">Alphabetically,Z-A</option>
                <option value="price">Price, low to hign</option>
                <option value="-price">Price, high to low</option>
                <option value="updateAt">Date, old to new</option>
                <option value="-updateAt">Date,new to old</option>
              </select>
            </div>
          </div>
          <div className={` grid grid-cols-4 gap-3 mt-5 `}>
            {products &&
              products.map((item, index) => {
                return (
                  <ProductCard
                    discount={item?.sale.discount}
                    images={item.images}
                    title={item.title}
                    category={item.category}
                    price={item.price}
                    rating={item.totalRating}
                    id={item._id}
                    key={item._id}
                    ratings={item.ratings}
                    quatity={item.quantity}
                  />
                );
              })}
          </div>
          <Pagination
            count={Math.round(productCount / 10) + 1}
            color="primary"
            className="mt-5"
            onChange={handleChangePage}
          />
        </div>
      </div>
      {isLoading && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgb(0,0,0,0.3)] ">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </>
  );
};

export default OurStore;
