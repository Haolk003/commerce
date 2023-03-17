import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { login } from "../features/auth/authSlice";
import { NotLoggedInOnly } from "../components";
import {
  forgotPassword,
  resetPassword,
  resetForm,
} from "../features/auth/authSlice";
import { string, object } from "yup";
interface MyFormValues {
  password: string;
  comfimPassword: string;
}
const validateSchema = object().shape({
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  comfimPassword: string().test(
    "match",
    "Password do not match",
    function (value) {
      return value === this.parent.password;
    }
  ),
});
const ResetPass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading, isError, message } = useAppSelector(
    (state) => state.auth
  );
  const formik = useFormik<MyFormValues>({
    initialValues: { password: "", comfimPassword: "" },
    validationSchema: validateSchema,
    onSubmit(values) {
      dispatch(resetPassword({ id: `${id}`, password: values.password }));
    },
  });
  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      dispatch(resetForm());
      navigate("/login");
    }
  }, [isSuccess]);
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
          Reset Password
        </h2>
        <p className="text-sm text-text-color">Please enter new password.</p>
        <div className="relative">
          <TextField
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            id="outlined-basic"
            label="Password *"
            variant="outlined"
            className="w-full"
          />
          {formik.touched.password && (
            <span className="text-error-color absolute -bottom-6 text-sm left-0">
              {formik.errors.password}
            </span>
          )}
        </div>
        <div className="relative">
          <TextField
            type="password"
            name="comfimPassword"
            value={formik.values.comfimPassword}
            onChange={formik.handleChange}
            id="outlined-basic"
            label="Confim Password "
            variant="outlined"
            className="w-full"
          />
          {formik.touched.comfimPassword && (
            <p className="text-error-color text-sm absolute -bottom-6 left-0">
              {formik.errors.comfimPassword}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-link-color text-white rounded-lg py-2 w-[200px]"
          >
            Reset Password
          </button>
          <Link to="/login">
            {" "}
            <button type="button" className="text-link-hover ml-3">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
