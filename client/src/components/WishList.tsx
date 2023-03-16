import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { closeWisthList, removerWishlist } from "../features/auth/authSlice";
import { addCart } from "../features/cart/cartSlice";
import { motion } from "framer-motion";
const WishList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const open = useAppSelector((state) => state.auth.openWishList);
  const CloseWishList = () => {
    dispatch(closeWisthList());
  };
  const handleRemove = (id: string) => {
    dispatch(removerWishlist(id));
  };
  const handleAddCart = (product: any) => {
    dispatch(addCart({ count: 1, product: product }));
  };
  return (
    <div className="fixed  h-full w-full z-50 bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
      <motion.div
        className="w-[80%] relative  bg-white rounded-lg h-[80%]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          className="top-5 right-5 text-2xl absolute"
          onClick={CloseWishList}
        >
          <AiOutlineClose />
        </button>
        <h2 className="text-center mt-10 text-heading-color text-4xl font-[500]">
          Your Wishlist
        </h2>
        <div className="mt-5">
          <ul className="flex items-center py-2 px-3 bg-gray-200 text-heading-color">
            <li className="w-[25%]">Product</li>
            <li className="w-[25%]">Price</li>
            <li className="w-[25%]">Stock status</li>
            <li className="w-[25%]">Action</li>
          </ul>
          <div className="flex flex-col gap-2 px-2 mt-3">
            {user &&
              user.wishList?.map((item, index) => {
                return (
                  <div className="flex items-center" key={item._id}>
                    <div className="w-[25%]">
                      <div className="flex gap-3 items-center ">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-[70px] h-[70px] rounded-md"
                        />
                        <div>
                          <h2 className="mb-2 text-link-hover text-lg">
                            {item.title}
                          </h2>
                          <div className="flex items-center gap-2 text-text-color text-sm">
                            <AiFillStar className="text-rating-star-color text-xl" />
                            <span>{item.totalRating.toFixed(1)}/5</span>
                            <span>({item.totalRating} review) </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-[25%]">
                      <span className="text-link-hover text-3xl font-[500]">
                        $
                        {(
                          item.price -
                          (item.price * item.sale.discount) / 100
                        ).toFixed(2)}
                      </span>
                      {item.sale.discount > 0 && (
                        <span className="line-through text-text-color text-xl font-[500]">
                          {item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="w-[25%]">
                      <div>
                        {item.quantity > 0 ? (
                          <span className="text-in-stock-color bg-[rgba(30,148,88,0.2)] px-2 py-1 rounded-md">
                            In stock
                          </span>
                        ) : (
                          <span className="text-red-600 bg-red-200 rounded-md px-2 py-1">
                            {" "}
                            Sold out
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {item.quantity > 0 && (
                        <button
                          className="text-sm text-white rounded-md bg-link-hover h-[40px] px-2 "
                          onClick={() => handleAddCart(item)}
                        >
                          Add to cart
                        </button>
                      )}
                      <button
                        className="h-[40px] px-3 bg-gray-200 rounded-md"
                        onClick={() => handleRemove(item._id)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WishList;
