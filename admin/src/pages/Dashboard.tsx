import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Table } from "antd";
import { IoIosToday } from "react-icons/io";
import { BsCart3, BsTruck, BsCheck2 } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { Line, Pie } from "@ant-design/plots";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import { getProducts } from "../features/products/ProductSlice";
import {
  getOrders,
  classifyOrder,
  totalAggOrder,
  totalWeekly,
} from "../features/order/orderSlice";

interface DataType {
  orderTime: string;
  address: string;
  phone: string;
  method: string;
  amount: number;
  status: string;
}
interface User {
  id: number;
  name: string;
  email: string;
}
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [selectChart, setSelectChart] = useState("sales");
  const product = useAppSelector((state) => state.product.products);
  const [users, setUsers] = useState<User[]>([]);
  const {
    aggOrder,
    classify,
    totalWeekly: weekly,
    isError,
    isSuccess,
    orders,
    orderCount,
  } = useAppSelector((state) => state.order);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: orderCount ? orderCount : 0,
  });

  const Orderdata: DataType[] = [];
  if (orders) {
    for (let i = 0; i < orders.length; i++) {
      Orderdata.push({
        orderTime: dayjs(orders[i].createdAt).format("MMM DD, YYYY"),
        address: orders[i].address,
        phone: orders[i].phone,
        method: orders[i].paymentIntent.method,
        amount: orders[i].paymentIntent.amount,
        status: orders[i].orderStatus,
      });
    }
  }

  const columns = [
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
  ];

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };
  const config = {
    weekly,
    xField: "date",
    yField: "totalSale",
    label: {},
    lineStyle: {
      stroke: "#0e9f6e",
    },
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#0e9f6e",
        stroke: "#0e9f6e",
        lineWidth: 2,
      },
    },

    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#fff",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };
  const config3 = {
    xField: "date",
    yField: "totalOrder",
    label: {},
    lineStyle: {
      stroke: "#ff5a1f",
    },
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#ff5a1f",
        stroke: "#ff5a1f",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };
  const config2 = {
    appendPadding: 10,
    product,
    angleField: "sold",
    colorField: "title",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  useEffect(() => {
    dispatch(totalAggOrder());
    dispatch(totalWeekly());
    dispatch(classifyOrder());

    dispatch(getProducts("sort=-sold&limit=10"));
  }, []);
  useEffect(() => {
    dispatch(getOrders(`${pagination ? `page=${pagination.current}` : 1}`));
  }, [pagination]);

  return (
    <div>
      <h2 className="text-xl text-color-dark font-[500]">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="bg-[#0694a2] flex flex-col  items-center justify-center gap-2 h-[150px] rounded-lg text-white ">
          <IoIosToday className="text-4xl" />
          <h2 className="text-xl">Today Order</h2>
          <p className="text-2xl font-semibold">
            ${" "}
            {aggOrder && aggOrder?.orderDay
              ? aggOrder.orderDay[0]?.sum_price.toFixed(2)
              : 0}
          </p>
        </div>
        <div className="bg-[#3f83f8] flex flex-col items-center gap-2 justify-center rounded-lg text-white">
          <BsCart3 className="text-4xl" />
          <h2 className="text-xl">This Month</h2>
          <p className="text-2xl font-semibold">
            ${" "}
            {aggOrder && aggOrder.orderMonth
              ? aggOrder.orderMonth[0].sum_price.toFixed(2)
              : 0}
          </p>
        </div>
        <div className="bg-[#0e9f6e] flex flex-col items-center gap-2 justify-center rounded-lg text-white">
          <BsCreditCard className="text-4xl" />
          <h2 className="text-xl">Total Order</h2>
          <p className="text-2xl font-semibold">
            $ {orders && aggOrder?.orderAll[0].sum_price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10">
        <div className="flex gap-4 py-4  items-center justify-center rounded-lg border-[1px] border-gray-200">
          <div className="text-[#d03801] text-xl bg-[#feecdc] rounded-full p-4">
            <BsCart3 />
          </div>

          <div>
            <h2 className="text-lg text-gray-700">Total Order</h2>
            <p className="text-2xl font-[500] text-gray-700">
              {classify &&
                classify.reduce((total, item) => {
                  return item.count + total;
                }, 0)}
            </p>
          </div>
        </div>
        <div className="flex gap-4 py-4  items-center justify-center rounded-lg border-[1px] border-gray-200">
          <div className="text-[#1c64f2] text-xl bg-[#e1effe] rounded-full p-4">
            <TbRefresh />
          </div>

          <div>
            <h2 className="text-lg text-gray-700">Order Pending</h2>
            <p className="text-2xl font-[500] text-gray-700">
              {classify &&
              classify.find((item) => item.orderStatus == "Pending")
                ? classify.find((item) => item.orderStatus == "Pending")?.count
                : 0}
            </p>
          </div>
        </div>
        <div className="flex gap-4 py-4  items-center justify-center rounded-lg border-[1px] border-gray-200">
          <div className="text-[#047481] text-xl bg-[rgb(213,245,246)] rounded-full p-4">
            <BsTruck />
          </div>

          <div>
            <h2 className="text-lg text-gray-700">Order Processing</h2>
            <p className="text-2xl font-[500] text-gray-700">
              {" "}
              {classify &&
              classify.find((item) => item.orderStatus == "Processing")
                ? classify.find((item) => item.orderStatus == "Processing")
                    ?.count
                : 0}
            </p>
          </div>
        </div>
        <div className="flex gap-4 py-4  items-center justify-center rounded-lg border-[1px] border-gray-200">
          <div className="text-[#057a55] text-xl bg-[#def7ec] rounded-full p-4">
            <BsCheck2 />
          </div>

          <div>
            <h2 className="text-lg text-gray-700">Order Delivered</h2>
            <p className="text-2xl font-[500] text-gray-700">
              {" "}
              {classify &&
              classify.find((item) => item.orderStatus == "Delivered")
                ? classify.find((item) => item.orderStatus == "Delivered")
                    ?.count
                : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex gap-4 ">
        <div className="w-[50%] shadow-sm shadow-gray-400 p-2">
          <div>
            <h2 className="font-semibold text-gray-600 text-lg">
              Weekly Sales
            </h2>
            <div className="flex items-center gap-3 justify-center border-b-[2px] border-gray-200 mb-4">
              <button
                className={`${
                  selectChart === "sales" &&
                  "text-color-primary border-b-[2px] border-color-primary "
                } p-2`}
                onClick={() => setSelectChart("sales")}
              >
                Sales
              </button>
              <button
                className={`${
                  selectChart === "orders" &&
                  "text-[#ff5a1f] border-b-[2px] border-[#ff5a1f]"
                } p-2`}
                onClick={() => setSelectChart("orders")}
              >
                Orders
              </button>
            </div>
          </div>
          {selectChart === "sales" && weekly ? (
            <Line data={weekly} {...config} />
          ) : (
            <Line data={weekly} {...config3} />
          )}
        </div>
        <div className="w-[50%] shadow-sm shadow-gray-400">
          <h2 className="font-semibold text-gray-600 text-lg p-4">
            Best Selling
          </h2>
          <Pie data={product} {...config2} />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="mb-4 text-xl">Recent Order</h2>
        <Table
          columns={columns}
          dataSource={Orderdata}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
