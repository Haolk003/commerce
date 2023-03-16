import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const { orders, message, isError, isLoading, isSuccess, orderCount } =
    useAppSelector((state) => state.order);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: orderCount ? orderCount : 0,
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
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
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
    {
      title: "INVOICE",
      render: (title: string, Order: DataType) => (
        <Link
          to={`/admin/order/${Order.id}`}
          className="text-xl float-right mr-4"
        >
          <AiOutlineZoomIn />
        </Link>
      ),
    },
  ];
  useEffect(() => {
    dispatch(
      getOrders(
        `${pagination ? `page=${pagination.current}` : 1}${
          search !== "" ? `&phone=${search}` : ""
        }${status !== "" ? `&orderStatus=${status}` : ""}${
          limitDay !== "" ? `&createdAt[lte]=${limitDay}` : ""
        }`
      )
    );
  }, [search, status, limitDay, pagination]);
  useEffect(() => {
    setPagination((item) => ({ ...item, total: orderCount }));
  }, [orderCount]);
  return (
    <div>
      <h3>Orders:</h3>
      <div className="bg-white shadow-sm shadow-gray-300 border-[1px] border-gray-300 rounded-md mt-5">
        <form className="flex  p-6 gap-5">
          <Input
            type="text"
            onPressEnter={(e) => handleChangeSearch(e)}
            placeholder="Search by phone name"
            className="w-[30%] h-10 rounded-md"
          />
          <Select
            allowClear
            onChange={handleChange}
            placeholder="Status"
            options={[
              { value: "", label: "All" },
              { value: "Pending", label: "Pending" },
              { value: "Delivered", label: "Delivered" },
              { value: "Processing", label: "Processing" },
              { value: "Cancel", label: "Cancel" },
            ]}
            size="large"
            className="w-[30%]"
          />
          <Select
            placeholder="Order limits"
            className="w-[20%] h-12"
            size="large"
            onChange={handleChangeLimitDay}
          >
            <Option value="5">Last 5 day orders</Option>
            <Option value="7">Last 7 day orders</Option>
            <Option value="15">Last 15 day orders</Option>
            <Option value="30">Last 30 day orders</Option>
          </Select>
          <Button
            className="bg-color-primary w-[20%] h-10 text-white font-semibold hover:text-white flex items-center justify-center gap-2 text-md"
            // onClick={handleClick}
          >
            <SlCloudDownload className="text-xl" />
            <span>Dowload all Orders</span>
          </Button>
        </form>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={Orderdata}
          pagination={pagination}
          onChange={handleTableChange}
        />
        ;
      </div>
    </div>
  );
};

export default Order;
