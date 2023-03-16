import React, { useState, useEffect } from "react";
import { FilterCategory, AddCategory, EditCategory } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Table, Switch } from "antd";
import { getPCategories } from "../features/pCategory/pCategorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { openCart } from "../features/ModalDel";
import {
  deleteCategory,
  updateCategory,
} from "../features/pCategory/pCategorySlice";

import type { ColumnsType } from "antd/es/table";
interface TableValues {
  title: string | undefined;
  key: number;
  isPublish: boolean | undefined;
  image: string | undefined;
  id: string;
}
interface Category {
  _id: string;
  title?: string;
  isPublish?: boolean;
  image?: string;
}
const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.pCategory.categories);
  const [search, setSearch] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });
  const handleOpenModalDelete = (id: string, name: string) => {
    dispatch(openCart({ id, name, type: "category" }));
  };
  const data = [] as TableValues[];
  for (let i = 0; i < categories.length; i++) {
    data.push({
      title: categories[i].title,
      key: i + (pagination.current - 1) * 10 + 1,
      isPublish: categories[i].isPublish,
      image: categories[i].image,
      id: categories[i]._id,
    });
  }
  const columns: ColumnsType<TableValues> = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "ICON",
      render: (text: string, record: TableValues) => (
        <div>
          <img src={record.image} alt="" className="w-7 h-7" />
        </div>
      ),
    },
    {
      title: "TITLE",
      dataIndex: "title",
    },
    {
      title: "PUBLISH",
      align: "center",
      render: (text: string, record: TableValues) => (
        <div>
          <Switch
            defaultChecked={record.isPublish}
            onChange={(e) => handlePublish(e, record.id)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      align: "center",
      render: (title: string, record: TableValues) => (
        <div className="flex items-center justify-center w-full gap-4 text-xl text-gray-700">
          <button>
            {" "}
            <BiEdit onClick={() => handleEdit(record.id)} />
          </button>
          <button
            className="p-2"
            onClick={() => handleOpenModalDelete(record.id, `${record.title}`)}
          >
            <AiFillDelete className="cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];
  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const OpenModal = () => {
    setIsOpenModal(true);
  };
  const OpenModalEdit = () => {
    setIsOpenEdit(true);
  };
  const closeModalEdit = () => {
    setIsOpenEdit(false);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
  };
  const handlePublish = (value: boolean, id: string) => {
    dispatch(updateCategory({ data: { isPublish: value }, id }));
  };
  const handleEdit = (id: string) => {
    setIsOpenEdit(true);
    setCategory(categories.find((item) => item._id === id));
  };
  useEffect(() => {
    dispatch(getPCategories(search));
  }, [search]);
  return (
    <div>
      <h2>Category</h2>
      <FilterCategory
        handleChangeSearch={handleChangeSearch}
        search={search}
        OpenModal={OpenModal}
      />
      <Table dataSource={data} columns={columns} pagination={pagination} />
      <AddCategory open={isOpenModal} closeModal={closeModal} />
      <EditCategory
        open={isOpenEdit}
        closeModal={closeModalEdit}
        category={category}
      />
    </div>
  );
};

export default Category;
