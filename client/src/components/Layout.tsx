import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Fotter, WishList, QuickView } from "./";
import { useAppSelector } from "../store/hook";
import { ToastContainer } from "react-toastify";
const Layout = () => {
  const OpenWishList = useAppSelector((state) => state.auth.openWishList);
  const OpenQuickView = useAppSelector((state) => state.auth.openQuickView);
  return (
    <div
      className={`${
        (OpenWishList || OpenQuickView) && "overflow-hidden h-screen"
      }`}
    >
      {OpenWishList && <WishList />}
      {OpenQuickView && <QuickView />}
      <ToastContainer />
      <Header />
      <Outlet />
      <Fotter />
    </div>
  );
};

export default Layout;
