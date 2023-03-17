import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { forgotPassword } from "../features/auth/authSlice";
import { showToastError } from "../utils/toast";
import { ColorRing } from "react-loader-spinner";
import { resetForm } from "../features/auth/authSlice";
interface MyFormValues {
  email: string;
}
const ForgotPass = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const formik = useFormik<MyFormValues>({
    initialValues: { email: "" },
    onSubmit(values) {
      dispatch(forgotPassword(values.email));
    },
  });
  useEffect(() => {
    if (isError && !isLoading) {
      showToastError("Email does not exist");
      dispatch(resetForm());
    }
  }, [isError, isLoading]);
  useEffect(() => {
    dispatch(resetForm());
  }, []);
  return (
    <div className="flex  gap-12 w-[60%] mx-auto h-screen items-center">
      <img
        src="https://cdn.shopify.com/s/files/1/0652/4570/8532/files/login-1.jpg?v=1659687784&width=1920"
        className="w-[40%] h-auto"
      />
      <form
        className="flex flex-col gap-10 mt-5 w-[60%]"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-heading-color text-5xl font-semibold ">
          Forgot Password
        </h2>
        <p className="text-sm text-text-color">
          Not to worry, we got you! Let's get you a new password.Please enter
          your email.
        </p>
        <TextField
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          id="outlined-basic"
          label="Email *"
          variant="outlined"
        />
        <div>
          <button
            type="submit"
            className="bg-link-color text-white rounded-lg py-2 w-[200px]"
          >
            Reset Password
          </button>
          <Link to="/login" type="button" className="text-link-hover ml-3">
            Cancel
          </Link>
        </div>
      </form>
      {isLoading && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-[rgb(0,0,0,0.3)] ">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </div>
  );
};

export default ForgotPass;
