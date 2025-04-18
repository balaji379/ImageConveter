import React, { Fragment } from "react";
import "./css/index.css";
import ConvertButton from "./ConvertButton";
import NavBar from "./navbar";
import { Outlet } from "react-router-dom";
import ChooseFileBox from "./ChooseFileBox";
import Header from "./header";
// import LoginPage from "../loginPage";
function ImageConverter() {
  return (
    <>
      <div className="position-fixed w-100 ">
        <NavBar />
      </div>
      <div className="">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default ImageConverter;
