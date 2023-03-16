import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { IoAddOutline } from "react-icons/io5";
import { HiOutlineMinus } from "react-icons/hi2";
import { ImExit } from "react-icons/im";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  deleteCart,
  decrementCart,
  incrementCart,
} from "../features/cart/cartSlice";
const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const handleDeleteCart = (id: string) => {
    dispatch(deleteCart(id));
  };
  const increamentQuanlity = (id: string) => {
    dispatch(incrementCart(id));
  };
  const descreamentQuanlity = (id: string) => {
    dispatch(decrementCart(id));
  };

  return (
    <div className="px-5 py-10">
      <h2 className="text-4xl text-heading-color font-semibold my-4">
        Your cart
      </h2>
      <div className="flex  justify-between">
        <div className="w-[70%]">
          <div className="flex mb-4 items-center bg-gray-200 py-4 rounded-[25px] text-center text-heading-color font-semibold">
            <p className="w-[40%]">Product</p>
            <p className="w-[15%]">Unit Price</p>
            <p className="w-[15%]">Quantity</p>
            <p className="w-[15%]">Total</p>
            <p className="w-[15%]">Remove</p>
          </div>
          <div className="flex flex-col gap-6">
            {cart &&
              cart.map((item, index) => {
                return (
                  <div className="flex items-center" key={index}>
                    <div className="flex items-center gap-12 w-[40%]">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-[80px] h-[90px] rounded-lg border-[1px] border-color-collection-pr"
                      />
                      <h2 className="w-[50%] text-md font-semibold text-heading-color">
                        {item.product.title}
                      </h2>
                    </div>
                    <div className="flex items-center flex-col gap-1 w-[15%]">
                      {item.product.sale.discount > 0 && (
                        <span className="line-through text-text-color text-lg">
                          ${item.product.price}
                        </span>
                      )}
                      <span className="text-heading-color text-xl font-semibold">
                        $
                        {(
                          item.product.price -
                          (item.product.price * item.product.sale.discount) /
                            100
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-3 w-[15%] text-heading-color">
                      <button
                        onClick={() => descreamentQuanlity(item.product._id)}
                      >
                        {" "}
                        <HiOutlineMinus className="text-2xl" />
                      </button>
                      <span className="text-xl">{item.count}</span>
                      <button
                        onClick={() => increamentQuanlity(item.product._id)}
                      >
                        <IoAddOutline className="text-2xl" />
                      </button>
                    </div>
                    <h4 className="text-success-color text-2xl text-center w-[15%] font-semibold">
                      $
                      {(
                        (item.product.price -
                          (item.product.price * item.product.sale.discount) /
                            100) *
                        item.count
                      ).toFixed(2)}
                    </h4>
                    <button
                      className="w-[15%] flex items-center justify-center text-text-color text-xl"
                      onClick={() => handleDeleteCart(item.product._id)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-[400px] ">
          <div className=" w-[400px] h-[180px] border-[1px] border-color-collection-pr rounded-lg px-5 py-4">
            <div className="flex justify-between   ">
              <h4 className="text-text-color">Subtotal</h4>
              <div className="flex flex-col items-end gap-3">
                <h2 className="text-link-hover text-2xl font-[500]">
                  $
                  {cart &&
                    cart.length > 0 &&
                    cart
                      .reduce((total, item) => {
                        return (
                          total +
                          (item.product.price -
                            (item.product.price * item.product.sale.discount) /
                              100) *
                            item.count
                        );
                      }, 0)
                      .toFixed(2)}
                </h2>
                <p className="text-text-color text-xs ">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
            <Link to="/checkout">
              {" "}
              <button className="w-full bg-link-hover mt-7 flex items-center justify-center gap-2 py-2 text-white rounded-md">
                <span>Proceed To Checkout</span> <ImExit />
              </button>
            </Link>
          </div>

          <Link to="/products">
            <button className="w-full bg-link-hover mt-7 flex items-center justify-center gap-2 py-2 text-white rounded-md">
              <BsArrowReturnLeft /> <span>Continue Shopping</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
