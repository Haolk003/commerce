import React, { useEffect, useState } from "react";
import { Drawer, InputNumber } from "antd";
import { useFormik, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import moment, { Moment } from "moment";
import type { UploadProps } from "antd";
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";

import {
  message,
  Upload,
  Modal,
  Input,
  Select,
  Button,
  Tag,
  TimePicker,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import { getPCategories } from "../../features/pCategory/pCategorySlice";
import { updateCoupons } from "../../features/coupon/couponSlice";
import { RangeValue } from "rc-picker/lib/interface";
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface CouponData {
  name: string;
  startDate: string;
  endDate: string;
  code: string;
  _id: string;
  discount: number;
}
interface Value {
  name: string;
  code: string;
  discount: number;
}
interface ProductProps {
  open: boolean;
  closeModal: () => void;
  coupon: CouponData;
}

const schema = yup.object().shape({
  name: yup.string().required("Title is Required"),
  code: yup.string().required("Description is Required"),
  discount: yup.number().required("Quantity is required"),
});
const EditProduct = ({ open, closeModal, coupon }: ProductProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.pCategory.categories);

  const newCategories =
    categories &&
    categories.reduce((arr: any, item: any) => {
      return [...arr, { value: item.title, label: item.title }];
    }, []);
  const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs]>();
  const formik = useFormik<Value>({
    initialValues: {
      code: coupon ? coupon.code : "",
      discount: coupon ? coupon.discount : 0,
      name: coupon ? coupon.name : "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(
        updateCoupons({
          data: {
            ...values,
            startDate: timeRange ? timeRange[0].toDate() : new Date(),
            endDate: timeRange ? timeRange[1].toDate() : new Date(),
          },
          id: coupon._id,
        })
      );
      formik.resetForm();
      setTimeRange([dayjs(), dayjs()]);
      closeModal();
    },
  });

  useEffect(() => {
    dispatch(getPCategories());
  }, []);
  useEffect(() => {
    if (coupon) {
      formik.values.code = coupon.code;
      formik.values.name = coupon.name;
      formik.values.discount = coupon.discount;
      setTimeRange([dayjs(coupon.startDate), dayjs(coupon.endDate)]);
    }
  }, [coupon, open]);
  useEffect(() => {
    console.log(timeRange);
  }, [timeRange]);
  return (
    <div>
      <Drawer
        open={open}
        placement="right"
        title="Add Coupon"
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
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Campaign Name</h2>
            <div className="w-[60%]">
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full mt-4 h-12 bg-gray-100 focus:bg-white"
                placeholder="Coupon Title"
              />
              <div className="text-red-500 text-md">
                {formik.touched.name && formik.errors.name}
              </div>
            </div>
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Campaign Code</h2>
            <Input
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              className="w-[60%] mt-4 h-12 bg-gray-100 focus:bg-white"
              placeholder="Coupon Code"
            />
          </div>
          <div className="flex  justify-between mt-5 items-center">
            <h2 className="font-semibold text-lg">Discount Percentage</h2>
            <div className=" w-[60%]">
              <Input
                type="number"
                name="discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                className="w-full mt-4 h-12 bg-gray-100 focus:bg-white"
                placeholder="Discount percentage"
              />
              <div className="text-red-500 text-md">
                {formik.touched.discount && formik.errors.discount}
              </div>
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
