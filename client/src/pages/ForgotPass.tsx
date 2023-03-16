import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { login } from "../features/auth/authSlice";
import { NotLoggedInOnly } from "../components";
import { forgotPassword } from "../features/auth/authSlice";
interface MyFormValues {
  email: string;
}
const ForgotPass = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const formik = useFormik<MyFormValues>({
    initialValues: { email: "" },
    onSubmit(values) {
      dispatch(forgotPassword(values.email));
    },
  });
  useEffect(() => {
    console.log(user);
  }, [user]);
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
          <button type="button" className="text-link-hover ml-3">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotLoggedInOnly(ForgotPass);
