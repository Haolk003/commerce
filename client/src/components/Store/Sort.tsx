import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import gr from "../../assets/images/gr.svg";
import gr2 from "../../assets/images/gr2.svg";
import gr3 from "../../assets/images/gr3.svg";
import gr4 from "../../assets/images/gr4.svg";

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "35px",
          background: "#dadada",
          border: "none",
          outline: "none",
          // set the desired height here
        },
      },
    },
  },
});
const Sort = ({ setGrid, grid }: any) => {
  return (
    <div className="bg-white py-2 px-1 flex justify-between w-full h-[60px]">
      <div className="flex items-center gap-3">
        <h2>Sort By:</h2>
        <FormControl>
          <ThemeProvider theme={theme}>
            <Select defaultValue="manual">
              <MenuItem value="manual">Featured</MenuItem>
              <MenuItem value="best-selling">Best selling</MenuItem>
              <MenuItem value="title-ascending">Alphabetically, A-Z</MenuItem>
              <MenuItem value="title-descending">Alphabetically, Z-A</MenuItem>
              <MenuItem value="title-ascending">Price, low to high</MenuItem>
              <MenuItem value="tile-descending">Price, high to low</MenuItem>
              <MenuItem value="created-ascending">Date, old to new</MenuItem>
              <MenuItem value="created-descending">Date, new to old</MenuItem>
            </Select>
          </ThemeProvider>
        </FormControl>
      </div>
      <div className="flex items-center gap-3">
        <p>21 Products</p>
        <div
          className={` ${
            grid === 4 ? "bg-gray-500 fill-white" : "bg-gray-200 text-black"
          } py-2 px-2 rounded-md cursor-pointer`}
          onClick={() => setGrid(4)}
        >
          {" "}
          <img src={gr4} alt="" className="w-[15px] h-[15px] fill-white" />
        </div>
        <div
          className={` ${
            grid === 3 ? "bg-gray-500 fill-white" : "bg-gray-200 text-black"
          } py-2 px-2 rounded-md cursor-pointer`}
          onClick={() => setGrid(3)}
        >
          <img src={gr3} alt="" className="w-[15px] h-[15px]" />
        </div>
        <div
          className={` ${
            grid === 2 ? "bg-gray-500 fill-white" : "bg-gray-200 text-black"
          } py-2 px-2 rounded-md cursor-pointer`}
          onClick={() => setGrid(2)}
        >
          {" "}
          <img src={gr2} alt="" className="w-[15px] h-[15px]" />
        </div>
        <div
          className={` ${
            grid === 1 ? "bg-gray-500 fill-white" : "bg-gray-200 text-black"
          } py-2 px-2 rounded-md cursor-pointer`}
          onClick={() => setGrid(1)}
        >
          <img src={gr} alt="" className="w-[15px] h-[15px]" />
        </div>
      </div>
    </div>
  );
};

export default Sort;
