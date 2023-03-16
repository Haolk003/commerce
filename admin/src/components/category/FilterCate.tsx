import React, { useEffect } from "react";
import { Input, Select, Button } from "antd";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IoIosAdd } from "react-icons/io";
import { getPCategories } from "../../features/pCategory/pCategorySlice";
interface Modal {
  OpenModal: () => void;
  search: string;
  handleChangeSearch: (e: any) => void;
}
const Filter = ({ OpenModal, search, handleChangeSearch }: Modal) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    OpenModal();
  };

  return (
    <div className="bg-white shadow-sm shadow-gray-300 border-[1px] border-gray-300 rounded-md mt-5">
      <div className="flex  p-6 gap-5">
        <Input
          type="text"
          onPressEnter={(e) => handleChangeSearch(e)}
          placeholder="Search by category"
          className="w-[70%] h-12 rounded-md"
        />

        <Button
          className="bg-color-primary w-[30%] h-12 text-white font-semibold hover:text-white flex items-center justify-center gap-2 text-md"
          onClick={handleClick}
        >
          <IoIosAdd className="text-xl" />
          <span>Add Category</span>
        </Button>
      </div>
    </div>
  );
};

export default Filter;
