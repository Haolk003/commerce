import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import wishList from "../../assets/images/wishList.svg";
import prodcompare from "../../assets/images/prodcompare.svg";
import addCart from "../../assets/images/add-cart.svg";
import view from "../../assets/images/view.svg";
import wish from "../../assets/images/wish.svg";
import Box from "@mui/material/Box";
import tab from "../../assets/images/tab.jpg";
import tab2 from "../../assets/images/tab1.jpg";
import tab3 from "../../assets/images/tab2.jpg";
import tab4 from "../../assets/images/tab3.jpg";
type ProductCardProps = {
  grid: number;
};
const ProductCard = ({ grid }: ProductCardProps) => {
  const location = useLocation();

  return (
    <div
      className={`bg-white relative group overflow-hidden  px-2 py-3 ${
        location.pathname === "/our-store" && grid === 1 && "flex items-center"
      }`}
    >
      <div className="flex items-center justify-center ">
        <img
          src={tab}
          alt=""
          className={` ${
            location.pathname == "/our-store" && grid === 1
              ? "w-full h-auto"
              : "w-full h-[300px]"
          }  ${
            location.pathname !== "/our-store" && "group-hover:hidden"
          } h-[300px] object-cover block  `}
        />
        {location.pathname !== "/our-store" && (
          <img
            src={tab4}
            alt=""
            className={`h-[300px] ${
              location.pathname == "/our-store" && grid === 1
                ? "w-full h-[400px]"
                : "w-full"
            } object-cover hidden  group-hover:block`}
          />
        )}
      </div>

      <button className="absolute top-5 right-5 ">
        <img src={wish} alt="" />
      </button>
      <div className="px-2">
        <h4 className="text-text-primary mb-2">Havelis</h4>
        <h2 className="font-semibold">Honor T1 7.0 1GB RAM 8GB ROM... </h2>
        <Rating name="read-only" value={4} readOnly />
        <p
          className={`${
            location.pathname == "/our-store" && grid <= 2 ? "block" : "hidden"
          }`}
        >
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt...
        </p>
        <p className="font-semibold mb-5">$100.00</p>
      </div>
      <div className=" absolute  right-5 invisible opacity-0 top-10 group-hover:visible group-hover:opacity-100 translate-x-[100px] group-hover:translate-x-[0px] duration-500 ">
        <div className="flex flex-col gap-1 items-center ">
          <button>
            <img src={prodcompare} alt="" />
          </button>
          <button>
            <img src={view} alt="" />
          </button>
          <button>
            <img src={addCart} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
