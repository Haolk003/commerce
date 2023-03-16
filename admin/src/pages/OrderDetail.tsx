import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getOrder } from "../features/order/orderSlice";

import dayjs from "dayjs";
import { Table } from "antd";
import logo from "../assets/logo-light.svg";

interface OrderTable {
  key: number;
  name: string;
  quantity: number;
  price: number;
}
const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.order);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: order?.products.length,
  });
  const { id } = useParams();
  useEffect(() => {
    dispatch(getOrder(`${id}`));
  }, [id]);
  const data: OrderTable[] = [];
  if (order?.products) {
    for (let i = 0; i < order?.products.length; i++) {
      data.push({
        key: i + 1,
        name: order.products[i].product.title,
        price:
          order.products[i].product.price -
          (order.products[i].product.price *
            order?.products[i]?.product?.sale?.discount) /
            100,
        quantity: order.products[i].count,
      });
    }
  }
  const columns: ColumnsType<OrderTable> = [
    {
      title: "SR.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "PRODUCT NAME",
      dataIndex: "name",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
    },
    {
      title: "ITEM PRICE",

      render: (data: string, order: OrderTable) => (
        <span className="font-semibold">${order.price}</span>
      ),
    },
    {
      title: "AMOUNT",
      render: (data: string, order: OrderTable) => (
        <span className="text-red-500 font-semibold">
          ${(order.price * order.quantity).toFixed(2)}
        </span>
      ),
    },
  ];
  return (
    <div className="px-5 py-5">
      {order && (
        <div>
          <h2 className="text-xl font-[500] mb-3">Invoice</h2>
          <div className="bg-white rounded-lg px-5 py-8">
            <div className="flex items-center justify-between mb-3">
              {" "}
              <div>
                <h2 className="text-xl font-semibold">INVOICE</h2>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-sm font-[500] text-gray-700">STATUS:</h3>
                  <span
                    className={`${
                      order.orderStatus === "Pending" &&
                      "bg-[#fdf6b2] text-[#c27903]"
                    }
          ${order.orderStatus === "Delivered" && "bg-[#def7ec] text-[#0e9f63]"}
          ${
            order.orderStatus === "Processing" && "text-[#3f83f8] bg-[#e1effe]"
          } 
          ${
            order.orderStatus === "Cancel" && "text-[#f05252] bg-[#fde8e8]"
          } text-center rounded-[25px] px-2 py-[1px] font-[500]`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              <div>
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-lg">Date</h2>
                <p>{order && dayjs(order.createdAt).format("MMM DD,YYYY")}</p>
              </div>
              <div className="flex flex-col items-end mt-5 gap-1">
                <h2 className="font-semibold ">INVOICE TO.</h2>
                <span className="text-sm text-gray-600">
                  {order.orderBy.lastName} {order.orderBy.firstName}
                </span>
                <span className="text-sm text-gray-600">{order.address}</span>
                <span className="text-sm text-gray-600">{order.phone}</span>
              </div>
            </div>
            <Table columns={columns} dataSource={data} />
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-5">
              <div>
                <h2 className="font-semibold text-md mb-1 text-gray-600">
                  PAYMENT METHOD
                </h2>
                <p className="text-gray-500">{order.paymentIntent.method}</p>
              </div>
              <div>
                <h2 className="font-semibold text-md mb-1 text-gray-600">
                  SHIPPING COST
                </h2>
                <p className="text-gray-500">$5.00</p>
              </div>
              <div>
                <h2 className="font-semibold text-md mb-1 text-gray-600">
                  DISCOUNT
                </h2>
                <p className="text-gray-500">$0.00</p>
              </div>
              <div>
                <h2 className="font-semibold text-md mb-1 text-gray-600">
                  TOTAL AMOUNT
                </h2>
                <p className="text-gray-500">${order.paymentIntent.amount}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
