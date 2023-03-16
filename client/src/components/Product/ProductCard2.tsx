import React from "react";
import Rating from "@mui/material/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
interface ProductCard2 {
  title: string;
  rating: number;
  price: number;
  discount: number;
  image: string;
  _id: string;
  quatity: number;
}

const ProductCard2 = ({
  title,
  rating,
  price,
  discount,
  image,
  _id,
  quatity,
}: ProductCard2) => {
  const dispatch = useAppDispatch();
  const handleAddCart = () => {
    dispatch(
      addCart({
        count: 1,
        product: {
          _id,
          images: [image],
          price,
          sale: { discount: discount },
          title: title,
        },
      })
    );

    toast("Add to cart successfully", {
      className: "custom-toast", // đặt tên lớp CSS của riêng bạn
    });
  };
  return (
    <div className="w-full relative h-[300px] ">
      <img
        src={image}
        alt=""
        className="w-full h-[300px] object-cover rounded-xl "
      />
      <div className="absolute top-[250px] left-[50%] -translate-x-[50%] bg-white p-4 rounded-md w-[80%] hover:-translate-y-1 duration-500">
        <h2 className="font-semibold text-[17px] text-heading-color">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <Rating
            value={rating}
            name="simple-controlled"
            size="small"
            readOnly
          />
          <span>({rating.toFixed(1)})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 ">
            <span className="text-lg text-link-hover font-semibold">
              ${(price - (price * discount) / 100).toFixed(2)}
            </span>
            <span className="line-through text-md text-text-color">
              ${price.toFixed(2)}
            </span>
          </div>
          {quatity > 0 ? (
            <button
              className="bg-bg-ad-to-cart text-button-bg-color flex items-center gap-2 px-4 py-1 rounded-md hover:text-button-text-color-hover hover:bg-button-bg-color"
              onClick={handleAddCart}
            >
              <AiOutlineShoppingCart /> Add
            </button>
          ) : (
            <span className="bg-red-500 text-red-200 flex items-center gap-2 px-4 py-1 rounded-md ">
              Sold out
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
