import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { addCart } from "../../features/cart/cartSlice";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { addWishlist, openQuickView } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClassNames } from "@emotion/react";
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgb(59, 183, 126)",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(59, 183, 126)",
  },
}));
interface ProductItemProps {
  height?: string;
  title: string;
  images: string[];
  price: number;
  rating: number;
  discount: number;
  category: string[];
  ratings: any[];
  key: string;
  id: string;
  quatity: number;
}
const ProductItem = ({
  height,
  images,
  price,
  title,
  rating,
  ratings,
  discount,
  category,
  quatity,
  id,
  key,
}: ProductItemProps) => {
  const [countItem, setCountItem] = useState(1);
  const { cart, isError, isSuccess } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleAddCart = async () => {
    dispatch(
      addCart({
        product: {
          _id: id,
          price: price,
          title: title,
          images: images,
          sale: { discount: discount },
        },
        count: 1,
      })
    );
    toast("Add to cart successfully", {
      className: "custom-toast", // đặt tên lớp CSS của riêng bạn
    });
  };
  const handleAddWishList = (id: string) => {
    dispatch(addWishlist(id));
    toast("Add to wishList successfully", {
      className: "custom-toast", // đặt tên lớp CSS của riêng bạn
    });
  };
  const handleOpenQuickView = () => {
    dispatch(
      openQuickView({
        title: title,
        images: images,
        price: price,
        discount: discount,
        id: id,
        totalRating: rating,
        ratings: ratings,
      })
    );
  };

  return (
    <div
      className={`w-full rounded-[1.5rem] h-[${height}] relative overflow-hidden hover:border-link-hover hover:shadow-md border-[1px] border-color-collection-pr shadow-sm shadow-color-collection-pr`}
      style={{ height: height }}
      key={key}
    >
      {discount > 0 && (
        <span className="absolute top-0 left-0 bg-sale-label-color text-bgsale-label-quickview rounded-tl-[1.5rem] rounded-tr-none rounded-bl-none rounded-br-[2rem] w-[70px] py-2 text-center text-[13px] z-10">
          -{discount}%
        </span>
      )}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className="group h-[280px] overflow-hidden"
      >
        <img
          src={images[0]}
          alt=""
          className="w-full h-[280px] group-hover:hidden"
        />
        <Link to={`/product/${id}`}>
          {" "}
          <motion.img
            src={images[1] ? images[1] : images[0]}
            alt=""
            className="w-full h-[280px] hidden  group-hover:block "
          />
        </Link>
        <div className="hidden group-hover:flex items-center justify-between absolute border-[1px] border-link-hover   top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white  h-[30px] w-[140px] rounded-md">
          <BootstrapTooltip title="Add to wishlish" placement="top">
            <button
              className="border-r-[1px] border-link-hover w-full h-full flex items-center justify-center"
              onClick={() => handleAddWishList(id)}
            >
              <MdFavoriteBorder />
            </button>
          </BootstrapTooltip>
          <BootstrapTooltip title="Add to compare" placement="top">
            <button className="border-r-[1px] border-link-hover w-full h-full flex items-center justify-center">
              <IoIosGitCompare />
            </button>
          </BootstrapTooltip>
          <BootstrapTooltip title="Quickview" placement="top">
            <button
              className=" border-link-hover w-full h-full flex items-center justify-center"
              onClick={() => handleOpenQuickView()}
            >
              <AiOutlineEye />
            </button>
          </BootstrapTooltip>
        </div>
      </motion.div>
      <div className="px-2 py-2 z-50">
        <p className="text-xs text-text-color mt-4">{category.join(",")}</p>
        <Link to={`/product/${id}`}>
          {" "}
          <h2 className="font-semibold text-heading-color mt-2">{title}</h2>
        </Link>
        <div className="flex items-center gap-2">
          <Rating value={rating} name="simple-controlled" size="small" />
          <span>({rating}.0)</span>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-link-hover text-lg font-semibold ">
              $
              {discount > 0
                ? `${(price - (price * discount) / 100).toFixed(2)}`
                : price}
            </span>
            {discount > 0 && (
              <span className="line-through text-color-collection-pr">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          {quatity > 0 ? (
            <button
              className="bg-bg-ad-to-cart text-button-bg-color flex items-center gap-2 px-4 py-1 rounded-md hover:text-button-text-color-hover hover:bg-button-bg-color"
              onClick={handleAddCart}
            >
              <AiOutlineShoppingCart /> Add
            </button>
          ) : (
            <p className="bg-red-100 text-red-600 flex items-center gap-2 px-4 py-1 rounded-md">
              Sold out
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
