import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import type { UploadProps } from "antd";
import * as yup from "yup";

import { Upload, Modal, Input, Button } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import {
  getPCategories,
  resetForm,
} from "../../features/pCategory/pCategorySlice";
import { createProduct } from "../../features/products/ProductSlice";
import { uploadImage } from "../../utils/uploadImg";
import { updateCategory } from "../../features/pCategory/pCategorySlice";
import { showToastError, showToastSuccess } from "../../utils/toast";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Value {
  title: string | undefined;
}
interface ProductProps {
  open: boolean;
  closeModal: () => void;
  category?: CategoryData;
}
interface CategoryData {
  _id: string;
  title?: string;
  isPublish?: boolean;
  image?: string;
}
const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
});
const AddProduct = ({ open, closeModal, category }: ProductProps) => {
  const dispatch = useAppDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.pCategory
  );
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length <= 0) {
      setImgErr(true);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const formik = useFormik<Value>({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values);
      if (category) {
        const files = await uploadImage(fileList);
        dispatch(
          updateCategory({
            data: { ...values, image: files[0] },
            id: category._id,
          })
        );
        formik.resetForm();
      }

      closeModal();
    },
  });
  useEffect(() => {
    if (category) {
      formik.values.title = category?.title;
      setFileList([
        {
          status: "done",
          url: category?.image ? category.image : "",
          uid: "",
          name: "",
        },
      ]);
    }
  }, [category, open]);
  useEffect(() => {
    dispatch(getPCategories(""));
  }, []);
  useEffect(() => {
    if (message === "update failure") {
      showToastError("Edit to failure categories");
      dispatch(resetForm());
    }
  }, [isError, isLoading, message]);
  useEffect(() => {
    if (message === "update successfully") {
      showToastSuccess("Edit to successfully category");
      dispatch(resetForm());
    }
  }, [message]);
  return (
    <div>
      <Drawer
        open={open}
        placement="right"
        title="Add Category"
        width={700}
        className="pb-20"
        closable={false}
        extra={
          <button
            onClick={closeModal}
            className="bg-white p-3 rounded-full shadow-md shadow-gray-300 text-color-notifi-primary"
          >
            <AiOutlineClose />
          </button>
        }
      >
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between mt-5 items-center w-full">
            <h2 className="font-semibold text-lg">Category Icon</h2>
            <div className="w-[60%]">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Category Title</h2>
            <div className="w-[60%]">
              <Input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="w-full mt-4 h-12 bg-gray-100 focus:bg-white"
                placeholder="Product Title"
              />
              <div className="text-red-500 text-md">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 bg-gray-100 py-6 w-full flex justify-between px-5 gap-2">
            <Button
              className="bg-gray-300 h-[40px] w-full text-color-notifi-primary rounded-md text-md font-semibold"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className=" w-full rounded-md text-md h-[40px] font-semibold bg-color-primary text-white"
            >
              Add Product
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default AddProduct;
