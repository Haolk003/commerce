import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { closeQuickView } from "../features/auth/authSlice";
import { addCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
interface QuickView {
  title: string;
  price: number;
  discount: number;
  totalRating: number;
  ratings: [];
  images: string[];
  id: string;
}
const QuickView = () => {
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.auth.ProductQuickView);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const handleChange = (e: any) => {
    setQuantity(e.target.value);
  };
  const CloseQuickView = () => {
    dispatch(closeQuickView());
  };
  const handleAddCart = () => {
    if (Product) {
      dispatch(
        addCart({
          count: quantity,
          product: {
            _id: Product?.id,
            images: Product.images,
            price: Product.price,
            sale: { discount: Product.discount },
            title: Product.title,
          },
        })
      );
      toast("Add to Cart successfully", {
        className: "custom-toast", // đặt tên lớp CSS của riêng bạn
      });
      CloseQuickView();
    }
  };
  useEffect(() => {
    if (Product) {
      setSelectedImage(Product?.images[0]);
    }
  }, [Product]);
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] z-[50] flex items-center justify-center ">
      {Product && (
        <div className="w-[60%] bg-white rounded-xl p-5 relative flex items-center gap-6 h-[60%] py-5 ">
          <button className="absolute top-5 right-5" onClick={CloseQuickView}>
            <AiOutlineClose />
          </button>
          <div className="w-[40%]">
            <img
              src={selectedImage}
              alt=""
              className="w-full h-auto rounded-lg"
            />
            <div className="flex gap-2 mt-2 ">
              {Product.images.length > 1 &&
                Product.images.map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt=""
                      className={`w-[100px] h-[100px] object-cover ${
                        selectedImage === item &&
                        "border-[1px] rounded-md border-link-hover"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="w-[55%] px-4 mb-3">
            <h2 className="text-heading-color text-3xl">{Product.title}</h2>
            <div className="flex items-center gap-2 my-3">
              <AiFillStar className="text-rating-star-color" />
              <p>{Product.totalRating.toFixed(1)}/5 </p>
              <span>({Product.ratings.length} reviews)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-link-hover text-5xl font-[500] mr-2">
                $
                {(
                  Product.price -
                  (Product.price * Product.discount) / 100
                ).toFixed(2)}
              </span>
              {Product.discount > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-color-2 text-md">
                    {Product.discount}% Off
                  </span>
                  <span className="text-xl line-through text-text-color font-[500]">
                    ${Product.price}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-5 mt-5 ">
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                className="w-[100px] border-[2px] border-link-hover rounded-md h-[50px] text-center"
              />
              <button
                className="flex items-center justify-center gap-4 w-[200px] h-[50px] rounded-md bg-link-hover text-white "
                onClick={handleAddCart}
              >
                <AiOutlineShoppingCart className="text-xl" />{" "}
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickView;
