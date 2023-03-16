import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Stripe from "stripe";
import { useFormik } from "formik";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { object, string } from "yup";
import { Audio, BallTriangle } from "react-loader-spinner";
import {
  parsePhoneNumberFromString,
  parsePhoneNumber,
  isValidNumber,
} from "libphonenumber-js";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Checkbox } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { GetCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/order/orderSlice";
import { RemoveAllCart } from "../features/cart/cartSlice";
import { updateUser } from "../features/auth/authSlice";
import { PaymentMethodResult } from "@stripe/stripe-js";
import { checkCoupon } from "../features/coupon/couponSlice";

interface CheckoutProps {
  address: string;
  phoneNumber: string;
}
const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "blue",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

interface PaymentMethodCardData {
  card: any;
}
const validateSchema = object().shape({
  phoneNumber: string().test(
    "phoneNumber",
    "Số điện thoại không hợp lệ",
    (value) => {
      if (!value) {
        return false;
      }

      return isValidNumber(value, "VN");
    }
  ),
  address: string().required("Địa chỉ là bắt buộc"),
});
const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector((state) => state.auth.user);
  const [couponCode, setCouponCode] = useState("");
  const [checkSave, setCheckSave] = useState(false);
  const { isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.order
  );
  const {
    coupon,
    isLoading: loadingCoupon,
    isError: ErrCoupon,
    isSuccess: ErrSucess,
  } = useAppSelector((state) => state.coupon);
  const formik = useFormik<CheckoutProps>({
    initialValues: {
      address: user?.address ? user.address : "",
      phoneNumber: user?.mobile ? user.mobile : "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, formikHelpers) => {
      if (!stripe || !elements) {
        return;
      }

      const paymentMethodData: PaymentMethodCardData = {
        card: elements?.getElement(CardElement),
      };

      const result: PaymentMethodResult | undefined =
        await stripe?.createPaymentMethod({
          type: "card",
          card: paymentMethodData.card,
        });

      if (result.paymentMethod && cart.length > 0) {
        if (coupon) {
          await dispatch(
            addOrder({
              ...values,
              COD: true,
              tripeId: `${result.paymentMethod.id}`,
              couponApplied: coupon.code,
            })
          );
        } else {
          await dispatch(
            addOrder({
              ...values,
              COD: true,
              tripeId: `${result.paymentMethod.id}`,
            })
          );
        }
      }
      if (checkSave) {
        await dispatch(
          updateUser({ address: values.address, mobile: values.phoneNumber })
        );
      }
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckSave(event.target.checked);
  };
  const handleApplyCoupon = () => {
    dispatch(checkCoupon(couponCode));
  };
  useEffect(() => {
    dispatch(GetCart());
  }, []);
  useEffect(() => {
    if (isSuccess) {
      dispatch(RemoveAllCart());
      formik.resetForm();
    }
  }, [isSuccess]);
  useEffect(() => {
    console.log(coupon);
  }, [coupon]);
  return (
    <div className="flex h-screen">
      <div className="w-[50%] flex justify-end px-10 bg-white py-10 ">
        <div className="w-[80%]">
          <h2 className="text-3xl text-heading-color mb-4 ">boostify nesst</h2>
          <h4 className="text-xl mt-5">Contact infomation</h4>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              placeholder="Mobile phone number"
              className="w-full h-[50px] border-[1px] border-color-collection-pr rounded-md bg-transparent px-4 mt-3  outline-blue-400"
            />
            <span className="text-error-color">
              {formik.touched.phoneNumber && formik.errors.phoneNumber}
            </span>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Address"
              className="w-full h-[50px] border-[1px] border-color-collection-pr rounded-md bg-transparent px-4 mt-5  outline-blue-400"
            />
            <span className="text-error-color">
              {formik.touched.address && formik.errors.address}
            </span>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <h2 className="text-lg mt-5">Credit Card Number</h2>
                <CardElement
                  className="py-4 w-full border-[1px] border-color-collection-pr rounded-md px-3 text-blue-400"
                  options={CARD_OPTIONS}
                />
              </div>
            </fieldset>
            <div className="flex items-center gap-1">
              <Checkbox onChange={handleChange} checked={checkSave} />
              <span className="text-text-color">
                Save this infomation for next time
              </span>
            </div>
            <button className="bg-blue-500 w-full h-[50px] rounded-lg mt-5 text-white text-xl font-[500] hover:bg-blue-700">
              Pay
            </button>
          </form>

          <div className="flex items-center justify-between mt-8">
            <Link to="/cart">
              <button className="flex items-center gap-2 text-blue-600">
                <BsArrowReturnLeft />
                <span>Return to cart</span>
              </button>
            </Link>
            <Link to="/products">
              <button className="bg-blue-600 text-white h-[50px] rounded-md w-[200px]">
                Continue to shipping
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[50%] pl-10 py-10 bg-gray-100">
        <div className="w-[70%] flex flex-col gap-4">
          <div className="h-[50%]  flex flex-col gap-5 py-3 overflow-auto">
            {cart &&
              cart.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex  items-center gap-2 justify-between"
                  >
                    <div className="w-[70px] h-[70px] rounded-md shadow-sm relative">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-full h-full object-cover rounded-sm"
                      />
                      <span className="absolute -top-2 -right-2 bg-link-color rounded-full w-[20px] h-[20px] text-white text-center leading-[20px] text-xs">
                        {item.count}
                      </span>
                    </div>
                    <h2 className="text-md font-semibold w-[70%]">
                      {item.product.title}
                    </h2>
                    <span className="font-[500]">
                      $
                      {(
                        item.product.price -
                        (item.product.price * item.product.sale.discount) / 100
                      ).toFixed(2)}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center border-t-[1px] border-color-collection-pr py-3 justify-between ">
            <input
              type="text"
              placeholder="Discount code"
              className={`w-[80%] h-[45px] border-[1px] border-color-collection-pr px-2 rounded-md outline-blue-500 ${
                !coupon && ErrCoupon && "border-red-500"
              }`}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="bg-slate-500 text-white rounded-md w-[80px] h-[45px]"
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>
          <div className="border-color-collection-pr border-t-[1px] py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-text-color text-sm">Subtotal</h2>
              <span className="text-xl ">
                {" "}
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
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-text-color text-sm">Shipping</h2>
              <span className="text-xl">$5.00</span>
            </div>
          </div>
          <div className="border-t-[1px] border-color-collection-pr py-3 flex items-center justify-between">
            <h2 className="text-heading-color text-xl">Total</h2>
            <div className="text-2xl font-[500] text-heading-color">
              {" "}
              $
              {cart && cart.length > 0 && coupon
                ? (
                    cart.reduce((total, item) => {
                      return (
                        total +
                        (item.product.price -
                          (item.product.price * item.product.sale.discount) /
                            100) *
                          item.count
                      );
                    }, 5) -
                    (cart.reduce((total, item) => {
                      return (
                        total +
                        (item.product.price -
                          (item.product.price * item.product.sale.discount) /
                            100) *
                          item.count
                      );
                    }, 5) *
                      coupon.discount) /
                      100
                  ).toFixed(2)
                : cart
                    .reduce((total, item) => {
                      return (
                        total +
                        (item.product.price -
                          (item.product.price * item.product.sale.discount) /
                            100) *
                          item.count
                      );
                    }, 5)
                    .toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="absolute z-40 top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-screen flex items-center justify-center  ">
          <BallTriangle
            height="80"
            width="80"
            // radius="9"
            color="green"
            ariaLabel="loading"
            // wrapperStyle
            // wrapperClass
          />
        </div>
      )}
    </div>
  );
};
export default Checkout;
