import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { EditProduct } from "../components";
import { getProduct } from "../features/products/ProductSlice";
const ProductDetail = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const OpenModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const { product, isError, isLoading, message } = useAppSelector(
    (state) => state.product
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct(`${id}`));
  }, [id]);
  return (
    <div key={id} className="">
      <h2 className="text-xl mb-4 font-semibold">Product Details</h2>
      <div className="flex items-center gap-5">
        <img
          src={product?.images[0]}
          alt=""
          className="w-[50%] h-[600px] bg-white "
        />
        <div className="w-[50%] text-gray-700  gap-3">
          <div className="mb-4">
            Status:{" "}
            <span className="text-color-primary">This Product Showing</span>
          </div>
          <h2 className="text-3xl font-semibold mb-4">{product?.title}</h2>
          <p className="text-2xl font-semibold mb-4">${product?.price}</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-color-primary bg-green-200 rounded-[25px] px-2 text-sm">
              In Stock
            </span>
            <span className="font-semibold">Quantity: {product?.quantity}</span>
          </div>
          <p className="text-md text-gray-500 leading-8 mb-4">
            {product?.description}
          </p>
          <div className="text-lg font-semibold mb-4">
            Category: <span className="text-gray-700">{product?.category}</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {product?.tags.map((item, index) => {
              return (
                <span
                  key={index}
                  className="bg-gray-200 rounded-[25px] px-3 text-sm py-1"
                >
                  {item}
                </span>
              );
            })}
          </div>
          <button
            className="bg-color-primary text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={OpenModal}
          >
            Edit button
          </button>
        </div>
      </div>
      <EditProduct product={product} closeModal={closeModal} open={open} />
    </div>
  );
};

export default ProductDetail;
