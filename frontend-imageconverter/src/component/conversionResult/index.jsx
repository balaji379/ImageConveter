import React, { Fragment, useEffect, useRef, useState } from "react";
import "../imageConverter/css/index.css";
import File from "../imageConverter/File";
import ImageConverterStore from "../../store/ImageConverterStore";
import NavBar from "../imageConverter/navbar";
import Header from "../imageConverter/header";
import ConversionHeader from "./conversionHeader";
import axios from "axios";

function ConversionResult() {
  const { files, setFiles, setFlag, flag, convertFormat, imageUrl, jwtToken } =
    ImageConverterStore((state) => state);

  const newfile = useRef(null);

  function getNewformat() {
    console.log("this is new format function");
  }

  function handlefile(event) {
    console.log(newfile.current.files[0]);
    setFiles(newfile.current.files[0]);
    console.log(`print from zustand storeage : ${files}`);
  }

  function opendeviceStorage(events) {
    console.log(newfile.current.click());
  }

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <Fragment>
      <div className="position-fixed w-100 ">
        <NavBar />
      </div>
      <div className="">
        <ConversionHeader />
      </div>
      <center style={{ height: "75vh" }} className=" overflow-auto">
        <div className="row fileBox mt-5">
          <div
            style={{
              boxShadow: " 0px 0px 15px rgb(12, 81, 199)",
              marginBottom: "15px",
              backgroundColor: "rgb(12, 81, 199)",
              color: "white",
            }}
            className="col-4 addmoreFilebtn btn disabled border border-0"
            onClick={opendeviceStorage}
          >
            <input
              ref={newfile}
              type="file"
              name="newfile"
              id="newfile"
              onChange={handlefile}
            />
            <h4 className="text-white">
              <i
                style={{ color: "white" }}
                className="fa-solid me-4 fa-file-circle-plus"
              ></i>
              Add More Files
            </h4>
          </div>
          <div className="col-8"></div>
          <div
            className="row g-2 border border-2 p-3 "
            style={{
              backgroundColor: "white",
              marginBottom: "15px",
            }}
          >
            {files.map((item, index) => {
              return <File key={index + 1} index={index} item={item} />;
            })}
          </div>
          <div className="d-flex">
            <h5
              style={{ color: "rgb(12, 81, 199) ", fontFamily: "cursive" }}
              className="fs-3 h-100 mt-2 ms-5   d-flex justify-content-center  w-25"
            >
              Total Files : <span className="fa-fade ms-3">{files.length}</span>
            </h5>
            <button
              style={{ color: "white", backgroundColor: "rgb(12, 81, 199)" }}
              className=" ms-auto border btn disabled btn-lg w-25 mb-2 p- fs-4"
              onClick={getNewformat}
            >
              <i className="fa-solid fa-arrow-right me-3 fa-beat"></i>
              Convert
            </button>
          </div>
          <div className="col-12"></div>
        </div>
        <br />
      </center>
    </Fragment>
  );
}

export default ConversionResult;
