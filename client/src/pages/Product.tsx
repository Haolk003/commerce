import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import Rating from "@mui/material/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { TbGitCompare } from "react-icons/tb";
import { getProduct } from "../features/products/ProductSlice";
import { Rating as RatingProduct } from "../features/products/ProductSlice";
import { useFormik } from "formik";
import { addCart } from "../features/cart/cartSlice";
import { addWishlist } from "../features/auth/authSlice";
import yup, { string, number, object } from "yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";
interface FormikProps {
  comment: string;
  rating: number;
}
const validateChema = object().shape({
  comment: string().required("Comment is required"),
  rating: number().required("Rating is required"),
});
const Product = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.auth.user);

  const { id } = useParams();
  const [rating, setRating] = useState<number | null>(0);
  const [openReview, setOpenReview] = useState(false);
  const [count, setCount] = useState(1);
  const ToggleModalReview = () => {
    setOpenReview(!openReview);
  };
  const product = useAppSelector((state) => state.product.product);
  const checkUser = product?.ratings.find(
    (item) => item.postedBy._id === user?._id
  );
  const handleAddCart = () => {
    if (product)
      dispatch(
        addCart({
          product: {
            _id: product?._id,
            images: product?.images,
            price: product?.price,
            sale: product?.sale,
            title: product?.title,
          },
          count: count,
        })
      );
    toast("Add to cart successfully", {
      className: "custom-toast", // đặt tên lớp CSS của riêng bạn
    });
  };
  const handleAddWishList = () => {
    if (product) {
      dispatch(addWishlist(product._id));
    }
    toast("Add to wishList successfully", {
      className: "custom-toast", // đặt tên lớp CSS của riêng bạn
    });
  };
  const [image, setImage] = useState(product?.images ? product.images[0] : "");
  const formik = useFormik<FormikProps>({
    initialValues: { comment: "", rating: 0 },
    validationSchema: validateChema,
    onSubmit: async (values, formikHelpers) => {
      await dispatch(
        RatingProduct({
          star: values.rating,
          comment: values.comment,
          proId: `${product?._id}`,
        })
      );
      setOpenReview(false);
      formik.resetForm();
    },
  });
  useEffect(() => {
    dispatch(getProduct(`${id}`));
  }, [id]);
  useEffect(() => {
    setImage(`${product?.images[0]}`);
    if (checkUser) {
      formik.values.comment = checkUser.comment;
      formik.values.rating = checkUser.star;
    }
    console.log(product);
  }, [product]);

  return (
    <div className="px-5">
      <div className="flex mt-8 gap-8 w-[80%] mx-auto ">
        <div className="w-[50%]">
          <img
            src={image}
            alt=""
            className="w-full border-[1px] border-color-collection-pr rounded-lg"
          />
          <div className="flex items-center gap-4 justify-center">
            {product?.images &&
              product.images.map((item, index) => {
                return (
                  <img
                    src={item}
                    key={index}
                    alt=""
                    className="w-[80px] h-[80px] object-cover "
                    onClick={() => setImage(item)}
                  />
                );
              })}
          </div>
        </div>
        <div className="mt-2 w-[50%]">
          <h2 className="font-semibold text-4xl mb-4">{product?.title}</h2>
          <div className="flex items-center gap-1">
            <Rating
              name="read-only"
              value={product?.totalRating || 3}
              readOnly
            />
            <span>({product?.totalRating})</span>
          </div>
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-5xl text-link-hover my-10">
              $
              {product?.sale?.discount && product?.sale?.discount > 0
                ? `${(
                    product.price -
                    (product.price * product.sale.discount) / 100
                  ).toFixed(2)}`
                : product?.price}
            </h1>
            {product && product?.sale?.discount > 0 && (
              <div className="flex flex-col ">
                <span className="text-color-2">
                  {product?.sale.discount}% Off{" "}
                </span>
                <span className="text-text-color text-xl line-through">
                  ${product.price}
                </span>
              </div>
            )}
          </div>
          <p className="text-text-color text-lg ">{product?.description}</p>

          <div className="flex items-center mt-8 gap-3  ">
            <input
              type="number"
              value={count}
              onChange={(e: any) => setCount(e.target.value)}
              className="border-[2px] rounded-md w-24 pl-10 border-link-hover text-link-hover h-[50px] outline-none"
            />
            {product && product?.quantity > 0 ? (
              <button
                className="bg-link-hover h-[50px] w-[170px] flex items-center gap-4 rounded-md justify-center text-white"
                onClick={handleAddCart}
              >
                <AiOutlineShoppingCart />
                <span>Add To Cart</span>
              </button>
            ) : (
              <span className="bg-gray-700 text-white opacity-20 h-[50px] w-[170px] rounded-md flex items-center justify-center">
                Out Of Stock
              </span>
            )}
            <button
              className="w-[50px] h-[50px] rounded-md border-[1px] border-color-collection-pr text-xl flex items-center justify-center"
              onClick={handleAddWishList}
            >
              <MdFavoriteBorder />
            </button>
            <button className="w-[50px] h-[50px] rounded-md border-[1px] border-color-collection-pr text-xl flex items-center justify-center">
              <TbGitCompare />
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border-[1px] border-color-collection-pr flex flex-col w-[70%] mt-10 p-10">
        <h2 className="text-2xl font-[500] text-heading-color mb-2">
          {checkUser ? "Your comment" : "Add a review"}
        </h2>
        {checkUser && (
          <div className="rounded-lg border-[1px] border-color-collection-pr w-full py-3 px-5 shadow-sm">
            <Rating value={checkUser.star} readOnly size="small" />
            <div>
              <span className="text-heading-color text-sm font-semibold mr-1">
                {checkUser.postedBy.lastName} {checkUser.postedBy.firstName}
              </span>
              <span className="text-text-color mr-1">on</span>
              <span className="text-sm text-heading-color">
                {dayjs(checkUser.time).locale("en").format("MMM DD, YYYY")}
              </span>
            </div>
            <p>{checkUser.comment}</p>
          </div>
        )}

        <button
          className="h-[40px] w-[150px] rounded-md bg-link-hover my-5 text-white"
          onClick={ToggleModalReview}
        >
          {checkUser ? "Repare comment" : " Write a review"}
        </button>
        {openReview && (
          <div>
            <form
              className="border-t-[1px] border-color-collection-pr my-5 py-5"
              onSubmit={formik.handleSubmit}
            >
              <h2 className="text-md font-semibold text-heading-color mb-2">
                {checkUser ? "Repare comment" : " Write a review"}
              </h2>
              <Rating
                name="simple-controlled"
                value={formik.values.rating}
                onChange={(event, newValue) => {
                  formik.setFieldValue("rating", newValue);
                }}
              />
              <textarea
                className="rounded-md border-color-collection-pr px-4 py-3 w-full h-[200px] placeholder:text-text-color border-[1px] outline-link-hover "
                placeholder="Write Comment "
                value={formik.values.comment}
                onChange={(e) =>
                  formik.setFieldValue("comment", e.target.value)
                }
              />
              <button
                type="submit"
                className="rounded-md bg-link-hover w-[150px] h-[45px] text-white mt-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
        <Rating
          name="read-only"
          value={product?.totalRating || 0}
          readOnly
          size="small"
        />
        <p className="mb-3 text-sm text-text-color mt-1">
          Based on {product?.ratings.length} review
        </p>

        <div className="mt-5 flex flex-col gap-2">
          {product &&
            product.ratings.map((item, index) => {
              return (
                <div className="rounded-lg border-[1px] border-color-collection-pr w-full py-3 px-5 shadow-sm">
                  <Rating value={item.star} readOnly size="small" />
                  <div>
                    <span className="text-heading-color text-sm font-semibold mr-1">
                      {item.postedBy.lastName} {item.postedBy.firstName}
                    </span>
                    <span className="text-text-color mr-1">on</span>
                    <span className="text-sm text-heading-color">
                      {dayjs(item.time).locale("en").format("MMM DD, YYYY")}
                    </span>
                  </div>
                  <p>{item.comment}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Product;
