import React, { useEffect, useState } from "react";
import { Filter, AddProduct, EditProduct } from "../components";
import axios from "axios";
import { Table, Switch } from "antd";
import { AiOutlineZoomIn, AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../features/products/ProductSlice";
import { openCart } from "../features/ModalDel";
interface User {
  key: number;
  title: string;
  categories: string;
  price: number;
  status: string;
  stock: number;
  img: string;
  id: string;
  slug: string;
  description: string;
  tags: string[];
  isPublish: boolean;
  discount?: number | null | undefined;
}
const Product = () => {
  const dispatch = useAppDispatch();
  const { products, productCount } = useAppSelector((state) => state.product);
  const [users, setUsers] = useState<User[]>([]);
  const [productEdit, setProductEdit] = useState<any>();
  const [category, setCategory] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [priceSort, setPriceSort] = useState("");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: productCount,
  });
  const handleOpenModalDelete = (id: string, name: string) => {
    dispatch(openCart({ id, name, type: "product" }));
  };
  const data1: User[] = [];
  for (let i = 0; i < products?.length; i++) {
    data1.push({
      key: i + (pagination.current - 1) * 10 + 1,
      title: products[i]?.title,
      categories: products[i]?.category?.join(","),
      price: products[i]?.price,
      status: products[i]?.quantity > 0 ? "selling" : "sell out",
      stock: products[i]?.stock,
      img: products[i]?.images[0],
      id: products[i]?._id,
      slug: products[i]?.slug,
      description: products[i]?.description,
      tags: products[i]?.tags,
      isPublish: products[i].isPublic,
      discount: products[i].sale?.discount,
    });
  }
  const handleSelectCategory = (e: any) => {
    setCategory(e);
  };
  const handleChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };
  const handleEdit = (id: any) => {
    const product = products.find((item) => item._id === id);
    setProductEdit(product);
    setOpenEdit(true);
  };
  useEffect(() => {
    dispatch(
      getProducts(
        `${pagination.current ? `page=${pagination.current}` : ""}${
          search !== "" ? `&title=${search}` : ""
        }${priceSort !== "" ? `&sort=${priceSort}` : ""}${
          category !== "" ? `&category=${category}` : ""
        }`
      )
    );
  }, [search, category, priceSort, pagination]);
  const handleChangePublic = (value: boolean, id: string) => {
    dispatch(updateProduct({ product: { isPublic: value }, id }));
  };

  const columns = [
    {
      title: "UID",
      dataIndex: "key",
    },
    {
      title: "PRODUCT NAME",
      render: (text: string, record: User) => (
        <div className="flex items-center gap-3">
          <img
            src={record.img}
            alt=""
            className="w-7 h-7 rounded-full  object-cover"
          />
          <p>{record.title}</p>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "categories",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "DISCOUNT",
      render: (title: string, record: User) => (
        <p className="font-semibold">
          {record.discount ? record.discount + "% OFF" : ""}
        </p>
      ),
    },
    {
      title: "Details",
      render: (title: string, record: User) => (
        <div className="flex items-center justify-center w-full">
          <Link to={`/admin/product/${record.id}`}>
            <AiOutlineZoomIn />
          </Link>
        </div>
      ),
    },
    {
      title: "PUBLISHED",
      render: (title: string, record: User) => (
        <div>
          <Switch
            size="small"
            defaultChecked={record.isPublish}
            onChange={(e) => handleChangePublic(e, record.id)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      render: (title: string, record: User) => (
        <div className="flex items-center justify-center w-full gap-4 text-xl text-gray-700">
          <button onClick={() => handleEdit(record.id)}>
            {" "}
            <BiEdit />
          </button>
          <button
            onClick={() => handleOpenModalDelete(record.id, record.title)}
            className="p-2"
          >
            <AiFillDelete className="cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];
  const openModal = () => {
    setOpen(true);
  };
  const openModalEdit = () => {
    setOpenEdit(true);
  };
  const closeModalEdit = () => {
    setOpenEdit(false);
    setProductEdit("");
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  return (
    <div>
      <h2>Products</h2>
      <Filter
        OpenModal={() => openModal()}
        search={search}
        handleChangeSearch={(e: any) => handleChangeSearch(e)}
        category={category}
        handleSelectCategory={(e: any) => handleSelectCategory(e)}
        handlePriceSort={(e) => setPriceSort(e)}
      />
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
      <div>
        <AddProduct open={open} closeModal={() => closeModal()} />
        <EditProduct
          open={openEdit}
          closeModal={() => closeModalEdit()}
          product={productEdit}
        />
      </div>
    </div>
  );
};

export default Product;
