import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../components";
import { useFormik, Formik, FormikHelpers, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import { NotLoggedInOnly } from "../components";
import { Oval } from "react-loader-spinner";
import { showToastError } from "../utils/toast";
interface Values {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();
  let userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik<Values>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    formik.setFieldValue(fieldName, fieldValue);
  };
  useEffect(() => {
    if (isError && !isLoading) {
      showToastError("Incorrect email or password");
    }
  }, [isError, isLoading]);
  return (
    <div className="py-5 h-screen">
      <div className="my-5 w-[60%] bg-white rounded-3  flex  items-center gap-5 mx-auto   rounded-md absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] shadow-md shadow-gray-300">
        <img
          src="https://dashtar-admin.vercel.app/static/media/login-office.c7786a89.jpeg"
          alt=""
          className="h-full w-[50%] object-cover"
        />
        <div className="w-[50%] px-5 flex flex-col gap-3">
          <h2 className="font-semibold text-3xl tracking-wide mb-3">Login</h2>
          <p className="mb-1">Login to your account to continue.</p>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2"
          >
            <CustomInput
              type="email"
              label="Email Address"
              i_id="email"
              val={formik.values.email}
              onCh={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
              // onBl={() => formik.handleBlur("email")}
              i_class="h-[40px] border-[2px] border-gray-400 rounded-md px-2 w-full "
            />
            <div className="text-red-500 text-sm">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              label="Password"
              i_id="password"
              val={formik.values.password}
              onCh={(e: React.ChangeEvent<HTMLInputElement>) =>
                formik.handleChange(e)
              }
              // onBl={() => formik.handleBlur("password")}
              i_class="h-[40px] border-[2px] border-gray-400 rounded-md px-2 w-full"
            />
            <div className="text-red-500 text-sm">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            {/* <div className="flex justify-end   my-4 text-blue-500 underline">
              <Link to="/forgot-password"> Forgot Password?</Link>
            </div> */}
            <button
              type="submit"
              className="border-none outline-none px-3 py-2 w-full bg-color-primary rounded-md font-semibold text-lg text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
