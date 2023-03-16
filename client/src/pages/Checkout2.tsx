import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Checkout } from ".";
const PUBLIC_KEY =
  "pk_test_51M0SbXFVVOtfRhpqylcU9PZ7BtU1bloIVqj5wJQUfYnzXHX8xilN2SdNC8M4bshySarnneK4k1V1aVmKefSc4g8E00Z1yfn929";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Checkout2 = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <Checkout />
    </Elements>
  );
};

export default Checkout2;
