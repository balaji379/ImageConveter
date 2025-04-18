import React, { Fragment, useEffect, useRef, useState } from "react";
import "./css/index.css";
import File from "./File";
import ImageConverterStore from "../../store/ImageConverterStore";
import { useNavigate } from "react-router-dom";
function AddMorefile() {
  const {
    files,
    setFiles,
    setFlag,
    flag,
    convertFormat,
    imageUrl,
    tokenvalidation,
    setTokenValidation,
  } = ImageConverterStore((state) => state);
  const newfile = useRef(null);
  const navigate = useNavigate();
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
      <center style={{ height: "75vh" }} className=" overflow-auto">
        <div className="row fileBox mt-5">
          <div
            style={{
              marginBottom: "15px",
              backgroundColor: "rgb(12, 81, 199)",
              color: "white",
            }}
            className={
              !flag
                ? "col-4 addmoreFileBtn"
                : "col-4 addmoreFilebtn btn disabled border border-0"
            }
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
              className=" ms-auto border btn btn-lg w-25 mb-2 p- fs-4"
              onClick={() => {
                navigate("/conversion-result");
                setFlag();
                try {
                  convertFormat(navigate);
                } catch (error) {
                  setTokenValidation("true");
                  navigate("/authentication_error");
                }
              }}
            >
              <i className="fa-solid fa-arrow-right me-3 fa-beat"></i>
              Convert
            </button>
          </div>
          <div className="col-12"></div>
        </div>
      </center>
    </Fragment>
  );
}

export default AddMorefile;
