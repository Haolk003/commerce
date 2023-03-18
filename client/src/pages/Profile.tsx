import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { AiFillEdit } from "react-icons/ai";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDropzone } from "react-dropzone";
import { Accept } from "react-dropzone";
import { uploadImage } from "../utils/uploadImg";
import { updateUser } from "../features/auth/authSlice";
import { ColorRing } from "react-loader-spinner";
type Props = {
  onFileUpload: (file: File) => void;
};

interface Values {
  firstName: string;
  lastName: string;
  address?: string;
  mobile?: string;
}

const validateSchema = object().shape({
  firstName: string().required("firstName is required"),
  lastName: string().required("lastName is required"),
});
const Profile = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user } = useAppSelector((state) => state.auth);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg"],
    },
    multiple: false,
  });

  const formik = useFormik<Values>({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      mobile: user?.mobile || "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, formikHelpers) => {
      if (selectedFile) {
        const image = await uploadImage([selectedFile]);
        if (image) {
          dispatch(updateUser({ ...values, image: image[0] }));
        }
      } else {
        await dispatch(updateUser(values));
      }
    },
  });
  //   useEffect(() => {
  //     if (user) {
  //       formik.values.firstName = user.firstName;
  //       formik.values.lastName = user.lastName;
  //       formik.values.address = user.address;
  //       formik.values.phoneNumber = user.mobile;
  //     }
  //   }, [user]);

  return (
    <>
      <form
        className="w-[50%] mx-auto my-[100px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="  flex gap-4">
          <div className="w-[30%]  flex flex-col justify-center gap-3 border-[1px] border-color-collection-pr shadow-md px-2 py-2 items-center rounded-md bg-white">
            <div
              {...getRootProps()}
              className="dropzone w-[80%] group relative "
            >
              <input {...getInputProps()} />
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile) || user?.image}
                  alt="Preview"
                  className="w-full rounded-full "
                />
              ) : isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <img src={user?.image} alt="" className="w-full rounded-full" />
              )}
              <div className=" items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] cursor-pointer rounded-full hidden group-hover:flex duration-100">
                <AiFillEdit className="text-xl" />
              </div>
            </div>
            <p className="text-center text-text-color text-sm mt-2">
              Only jpg and png files are accepted
            </p>
          </div>
          <div className="w-[70%] bg-white shadow-sm border-[1px] border-color-collection-pr px-4 py-3 h-[300px]  rounded-md shadow-color-collection-pr">
            <div className="flex flex-col h-full justify-between gap-2 ">
              <div className="border-b-[1px] border-color-collection-pr py-4 flex items-center gap-10">
                <span className="w-[200px]">First Name</span>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border-none outline-none h-full w-full"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="border-b-[1px] border-color-collection-pr py-4 flex items-center gap-10">
                <span className="w-[200px]">Last Name</span>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border-none outline-none h-full w-full"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="border-b-[1px] border-color-collection-pr py-4 flex items-center gap-10">
                <span className="w-[200px]">Address</span>
                <input
                  type="text"
                  placeholder="Address"
                  className="border-none outline-none h-full w-full"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="border-b-[1px] border-color-collection-pr py-4 flex items-center gap-10">
                <span className="w-[200px]">Phone</span>
                <input
                  type="text"
                  placeholder="Phone"
                  className="border-none outline-none h-full w-full"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded-[25px] bg-sale-price-color text-white py-3 w-[120px] float-right mt-4"
        >
          Update
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
    </>
  );
};

export default Profile;
