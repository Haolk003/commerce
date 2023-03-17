import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useFormik } from "formik";
import { object, string } from "yup";
import { register, resetForm } from "../features/auth/authSlice";
import { ColorRing } from "react-loader-spinner";
import { showToastError } from "../utils/toast";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const validateSchema = object().shape({
  firstName: string().required("firstName is required"),
  lastName: string().required("lastName is required"),
  email: string().required("email is required"),
  password: string()
    .required("password is required")
    .min(8, "Password must be at least 8 characters"),
});
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );
  const [request, setRequest] = useState(false);
  const formik = useFormik<Values>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, formikHelpers) => {
      await dispatch(register(values));
    },
  });
  useEffect(() => {
    if (isSuccess && !isError) {
      navigate("/login");
      formik.resetForm();
      dispatch(resetForm());
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    dispatch(resetForm());
  }, []);
  useEffect(() => {
    if (isError && !isLoading) {
      showToastError("Email already exists");
      dispatch(resetForm());
    }
  }, [isError, isLoading]);

  return (
    <form
      className=" gap-10 w-[50%] mx-auto mt-10 flex flex-col"
      onSubmit={formik.handleSubmit}
    >
      <h2 className="text-heading-color text-5xl font-semibold ">Register</h2>
      <p>
        Already have an account? Log in{" "}
        <Link to="/login">
          <span className="text-link-hover underline">Create here</span>
        </Link>
      </p>
      <div className="flex items-center gap-2 w-full">
        <div className="w-full relative">
          <TextField
            type="text"
            id="outlined3-basic"
            name="firstName"
            label="First Name *"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <span className="text-error-color text-sm absolute -bottom-6 left-0">
            {formik.touched.firstName && formik.errors.firstName}
          </span>
        </div>
        <div className="w-full relative">
          <TextField
            type="text"
            id="outlined4-basic"
            label="Last Name *"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <span className="text-error-color text-sm absolute -bottom-6 left-0">
            {formik.touched.lastName && formik.errors.lastName}
          </span>
        </div>
      </div>
      <div className="relative w-full">
        <TextField
          type="email"
          id="outlined-basic"
          label="Email *"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full"
        />
        <span className="text-error-color text-sm absolute -bottom-6 left-0">
          {formik.touched.email && formik.errors.email}
        </span>
      </div>
      <div className="w-full relative">
        <TextField
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          id="outlined-basic2"
          label="Password *"
          variant="outlined"
          className="w-full"
        />
        <span className="text-error-color text-sm absolute -bottom-6 left-0">
          {formik.touched.password && formik.errors.password}
        </span>
      </div>
      <button
        type="submit"
        className="bg-link-hover text-white rounded-lg py-3 w-[250px] text-xl hover:bg-link-color"
      >
        Submit & Register
      </button>
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
    </form>
  );
};

export default Register;
