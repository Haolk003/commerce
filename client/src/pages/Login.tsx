import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { login } from "../features/auth/authSlice";
import { showToastError } from "../utils/toast";
import { ColorRing } from "react-loader-spinner";
import { resetForm } from "../features/auth/authSlice";
interface MyFormValues {
  email: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const formik = useFormik<MyFormValues>({
    initialValues: { email: "", password: "" },
    onSubmit(values) {
      dispatch(login(values));
    },
  });
  useEffect(() => {
    if (isError && !isLoading) {
      showToastError("Incorrect email or password");
      dispatch(resetForm());
    }
  }, [isError, isLoading]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="flex  gap-10 w-[80%] mx-auto mt-10 items-center">
      <img
        src="https://cdn.shopify.com/s/files/1/0652/4570/8532/files/login-1.jpg?v=1659687784&width=1920"
        className="w-[40%] h-auto"
      />
      <form
        className="flex flex-col gap-5 mt-5 w-[60%]"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-heading-color text-5xl font-semibold ">Login</h2>
        <p>
          Don't have an account?{" "}
          <Link className="text-link-hover underline" to="/register">
            Create here
          </Link>
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
        <TextField
          type="password"
          name="password"
          id="outlined-basic2"
          value={formik.values.password}
          onChange={formik.handleChange}
          label="Password *"
          variant="outlined"
        />
        <Link to="/forgot-password">
          {" "}
          <span className="mt-2 text-text-color text-sm">
            Forgot your password
          </span>
        </Link>
        <button
          type="submit"
          className="bg-link-color text-white rounded-lg py-2 w-[100px]"
        >
          Login
        </button>
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

export default Login;
