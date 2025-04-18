import React, { Fragment } from "react";

function NavBar() {
  return (
    <Fragment>
      <div
        style={{
          height: "10vh",
          marginTop: "1em",
          boxShadow: "0 0 20px 5px rgb(12, 81, 199)",
          backgroundColor: "white",
        }}
        className="container-fluid  p-3"
      >
        <div className="row g-3">
          <div className="col-5 ">
            <h2 style={{ color: "rgb(12, 81, 199)" }} className="px-3">
              <i className="fa-solid fa-list"></i>
            </h2>
          </div>
          <div className="col-7  ">
            <h3 className=" ">
              <span className="mx-2">
                <i
                  style={{ color: "rgb(12, 81, 199)" }}
                  className="fa-solid  fa-arrows-rotate"
                ></i>
              </span>
              <span style={{ color: "rgb(12, 81, 199)" }}>Image</span>{" "}
              <span className="text-black">Converter</span>
            </h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default NavBar;
