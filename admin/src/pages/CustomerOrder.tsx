import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineZoomIn } from "react-icons/ai";
import { Space, Table, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getOrders, updateStatus } from "../features/order/orderSlice";
import { SlCloudDownload } from "react-icons/sl";
import { Input, Select, Button } from "antd";
const { Option } = Select;
import dayjs from "dayjs";
interface DataType {
  key: number;
  orderTime: string;
  address: string;
  phone: string;
  method: string;
  amount: number;
  status: string;
  id: string;
}

const Order = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { orders, message, isError, isLoading, isSuccess } = useAppSelector(
    (state) => state.order
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: orders ? orders.length : 0,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [limitDay, setLimitDay] = useState("");
  const handleChangeStatus = async (e: any, id: string) => {
    await dispatch(updateStatus({ orderId: id, status: e.target.value }));
  };
  const handleChangeLimitDay = (value: string) => {
    setLimitDay(dayjs().subtract(Number(value), "day").toString());
  };
  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleChange = (value: string) => {
    setStatus(value);
  };
  const Orderdata: DataType[] = [];
  if (orders) {
    for (let i = 0; i < orders?.length; i++) {
      Orderdata.push({
        orderTime: dayjs(orders[i].createdAt).format("MMM DD, YYYY"),
        address: orders[i].address,
        phone: orders[i].phone,
        method: orders[i].paymentIntent.method,
        amount: orders[i].paymentIntent.amount,
        status: orders[i].orderStatus,
        key: i,
        id: orders[i]._id,
      });
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "SR NO",
      dataIndex: "key",
    },
    {
      title: "ORDER TIME",
      dataIndex: "orderTime",
      key: "time",
    },
    {
      title: "DELIVERY ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "PAYMENT METHOD",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "ORDER AMOUNT",
      render: (title: string, Order: DataType) => (
        <p className="font-semibold text-xl">$ {Order.amount}</p>
      ),
    },
    {
      title: "STATUS",
      render: (title: string, Order: DataType) => (
        <span
          className={`${
            Order.status === "Pending" && "bg-[#fdf6b2] text-[#c27903]"
          }
          ${Order.status === "Delivered" && "bg-[#def7ec] text-[#0e9f63]"}
          ${Order.status === "Processing" && "text-[#3f83f8] bg-[#e1effe]"} 
          ${
            Order.status === "Cancel" && "text-[#f05252] bg-[#fde8e8]"
          } text-center rounded-[25px] px-2 py-[1px] font-[500]`}
        >
          {Order.status}
        </span>
      ),
    },
    {
      title: "ACTION",
      render: (title: string, Order: DataType) => (
        <select
          defaultValue={Order.status}
          className="border-[1px] border-gray-300 rounded-lg py-1 px-2 outline-none"
          onChange={(e) => handleChangeStatus(e, Order.id)}
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Processing">Processing</option>
          <option value="Cancel">Cancel</option>
        </select>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getOrders(`orderBy=${id}`));
  }, [search, status, limitDay]);
  return (
    <div>
      <h3 className="text-xl mb-4 font-semibold">Customer Order List:</h3>

      <div>
        <Table columns={columns} dataSource={Orderdata} />;
      </div>
    </div>
  );
};

export default Order;
