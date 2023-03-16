import React from "react";
import FormGroup from "@mui/material/FormGroup";
import Rating from "@mui/material/Rating";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import watch from "../../assets/images/watch.jpg";
const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "45px", // set the desired height here
        },
      },
    },
  },
});
const Category = () => {
  return (
    <div className="w-[300px] ">
      <div className="px-3 py-2 bg-white">
        <h2 className="font-semibold mb-2">Shop By Categories</h2>
        <p className="text-text-primary2 cursor-pointer text-[14px] mb-1">
          Home
        </p>
        <p className="text-text-primary2 cursor-pointer text-[14px] mb-1">
          Our Store
        </p>
        <p className="text-text-primary2 cursor-pointer text-[14px] mb-1">
          Blogs
        </p>
        <p className="text-text-primary2 cursor-pointer text-[14px]">Contact</p>
      </div>
      <div className="mt-2 bg-white px-3 py-2">
        <h2 className="font-semibold">Filter By</h2>
        <h4 className="font-semibold text-sm mt-3">Availablity</h4>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="In Stock (1)"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="In Stock (0)"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
          />
        </FormGroup>
      </div>
      <div className=" bg-white px-2 py-3">
        <h2 className="font-semibold mb-2">Price</h2>
        <div className="flex items-center gap-2">
          <ThemeProvider theme={theme}>
            <span>$</span>
            <TextField
              id="filled-basic"
              label="From"
              variant="filled"
              type="number"
              defaultValue={0}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <span>$</span>
            <TextField
              id="filled-basic"
              label="To"
              variant="filled"
              type="number"
            />
          </ThemeProvider>
        </div>
      </div>
      <div className=" bg-white px-2 py-2">
        <h2 className="font-semibold">Color</h2>
        <div className="flex items-center gap-3 flex-wrap mt-3">
          <span className="w-6 h-6 bg-red-500 rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-blue-500 rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-orange rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-black rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-white rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-yellow-500 rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-gray-500 rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-green-500 rounded-full shadow-sm shadow-black"></span>
          <span className="w-6 h-6 bg-pink-500 rounded-full shadow-sm shadow-black"></span>
        </div>
      </div>
      <div className="bg-white px-2 py-2">
        <h2 className="font-semibold my-3">Size</h2>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="S(1)"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="M(2)"
            sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
          />
        </FormGroup>
      </div>
      <div className="bg-white px-2 py-2">
        <h2 className="font-semibold mb-4">Product Tags</h2>
        <div className="flex items-center flex-wrap gap-2">
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            HeadPhones
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Laptop
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Mobile
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Oppo
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Speaker
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Tablet
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Vivo
          </span>
          <span className="bg-gray-200 text-gray-500 py-1 px-2 rounded-sm text-sm">
            Wire
          </span>
        </div>
      </div>
      <div className="bg-white mt-2 px-2 py-2">
        <h2 className="font-semibold mb-3">Random Products</h2>
        <div className="flex items-center gap-2 mb-5">
          <img src={watch} alt="" className="w-[40%]" />
          <div>
            <h2 className="font-semibold mb-2 text-sm">
              Apple Watch Series 2 - 42 Mm Stainiess Steel...
            </h2>
            <Rating value={4} readOnly />
            <p>$100.00</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <img src={watch} alt="" className="w-[40%]" />
          <div>
            <h2 className="font-semibold mb-2 text-sm">
              Apple Watch Series 2 - 42 Mm Stainiess Steel...
            </h2>
            <Rating value={4} readOnly />
            <p>$100.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
