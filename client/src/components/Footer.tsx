import React from "react";
import { RiSendPlaneFill, RiCustomerService2Line } from "react-icons/ri";
import { FiMapPin, FiPhoneCall } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import CooperationIcon from "../assets/cooperation.svg";
import CouponIcon from "../assets/coupon.svg";
import PrinanceIcon from "../assets/prinance.svg";
import AssortmentIcon from "../assets/assortment.svg";
import ReturnIcon from "../assets/return.svg";
import Logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className="">
      <div className=" rounded-xl mx-5 relative  bg-[url('https://cdn.shopify.com/s/files/1/0652/4570/8532/files/banner-10.png?v=1659433764&width=1584')] h-[500px] mb-2">
        <img
          src="https://cdn.shopify.com/s/files/1/0652/4570/8532/files/banner-9.png?v=1659435716&width=900"
          alt=""
          className="w-[40%] absolute right-[2.5rem] bottom-0 h-auto rounded-xl object-cover"
        />
        <div className="absolute top-[50%] -translate-y-[50%] left-10 ">
          <h2 className="text-heading-color text-4xl w-[80%] font-semibold">
            Stay home & get your daily needs from our shop
          </h2>
          <p className="text-text-color mt-5">
            Start You'r Daily Shopping with{" "}
            <span className="text-link-hover">Nest Mart</span>
          </p>
          <div className="rounded-[25px] h-14 w-[400px] flex items-center mt-5 gap-2 bg-white  overflow-hidden">
            <RiSendPlaneFill className="text-3xl ml-3 text-color-collection-pr" />
            <input
              type="email"
              placeholder="Your email address"
              className="h-full px-2 w-full outline-none border-none"
            />
            <button className="bg-link-hover rounded-[25px] text-white h-full w-[190px] hover:bg-button-bg-color-hover">
              Subcribe
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between my-10 px-5">
        <div className="flex items-center gap-2 bg-gray-100 w-[20%] rounded-md h-[100px] px-3">
          <img src={CouponIcon} alt="" />
          <div>
            <h2 className="text-heading-color text-xl mb-1">
              Best prices & offers
            </h2>
            <p className="text-text-color">Orders $50 or more</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 w-[20%] rounded-md h-[100px] px-3">
          <img src={CooperationIcon} alt="" />
          <div>
            <h2 className="text-heading-color text-xl mb-1">Free delivery</h2>
            <p className="text-text-color">24/7 amazing services</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 w-[20%] rounded-md h-[100px] px-3">
          <img src={PrinanceIcon} alt="" />
          <div>
            <h2 className="text-heading-color text-xl mb-1">
              Great daily deal
            </h2>
            <p className="text-text-color">When you sign up</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 w-[20%] rounded-md h-[100px] px-3">
          <img src={AssortmentIcon} alt="" />
          <div>
            <h2 className="text-heading-color text-xl mb-1">Wide assortment</h2>
            <p className="text-text-color">Mega Discounts</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 w-[20%] rounded-md h-[100px] px-3">
          <img src={ReturnIcon} alt="" />
          <div>
            <h2 className="text-heading-color text-xl mb-1">Easy returns</h2>
            <p className="text-text-color">Within 30 days</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-5">
        <div className="flex flex-col justify-between h-[280px] text-text-color">
          <img src={Logo} alt="" className="w-[170px]" />
          <p>Pellenesque posuere orci lobortis</p>
          <div className="w-[300px]">
            <FiMapPin className="float-left mr-2 text-link-hover" />
            <span className="font-semibold text-heading-color">
              {" "}
              Address :
            </span>{" "}
            5171 W Campbell Ave Kent, Utah 53127 United States{" "}
          </div>
          <div className="w-[300px]">
            <RiCustomerService2Line className="float-left mr-2 text-link-hover" />{" "}
            <span className="font-semibold text-heading-color">Call Us:</span>
            (+91)-540-025-124553
          </div>
          <div className="w-[300px]">
            <RiSendPlaneFill className="float-left mr-2 text-link-hover" />
            <span className="font-semiblod text-heading-color">Email:</span>
            sale@Nest.com
          </div>
          <div className="w-[300px]">
            <BsClockHistory className="float-left mr-2 text-link-hover" />
            <span className="font-semiblod text-heading-color">Hours:</span>
            10:00-18:00, Mon - Sat
          </div>
        </div>
        <div className="flex flex-col justify-between h-[280px] text-text-color">
          <h2 className="text-heading-color text-2xl font-semibold">Company</h2>
          <p>About Us</p>
          <p>Delivery Infomation</p>
          <p>Privacy Poicy</p>
          <p>Tems & Conditions</p>
          <p>Contact Us</p>
          <p>Support Center</p>
          <p>Careers</p>
        </div>
        <div className="flex flex-col justify-between h-[280px] text-text-color">
          <h2 className="text-heading-color text-2xl font-semibold">Account</h2>
          <p>Sign in</p>
          <p>View Cart</p>
          <p>My Wishist</p>
          <p>Track My Order</p>
          <p>Help Ticket</p>
          <p>Shipping Details</p>
          <p>Compare products</p>
        </div>
        <div className="flex flex-col justify-between h-[280px] text-text-color">
          <h2 className="text-heading-color text-2xl font-semibold">
            Corporate
          </h2>
          <p>Become a Vendor</p>
          <p>Affiliate Program</p>
          <p>Farm Bunisess</p>
          <p>Farm Careers</p>
          <p>Our Suppliers</p>
          <p>Accessibility</p>
          <p>Promotions</p>
        </div>
        <div className="flex flex-col justify-between h-[280px] text-text-color">
          <h2 className="text-heading-color text-2xl font-semibold">
            Infomation
          </h2>
          <p>Milk & Flavoured Milk</p>
          <p>Butter and Margarine</p>
          <p>Eggs Substitutes</p>
          <p>Marmalades</p>
          <p>Sour Cream and Dips</p>
          <p>Tea & Kombucha</p>
          <p>Cheese</p>
        </div>
        <div className="flex flex-col justify-between h-[280px] text-text-color">
          <h2 className="text-heading-color text-2xl font-semibold">
            App & Payment
          </h2>
          <p>From App Store or Google Play</p>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.shopify.com/s/files/1/0652/4570/8532/files/app-store.jpg?v=1656495473&width=500"
              alt=""
              className="h-[40px]"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0652/4570/8532/files/google-play.jpg?v=1656495483&width=500"
              alt=""
              className="h-[40px]"
            />
          </div>
          <p>Secured Payment Gateways</p>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.shopify.com/s/files/1/0652/4570/8532/files/download.png?v=1656495526&width=500"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-color-collection-pr mt-14 flex items-center justify-between h-[80px] px-5">
        <p className="w-[300px]">
          © 2022, <span className="text-link-hover">Nest</span> - Made by
          BoostifyThemes All rights reserved.
        </p>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <FiPhoneCall className="text-4xl text-text-color" />
            <div>
              <h2 className="text-2xl font-[500] text-link-hover">
                1900 - 6666
              </h2>
              <p className="text-text-color text-sm">Woking 8:00 - 22:00</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiPhoneCall className="text-4xl text-text-color" />
            <div>
              <h2 className="text-2xl font-[500] text-link-hover">
                1900 - 8888
              </h2>
              <p className="text-text-color text-sm">24/7 Suppport Center</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-heading-color text-lg font-semibold">
              Follow Us
            </h2>
            <div className="h-8 w-8 bg-link-hover text-white rounded-full flex items-center justify-center">
              <FaFacebookF />
            </div>
            <div className="h-8 w-8 bg-link-hover text-white rounded-full flex items-center justify-center">
              <FaInstagram />
            </div>
            <div className="h-8 w-8 bg-link-hover text-white rounded-full flex items-center justify-center">
              <FaTwitter />
            </div>
            <div className="h-8 w-8 bg-link-hover text-white rounded-full flex items-center justify-center">
              <FaPinterestP />
            </div>
            <div className="h-8 w-8 bg-link-hover text-white rounded-full flex items-center justify-center">
              <FaYoutube />
            </div>
          </div>
          <p className="text-text-color mt-1">
            Up to 15% discount on your first sub
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
