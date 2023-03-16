import React from "react";
import { SliderBar, Header } from ".";
import { Outlet } from "react-router-dom";
import DeleteAction from "./DeleteAction";
import { useAppSelector } from "../app/hooks";
const MainLayout = () => {
  const open = useAppSelector((state) => state.modal.open);
  return (
    <div className="flex w-full">
      {open && <DeleteAction />}
      <SliderBar />
      <div className="w-[calc(100vw-250px)]">
        <Header />
        <div className="w-full px-5 py-5 h-[calc(100vh-60px)] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
