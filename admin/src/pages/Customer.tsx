import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Space, Table, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AiOutlineZoomIn } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { getUSers } from "../features/customers/customerSlice";
import { openCart } from "../features/ModalDel";
import dayjs from "dayjs";
import { Input } from "antd";
interface DataType {
  key: number;
  join: string;
  name: string;
  email: string;
  mobile: string;
  id: string;
}

const Customer = () => {
  const dispatch = useAppDispatch();
  const { isError, customers, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.user
  );
  const handleDelete = (id: string, name: string) => {
    dispatch(openCart({ id: id, name: name, type: "customer" }));
  };
  const [search, setSearch] = useState("");
  const handleChange = (e: any) => {
    setSearch(`${e.target.value}`);
  };
  const data3: DataType[] = [];
  for (let i = 0; i < customers.length; i++) {
    data3.push({
      key: i + 1,
      name: `${customers[i]?.lastName} ${customers[i]?.firstName}`,
      mobile: `${customers[i]?.mobile}`,
      email: `${customers[i]?.email}`,
      join: `${dayjs(customers[i].createdAt).format("MMM DD,YYYY")}`,
      id: `${customers[i]._id}`,
    });
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "key",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "ID",
      dataIndex: "join",

      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "mobile",
    },
    {
      title: "Action",
      render: (value: string, record: DataType) => (
        <div className="flex items-center gap-3 justify-center text-xl">
          <Link to={`/admin/customer-order/${record.id}`}>
            <AiOutlineZoomIn />
          </Link>
          <button>
            <BsTrash onClick={() => handleDelete(record.id, record.name)} />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getUSers(`${search !== "" ? `search=${search}` : ""}`));
  }, [search]);
  useEffect(() => {
    console.log(customers);
  }, [customers, isLoading, isSuccess, message, isError]);
  return (
    <div className="relative">
      <div>
        <h2 className="text-2xl font-[500] mb-3">Customer</h2>
        <div className="bg-white rounded-md border-[1px] border-gray-200 py-5 px-3">
          <Input
            type="text"
            placeholder="Search by name/email/phone"
            className="w-full h-[40px] bg-gray-200 px-3 outline-none rounded-md mb-3"
            onPressEnter={(e) => handleChange(e)}
          />
        </div>
        <Table columns={columns} dataSource={data3} />;
      </div>
    </div>
  );
};

export default Customer;
