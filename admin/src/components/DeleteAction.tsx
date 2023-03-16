import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { BsTrash } from "react-icons/bs";
import { closeCart } from "../features/ModalDel";
import { deleteUSer } from "../features/customers/customerSlice";
import { deleteCoupons } from "../features/coupon/couponSlice";
import { deleteProduct } from "../features/products/ProductSlice";
import { deleteCategory } from "../features/pCategory/pCategorySlice";
const DeleteAction = () => {
  const dispatch = useAppDispatch();
  const { data, open, isLoading } = useAppSelector((state) => state.modal);
  const closeModal = () => {
    dispatch(closeCart());
  };
  const deleteType = () => {
    if (data && data.type === "customer") {
      dispatch(deleteUSer(data.id));
    } else if (data && data.type === "coupon") {
      dispatch(deleteCoupons(data.id));
    } else if (data && data.type === "product") {
      dispatch(deleteProduct(data.id));
    } else if (data && data.type === "category") {
      dispatch(deleteCategory(data.id));
    }
    closeModal();
  };
  return (
    <>
      {open && data && (
        <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.3)] w-screen h-screen z-50 flex items-center justify-center ">
          <div className="bg-white rounded-md w-[500px] first-letter flex flex-col items-center gap-6 p-5">
            <BsTrash className="text-2xl text-red-500" />
            <p className="text-xl text-center">
              Are You Sure! Want to Delelte{" "}
              <span className="text-red-500">{data.name}</span> Record?
            </p>
            <p className="text-gray-700 text-sm text-center">
              Do you realy want to delete these records? You can't view this in
              your list anymore if you delete!
            </p>
            <div className="flex items-center gap-3">
              <button
                className="bg-gray-300 w-[120px] h-10 rounded-md hover:bg-gray-400 "
                onClick={closeModal}
              >
                No,Keep It
              </button>
              <button
                className="text-white bg-color-primary w-[120px] h-10 hover:bg-color-success rounded-md"
                onClick={deleteType}
              >
                Yes,Delete It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAction;
