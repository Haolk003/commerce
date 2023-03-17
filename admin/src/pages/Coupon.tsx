import React, { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { Table, Input } from "antd";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCoupons } from "../features/coupon/couponSlice";
import { AddCoupon, EditCoupon } from "../components";
import { openCart } from "../features/ModalDel";
import dayjs from "dayjs";
interface TableData {
  key: number;
  startDate: string;
  endDate: string;
  name: string;
  code: string;
  discount: number;
  id: string;
}

const Coupon = () => {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector((state) => state.coupon.coupons);
  const [open, setOpen] = useState(false);
  const [couponEdit, setCouponEdit] = useState<any>();
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenModalEdit = async (id: string) => {
    const couponItem = coupon.find((item) => item._id === id);
    setCouponEdit(couponItem);
    setOpenEdit(true);
  };
  const handleCloseModalEdit = () => {
    setOpenEdit(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const openModalDel = (id: string, name: string) => {
    dispatch(openCart({ id, name, type: "coupon" }));
  };
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const data: TableData[] = [];
  for (let i = 0; i < coupon?.length; i++) {
    data.push({
      key: i + 1,
      startDate: dayjs(coupon[i].startDate).format("MMM DD,YYYY"),
      endDate: dayjs(coupon[i].endDate).format("MMM DD,YYYY"),
      name: coupon[i].name,
      discount: coupon[i].discount,
      code: coupon[i].code,
      id: coupon[i]._id,
    });
  }
  const columns: ColumnsType<TableData> = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "CAMPAIGNS NAME",
      dataIndex: "name",
    },
    {
      title: "START DATE",
      dataIndex: "startDate",
    },
    {
      title: "END DATE",
      dataIndex: "endDate",
    },
    {
      title: "CODE",
      dataIndex: "code",
    },
    {
      title: "PERCENTAGE",
      dataIndex: "discount",
      render: (text) => <span>{text}%</span>,
    },
    {
      title: "STATUS",
      render: (value: string, record: TableData) => (
        <p>
          {new Date(record.endDate).getTime() >= new Date().getTime()
            ? "Active"
            : "Exprired"}
        </p>
      ),
    },
    {
      title: "ACTION",
      render: (value: string, record: TableData) => (
        <div className="flex items-center gap-3">
          <button onClick={() => handleOpenModalEdit(record.id)}>
            <BiEdit className="hover:text-color-primary text-2xl" />
          </button>
          <button onClick={() => openModalDel(record.id, record.name)}>
            {" "}
            <BsTrash className="hover:text-color-notifi-primary text-2xl" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCoupons(`${search !== "" ? `search=${search}` : ""}`));
  }, [search]);
  return (
    <div>
      <h2 className="text-lg">Coupons</h2>
      <div className="flex items-center gap-4 bg-white px-5 py-4 my-8 rounded-lg border-[1px] border-gray-300">
        <Input
          type="text"
          placeholder="Search by coupons code/name"
          className="w-[80%] h-[40px] rounded-md"
          onPressEnter={handleChange}
        />
        <button
          className="flex items-center gap-2 w-[20%] rounded-md h-[40px] bg-color-primary text-white justify-center"
          onClick={openModal}
        >
          <IoAddOutline /> <span>Add Coupon</span>
        </button>
      </div>
      <Table dataSource={data} columns={columns} />
      <AddCoupon open={open} closeModal={closeModal} />
      <EditCoupon
        open={openEdit}
        closeModal={handleCloseModalEdit}
        coupon={couponEdit}
      />
    </div>
  );
};

export default Coupon;
