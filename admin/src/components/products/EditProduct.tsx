import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { useFormik } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showToastError, showToastSuccess } from "../../utils/toast";
import type { UploadProps } from "antd";
import * as yup from "yup";
import {
  message,
  Upload,
  Modal,
  Input,
  Select,
  Button,
  Tag,
  TimePicker,
  InputNumber,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { EventValue } from "rc-picker/lib/interface";
import { getPCategories } from "../../features/pCategory/pCategorySlice";
import { updateProduct } from "../../features/products/ProductSlice";
import { uploadImage } from "../../utils/uploadImg";
import { getProduct } from "../../features/products/ProductSlice";
import { resetForm } from "../../features/pCategory/pCategorySlice";
import dayjs, { Dayjs } from "dayjs";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface UserState {
  _id: string;
  title: string;
  price: number;
  category: string[];
  quantity: number;
  stock: number;
  images: string[];
  slug: string;
  description: string;
  tags: string[];
  sale?: {
    startDate?: Date | null;
    endDate?: Date | null;
    discount?: number | null;
  };
}
interface Value {
  title: string;

  slug: string;
  description: string;
  category: string[];
  quantity: number;
  price: number;
  tags?: string[];
}
interface ProductProps {
  open: boolean;
  closeModal: () => void;
  product: UserState | undefined;
}
const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.array().min(1, "Category is required"),
  price: yup.number().required("Price is Required"),
  quantity: yup.number().required("Quantity is required"),
});
const EditProduct = ({ open, closeModal, product }: ProductProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.pCategory.categories);
  const { message, isLoading } = useAppSelector((state) => state.product);
  const newCategories =
    categories &&
    categories.reduce((arr: any, item: any) => {
      return [...arr, { value: item.title, label: item.title }];
    }, []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs]>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [discount, setDiscount] = useState<number | null>();
  const handleCancel = () => setPreviewOpen(false);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      formik.setFieldValue("images", tags);
    }

    setInputValue("");
  };

  const handleTagClose = (tag: any) => {
    setTags(tags.filter((t) => t !== tag));
  };
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
  useEffect(() => {
    if (product) {
      formik.values.title = product.title;
      formik.values.slug = product.slug;
      formik.values.category = product?.category;
      formik.values.price = product.price;
      formik.values.quantity = product.quantity;
      formik.values.description = product.description;
      formik.values.tags = product.tags;
      setTags(product.tags);
      setFileList(
        product.images.reduce((arr: any, item) => {
          return [...arr, { status: "done", url: item }];
        }, [])
      );
      if (product.sale?.startDate) {
        setTimeRange([
          dayjs(product.sale?.startDate),
          dayjs(product.sale?.endDate),
        ]);
      } else {
        setTimeRange(undefined);
      }
      setDiscount(product.sale?.discount);
    }
  }, [product, open]);

  const formik = useFormik<Value>({
    initialValues: {
      title: "",
      category: [],
      slug: "",
      description: "",
      quantity: 0,
      price: 0,
      tags: [],
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const files = await uploadImage(fileList);

      await dispatch(
        updateProduct({
          product: {
            ...values,
            images: files,
            tags: tags,
            sale: {
              discount: discount,
              startDate: timeRange ? timeRange[0].toDate() : null,
              endDate: timeRange ? timeRange[1].toDate() : null,
            },
          },
          id: `${product?._id}`,
        })
      );
      setTimeRange(undefined);
      setDiscount(null);
      setFileList([]);
      formik.resetForm();
      setTags([]);
      closeModal();
    },
  });
  useEffect(() => {
    if (message === "edit product sucessfully") {
      showToastSuccess("Update Successfully Product");
      dispatch(resetForm());
    } else if (message === "edit product failure") {
      showToastError("Update Failure Product");
      dispatch(resetForm());
    }
  }, [message]);
  useEffect(() => {
    dispatch(getPCategories(""));
  }, []);
  return (
    <div>
      <Drawer
        open={open}
        placement="right"
        title="Edit Product"
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
            <h2 className="font-semibold text-lg">Product Image</h2>
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
              <div className="text-red-500 text-sm">
                {imgErr && "Images is required"}
              </div>
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Product Title</h2>
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
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Product Slug</h2>

            <Input
              type="text"
              name="slug"
              value={formik.values.slug}
              onChange={formik.handleChange}
              className="w-[60%] mt-4 h-12 bg-gray-100 focus:bg-white"
              placeholder="Product Slug"
            />
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Product Description</h2>
            <div className="w-[60%]">
              <Input.TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={5}
                className="w-full mt-4 bg-gray-100 focus:bg-white"
                placeholder="Product Description"
              />
              <div className="text-red-500 text-md">
                {formik.touched.description && formik.errors.description}
              </div>
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Category</h2>
            <div className="w-[60%]">
              <Select
                mode="multiple"
                value={formik.values.category}
                onChange={(value) => formik.setFieldValue("category", value)}
                size="large"
                className="w-full mt-4 bg-gray-100 focus:bg-white"
                placeholder="Product Description"
                options={newCategories}
              />
              <div className="text-red-500 text-md">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Product Quantity</h2>
            <div className=" w-[60%]">
              <Input
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                className="w-full mt-4 h-12 bg-gray-100 focus:bg-white"
                placeholder="Product Quantity"
              />
              <div className="text-red-500 text-md">
                {formik.touched.quantity && formik.errors.quantity}
              </div>
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Product Price</h2>
            <div className="w-[60%]">
              <Input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="w-full mt-4 h-12 bg-gray-100 focus:bg-white"
                placeholder="Product Price"
              />
              <div className="text-red-500 text-md">
                {formik.touched.price && formik.errors.price}
              </div>
            </div>
          </div>

          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Sale Price</h2>
            <div className="w-[60%]">
              <InputNumber
                className="w-full mt-4 h-12 bg-gray-100 focus:bg-white"
                placeholder="Sale Price"
                value={discount}
                onChange={(value) => setDiscount(value)}
              />
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Expiry</h2>
            <div className="w-[60%]">
              <TimePicker.RangePicker
                value={timeRange}
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(value, timeString) => {
                  const startTime = dayjs(timeString[0], "YYYY-MM-DD HH:mm:ss");
                  const endTime = dayjs(timeString[1], "YYYY-MM-DD HH:mm:ss");
                  setTimeRange([startTime, endTime]);
                }}
              />
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Product Tag</h2>
            <div className="w-[60%]">
              <div className="w-full border-[1px] border-gray-200 rounded-md bg-gray-100 flex flex-wrap items-center gap-1 p-2">
                {tags.map((tag) => (
                  <Tag closable onClose={() => handleTagClose(tag)} key={tag}>
                    {tag}
                  </Tag>
                ))}

                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                  style={{ width: "auto" }}
                  className="h-8 w-12 border-none "
                />
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

export default EditProduct;
