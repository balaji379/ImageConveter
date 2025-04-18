import React, { Fragment, useRef } from "react";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
import ImageConverterStore from "../../store/ImageConverterStore";
function ConvertButton() {
  const file = useRef(null);
  const navigate = useNavigate();
  const { setFiles } = ImageConverterStore((state) => state);
  function handleFile(event) {
    file.current.click();
  }
  function addfile(event) {
    console.log(file.current.files[0].name);
    setFiles(file.current.files[0]);
    navigate("addmorefile");
  }
  return (
    <Fragment>
      <div
        className="border rounded rounded-4 inputfilebtn"
        onClick={handleFile}
      >
        <input
          ref={file}
          className="convertBtn m-0 p-0"
          type="file"
          name="file"
          id="file"
          placeholder="file"
          onChange={addfile}
        />
        Choose File
      </div>
    </Fragment>
  );
}

export default ConvertButton;
