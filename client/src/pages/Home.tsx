import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "swiper/css";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  Intro,
  Programs,
  Products,
  Carosel,
  BlogCard,
  Brand,
  FeatureCate,
  TopSell,
} from "../components/Home";

import { ProductCard, ProductCard2 } from "../components";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { getPCategories } from "../features/pCategory/pCategorySlice";
import {
  getProducts,
  getProductRecently,
  getProductTopRated,
  getProductSelling,
  getProductTrending,
} from "../features/products/ProductSlice";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const products = useAppSelector((state) => state.product.products);
  const dealProducts = useAppSelector((state) => state.product.sellingProducts);
  const ref = useRef<Slider>(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
  };
  useEffect(() => {
    dispatch(getProducts(""));
    dispatch(getPCategories());
    dispatch(getProductRecently());
    dispatch(getProductSelling());
    dispatch(getProductTrending());
    dispatch(getProductTopRated());
  }, []);

  return (
    <div className="bg-bg-primary">
      <Intro />
      <h2 className="mb-8 text-2xl font-semibold">Featured Categories</h2>
      <Slider {...settings}>
        {categories &&
          categories.map((item, index) => {
            return (
              <FeatureCate
                key={item._id}
                title={item.title}
                image={item.image}
              />
            );
          })}{" "}
      </Slider>

      <h2 className="text-2xl font-semibold my-5 ml-5">Popuar Products</h2>
      <div className="px-5 grid grid-cols-5 gap-4">
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
      <div className="relative">
        <h2 className="px-5 my-10 text-2xl font-semibold">Deals Of The Day</h2>
        <Link
          to="/deal"
          className="absolute right-8 top-0 text-xl text-text-color "
        >
          See all
        </Link>
        <div className="grid grid-cols-4 gap-4 px-5 mb-24">
          {dealProducts &&
            dealProducts.length > 0 &&
            dealProducts.slice(0, 4).map((item, index) => {
              return (
                <div className="" key={item._id}>
                  <ProductCard2
                    title={item.title}
                    image={item.images[0]}
                    _id={item._id}
                    discount={item.sale.discount}
                    price={item.price}
                    rating={item.totalRating}
                    key={item._id}
                    quatity={item.quantity}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <TopSell />
    </div>
  );
};

export default Home;
