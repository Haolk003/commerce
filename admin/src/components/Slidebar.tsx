import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoLight from "../assets/logo-light.svg";
import { RxDashboard } from "react-icons/rx";
import { BsFillBasket2Fill } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoPersonOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout as Logout } from "../features/auth/authSlice";
import {
  AiOutlineCompass,
  AiOutlineGift,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
const Slidebar = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(Logout());
  };
  return (
    <div className="flex flex-col w-[250px] gap-4 bg-white shadow-sm shadow-gray-400 h-screen relative overflow-hidden ">
      <img src={LogoLight} alt="" className="w-[120px] ml-6 my-5" />
      {/*  */}
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? ` flex items-center relative gap-4 px-6 text-color-primary text-[16px] w-full py-3 rounded-[4px] after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[4px]  after:bg-color-primary after:rounded-t-sm after:rounded-b-sm hover:text-color-primary`
            : ` flex items-center gap-4 ml-6 text-gray-600 w-full text-[16px] hover:text-color-primary py-3 `
        }
      >
        <RxDashboard className="text-xl" />
        <p className="font-[500]">Dashboard</p>
      </NavLink>
      {/*  */}
      <NavLink
        end
        to="/admin/products"
        className={({ isActive }) =>
          isActive
            ? ` flex items-center relative gap-4 px-6 text-color-primary text-[16px] w-full py-3 rounded-[4px] after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[4px] after:bg-color-primary after:rounded-t-sm after:rounded-b-sm hover:text-color-primary`
            : ` flex items-center gap-4 ml-6 text-gray-500 w-full hover:text-color-primary text-[16px] py-3 `
        }
      >
        <BsFillBasket2Fill className="text-xl" />
        <p className="font-[500]">Product</p>
      </NavLink>
      {/*  */}
      <NavLink
        to="/admin/categories"
        className={({ isActive }) =>
          isActive
            ? ` flex items-center relative gap-4 px-6 text-[16px] text-gray-600 w-full py-3 rounded-[4px] after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[4px] after:bg-color-primary after:rounded-t-sm after:rounded-b-sm hover:text-color-primary`
            : ` flex items-center gap-4 ml-6 text-gray-600 text-[16px] w-full hover:text-color-primary py-3 `
        }
      >
        <TfiMenuAlt className="text-xl" />
        <p className="font-[500]">Product Category</p>
      </NavLink>

      {/*  */}
      <NavLink
        to="/admin/customer"
        className={({ isActive }) =>
          isActive
            ? ` flex items-center relative gap-4 px-6 text-gray-600 w-full text-[16px] py-3 rounded-[4px] after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[4px] after:bg-color-primary after:rounded-t-sm after:rounded-b-sm hover:text-color-primary`
            : ` flex items-center gap-4 ml-6 text-gray-600 w-full text-[16px] hover:text-color-primary py-3 `
        }
      >
        <BsPeople className="text-xl" />
        <p className="font-[500]">Customer</p>
      </NavLink>
      {/*  */}
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive
            ? ` flex items-center relative text-[16px] gap-4 px-6 text-gray-600 w-full py-3 rounded-[4px] after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[4px] after:bg-color-primary after:rounded-t-sm after:rounded-b-sm hover:text-color-primary`
            : ` flex items-center gap-4 ml-6 text-[16px] text-gray-600 w-full hover:text-color-primary py-3`
        }
      >
        <AiOutlineCompass className="text-xl" />
        <p className="font-[500]">Orders</p>
      </NavLink>
      {/*  */}
      <NavLink
        to="/admin/coupons"
        className={({ isActive }) =>
          isActive
            ? ` flex items-center relative gap-4 text-[16px] px-6 text-gray-600 w-full py-3 rounded-[4px] after:content-[""] after:absolute after:left-0 after:top-0 after:h-full after:w-[4px] after:bg-color-primary after:rounded-t-sm after:rounded-b-sm hover:text-color-primary`
            : ` flex items-center gap-4 ml-6 text-gray-600 text-[16px] w-full hover:text-color-primary py-3`
        }
      >
        <AiOutlineGift className="text-xl" />
        <p className="font-[500]">Coupons</p>
      </NavLink>
      {/*  */}
      <button
        className="flex items-center gap-4  text-center text-[16px] text-white w-[80%] bg-color-primary h-[40px] rounded-md  absolute bottom-3 left-[50%] -translate-x-[50%] justify-center"
        onClick={logout}
      >
        <MdLogout className="text-xl" />
        <p className="font-[500]">Logout</p>
      </button>
      {/*  */}
    </div>
  );
};

export default Slidebar;
