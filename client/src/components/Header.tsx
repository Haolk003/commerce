import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hook";
import Logo from "../assets/logo.svg";
import Slider from "react-slick";
import { AiOutlineClose, AiOutlineLogout, AiTwotoneFire } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiRefreshLine } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";
import IconMilk from "../assets/iconMilk.svg";
import { motion } from "framer-motion";
import { RiCustomerService2Fill } from "react-icons/ri";
import { addCart, deleteCart } from "../features/cart/cartSlice";
import { AddCart } from "../features/cart/cartSlice";
import { GetCart } from "../features/cart/cartSlice";
import { logout, openWishList } from "../features/auth/authSlice";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();
  const { cart, isSuccess } = useAppSelector((state) => state.cart);
  const [openModal, setOpenModal] = useState(false);
  const [request, setRequest] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    delay: 1.5,
    // beforeChange: function (currentSlide: any, nextSlide: any) {
    //   console.log("before change", currentSlide, nextSlide);
    // },
    // afterChange: function (currentSlide: any) {
    //   console.log("after change", currentSlide);
    // },
  };
  const variants = {
    open: { rotate: 180 },
    close: { rotate: 0 },
  };
  const variantModal = {
    open: { opacity: 1, y: 0 },
    close: { opacity: 0, y: -50 },
  };
  const handleOpenCart = () => {
    setOpenCart(true);
  };
  const handleCloseCart = () => {
    setOpenCart(false);
  };
  const hanleDelete = (id: string) => {
    dispatch(deleteCart(id));
  };
  const handlelogout = () => {
    dispatch(logout());
  };
  const openModalWishList = () => {
    dispatch(openWishList());
  };

  useEffect(() => {
    if (request) {
      const newCart = [];
      for (let i = 0; i < cart?.length; i++) {
        newCart.push({ id: cart[i].product._id, count: cart[i].count });
      }

      dispatch(AddCart(newCart));
    }
    setRequest(true);
  }, [cart]);
  useEffect(() => {
    dispatch(GetCart());
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between px-5 py-2 border-b-[1px] border-x-color-collection-pr">
        <ul className="flex items-center gap-2">
          <li className="border-r-[1px] px-2 text-xs border-text-color text-text-color ">
            About Us
          </li>
          <li className="border-r-[1px] px-2 text-xs border-text-color text-text-color ">
            My Account
          </li>
          <li className="border-r-[1px] px-2 text-xs border-text-color text-text-color ">
            Wishlist
          </li>
          <li className="border-r-[1px] px-2 text-xs border-text-color text-text-color ">
            Order Tracking
          </li>
        </ul>
        <Slider {...settings} className="w-[400px] text-center">
          <p className="text-sm text-heading-color">
            100% Secure delivery without contacting the courier
          </p>
          <p className="text-sm text-heading-color">
            Trending 25sliver jewelry, save up 35% off day
          </p>
          <p className="text-sm text-heading-color">
            Free shipping for u.s. orders $75+
          </p>
          <p className="text-sm text-heading-color">100% Secure delivery</p>
        </Slider>
        <div className="flex items-center gap-2">
          <div className="border-r-[1px] px-2 text-xs border-text-color text-text-color">
            Need help? Call Us: <a href="tel:+84582847760">+84582847760</a>
          </div>
          <div className="border-r-[1px] px-2 text-xs border-text-color text-text-color">
            United States(USD $)
          </div>
          <div className="border-r-[1px] px-2 text-xs border-text-color text-text-color">
            English
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-6  border-b-[1px] border-color-collection-pr  relative">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <form className="border-[2px] relative rounded-md gap-2 border-success-color w-[550px] h-[50px] flex items-center overflow-hidden px-4">
          <select
            defaultValue=""
            className="border-none outline-none w-[35%] h-full   "
          >
            <option value="">All Category</option>
            {categories.map((item, index) => {
              return (
                <option value="" key={item._id}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Im looking for..."
            className="w-[70%] h-[60%] px-5 outline-none relative border-l-[1px] border-l-color-collection-pr"
          />
          <div className="absolute right-3 top-[50%] -translate-y-[50%]">
            <BsSearch />
          </div>
        </form>
        <div className="flex items-center text-heading-color gap-4">
          <div
            className="flex items-center gap-2 relative"
            onClick={openModalWishList}
          >
            <div className="relative">
              <MdOutlineFavoriteBorder className="text-3xl" />
              {user?.wishList && user.wishList.length > 0 && (
                <span className="absolute -right-2 -top-1 w-5 h-5 text-center leading-5 bg-link-hover text-white text-xs rounded-full">
                  {user.wishList.length}
                </span>
              )}
            </div>

            <span>Wishlist</span>
          </div>
          <div
            className="flex items-center gap-2 "
            onClick={() => setOpenCart(!openCart)}
          >
            <div className="relative">
              <FiShoppingCart className="text-3xl" />
              {cart && cart.length > 0 && (
                <span className="absolute -right-2 -top-1 w-5 h-5 text-center leading-5 bg-link-hover text-white text-xs rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
            <span>Cart</span>
          </div>
          {user ? (
            <div
              className="cursor-pointer relative flex items-center gap-2 rounded-[25px] px-2 py-1 shadow-sm border-[1px] border-color-collection-pr shadow-color-collection-pr "
              onClick={() => setOpenUser(!openUser)}
            >
              <img
                src={user.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>
                <MdArrowDropDown className="text-xl" />
              </span>
              {openUser && (
                <div className="absolute top-14 right-0 bg-white rounded-md w-[160px]  shadow-sm shadow-color-collection-pr border-[1px] border-color-collection-pr z-40 flex flex-col">
                  <div
                    className="flex items-center gap- justify-around py-2 px-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handlelogout}
                  >
                    <AiOutlineLogout className="text-2xl" />
                    <span className="text-md ">Logout</span>
                  </div>
                  <div className="flex items-center gap- justify-around py-2 px-2 hover:bg-gray-100 cursor-pointer">
                    <CgProfile className="text-2xl" />
                    <Link to="/profile">
                      <span className="text-md ">Profile</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <div className="flex items-center gap-2">
                <BsPerson className="text-3xl" />
                <span>Log in</span>
              </div>
            </Link>
          )}
        </div>
        {/* cart */}
        {openCart && (
          <div className="absolute right-14 top-20 w-[350px] h-[400px] p-2 bg-white rounded-lg border-[1px] border-color-collection-pr shadow-sm z-40">
            <button className="float-right text-xl" onClick={handleCloseCart}>
              <AiOutlineClose />
            </button>
            <div className="h-[70%] flex flex-col mt-4 gap-2 overflow-auto">
              {cart &&
                cart.map((item, index) => {
                  return (
                    <div key={index} className="flex  gap-4 relative w-full">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-[70px] h-[100px] object-cover"
                      />
                      <div className="w-[60%] mt-2">
                        <h2 className="text-link-hover">
                          {item.product.title}
                        </h2>
                        <div className="flex items-center gap-1 ">
                          <span>{item.count}</span> <span>x</span>{" "}
                          <span className="text-heading-color">
                            $
                            {(
                              item.product.price -
                              (item.product.price *
                                item.product?.sale.discount) /
                                100
                            ).toFixed(2)}
                          </span>{" "}
                          {item.product.sale.discount > 0 && (
                            <span className="text-text-color line-through">
                              ${item.product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        className="absolute top-0 right-0"
                        onClick={() => hanleDelete(item.product._id)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <h3>Total:</h3>
                <span className="text-lg text-link-hover font-[500] mb-2">
                  $
                  {cart && cart.length > 0
                    ? cart
                        .reduce((total, item) => {
                          return total + item.count * item.product.price;
                        }, 0)
                        .toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <Link to="/cart">
                  <button className="h-[40px] w-[100px] border-[2px] hover:bg-color-2 hover:text-white border-link-hover rounded-md text-link-hover">
                    View Cart
                  </button>
                </Link>
                <Link to="/checkout">
                  <button className="h-[40px] w-[100px] border-[2px] hover:bg-color-2 bg-link-hover rounded-md text-white">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between relative h-[70px] z-30 border-b-[1px] border-color-collection-pr bg-white w-full px-5  ">
        <div
          className="bg-link-hover rounded-md text-white flex items-center gap-2 py-[10px] font-semibold px-4 text-md cursor-pointer"
          onClick={() => setOpenModal(!openModal)}
        >
          <TbLayoutGrid />
          <span>Browse All Categories</span>
          <motion.div
            variants={variants}
            animate={openModal ? "open" : "close"}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineChevronDown className={``} />
          </motion.div>
        </div>
        {openModal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            variants={variantModal}
            animate={openModal ? "open" : "close"}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-5 w-[550px] p-5 shadow-sm  shadow-heading-color rounded-lg absolute left-2 top-[80px] bg-white"
          >
            {categories &&
              categories.length > 0 &&
              categories.map((item, index) => {
                return (
                  <div
                    className="flex items-center gap-2  rounded-md hover:shadow-link-hover hover:border-link-hover cursor-pointer border-[1px] border-color-collection-pr   py-2 px-2"
                    key={item._id}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-[40px] h-[40px] object-cover"
                    />
                    <span>{item.title}</span>
                  </div>
                );
              })}
          </motion.div>
        )}
        <ul className="flex items-center gap-5 font-[500]">
          <NavLink
            to="/deal"
            className={({ isActive, isPending }) =>
              isPending ? "text-red-500" : isActive ? "text-link-hover" : ""
            }
          >
            {" "}
            <li className="flex items-center gap-2">
              {" "}
              <AiTwotoneFire className="text-red-500 text-2xl" />
              <span>Deals</span>{" "}
            </li>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "text-red-500" : isActive ? "text-link-hover" : ""
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive, isPending }) =>
              isPending
                ? "text-red-500"
                : isActive
                ? "text-link-hover"
                : "hover:text-link-hover cursor-pointer"
            }
          >
            {" "}
            <li>Shop</li>
          </NavLink>
          {/* <NavLink to="/products">Shop</NavLink> */}
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <div className="flex items-center gap-3">
          <RiCustomerService2Fill className="text-4xl text-heading-color " />
          <div>
            <h2 className="text-link-hover text-xl">1900 - 888</h2>
            <p>24/7 Support Center</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
