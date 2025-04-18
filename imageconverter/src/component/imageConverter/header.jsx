import React from "react";
import ImageConverterStore from "../../store/ImageConverterStore";

function Header() {
  const { flag } = ImageConverterStore((state) => state);
  return (
    <div className="">
      <div className="d-flex  align-content-center flex-column">
        <center className="">
          <h1 className=" header ">Image Converter</h1>
          <h3 className="mt-3 text-secondary">
            Easily convert images from one format to another,online.
          </h3>
        </center>
      </div>
    </div>
  );
}

export default Header;
