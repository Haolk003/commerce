import React from "react";
import { ProductCard3 } from "../";
import { useAppSelector } from "../../store/hook";
const TopSell = () => {
  const TopSell = useAppSelector((state) => state.product.sellingProducts);
  const tredingProduct = useAppSelector(
    (state) => state.product.tredingProducts
  );
  const topRateProduct = useAppSelector((state) => state.product.topRated);
  const RecentlyAdd = useAppSelector((state) => state.product.recentlyProducts);
  return (
    <div className="grid grid-cols-4  gap-4 px-5 mb-10  ">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl relative border-b-[1px] border-color-collection-pr py-5 font-semibold text-heading-color after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[100px] after:h-[2px] after:bg-link-hover">
          Top Selling
        </h2>
        <div>
          {TopSell &&
            TopSell.length > 0 &&
            TopSell.slice(0, 5).map((item, index) => {
              return (
                <div key={item._id}>
                  {" "}
                  <ProductCard3
                    title={item.title}
                    image={item.images[0]}
                    discount={item.sale.discount}
                    id={item._id}
                    rating={item.totalRating}
                    price={item.price}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl relative border-b-[1px] border-color-collection-pr py-5 font-semibold text-heading-color after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[100px] after:h-[1px] after:bg-link-hover">
          Trending Products
        </h2>
        <div>
          {tredingProduct &&
            tredingProduct.length > 0 &&
            tredingProduct.slice(0, 5).map((item, index) => {
              return (
                <div key={item._id}>
                  {" "}
                  <ProductCard3
                    title={item.title}
                    image={item.images[0]}
                    discount={item.sale.discount}
                    id={item._id}
                    rating={item.totalRating}
                    price={item.price}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl relative border-b-[1px] border-color-collection-pr py-5 font-semibold text-heading-color after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[100px] after:h-[1px] after:bg-link-hover">
          Recently
        </h2>
        <div>
          {RecentlyAdd &&
            RecentlyAdd.length > 0 &&
            RecentlyAdd.slice(0, 5).map((item, index) => {
              return (
                <div key={item._id}>
                  {" "}
                  <ProductCard3
                    title={item.title}
                    image={item.images[0]}
                    discount={item.sale.discount}
                    id={item._id}
                    rating={item.totalRating}
                    price={item.price}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl relative border-b-[1px] border-color-collection-pr py-5 font-semibold text-heading-color after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[100px] after:h-[1px] after:bg-link-hover">
          Top Rated
        </h2>
        <div>
          {topRateProduct &&
            topRateProduct.length > 0 &&
            topRateProduct.slice(0, 5).map((item, index) => {
              return (
                <div key={item._id}>
                  {" "}
                  <ProductCard3
                    title={item.title}
                    image={item.images[0]}
                    discount={item.sale.discount}
                    id={item._id}
                    rating={item.totalRating}
                    price={item.price}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopSell;
