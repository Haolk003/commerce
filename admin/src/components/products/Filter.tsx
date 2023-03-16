import React, { useEffect } from "react";
import { Input, Select, Button } from "antd";
import type { SelectProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IoIosAdd } from "react-icons/io";
import { getPCategories } from "../../features/pCategory/pCategorySlice";
const { Option } = Select;
interface Modal {
  OpenModal: () => void;
  search: string;
  handleChangeSearch: (e: any) => void;
  category: string;
  handleSelectCategory: (e: any) => void;
  handlePriceSort: (e: any) => void;
}
const Filter = ({
  OpenModal,
  search,
  handleChangeSearch,
  handlePriceSort,
  category,
  handleSelectCategory,
}: Modal) => {
  const dispatch = useAppDispatch();
  const pCategory = useAppSelector((state) => state.pCategory.categories);
  const newCategory =
    pCategory &&
    pCategory.length > 0 &&
    pCategory.reduce((arr: any, item) => {
      return [...arr, { label: item.title, value: item.title }];
    }, []);
  const options: SelectProps["options"] = [];
  const handleClick = () => {
    console.log("a");
    OpenModal();
  };

  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value: string) => {
    handleSelectCategory(value);
  };
  const handleChangePriceSort = (value: string) => {
    handlePriceSort(value);
  };
  useEffect(() => {
    dispatch(getPCategories(""));
  }, []);
  return (
    <div className="bg-white shadow-sm shadow-gray-300 border-[1px] border-gray-300 rounded-md mt-5">
      <form className="flex  p-6 gap-5">
        <Input
          type="text"
          onPressEnter={(e) => handleChangeSearch(e)}
          placeholder="Search by product name"
          className="w-[30%] h-10 rounded-md"
        />
        <Select
          allowClear
          onChange={handleChange}
          placeholder="Please select"
          options={newCategory}
          size="large"
          className="w-[30%]"
        />
        <Select
          placeholder="Price"
          className="w-[20%] h-12"
          size="large"
          onChange={handleChangePriceSort}
        >
          <Option value="price">Low to High</Option>
          <Option value="-price">Hign to Low</Option>
        </Select>
        <Button
          className="bg-color-primary w-[20%] h-10 text-white font-semibold hover:text-white flex items-center justify-center gap-2 text-md"
          onClick={handleClick}
        >
          <IoIosAdd className="text-xl" />
          <span>Add Product</span>
        </Button>
      </form>
    </div>
  );
};

export default Filter;
