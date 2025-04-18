import React, { useRef } from "react";
import ConvertButton from "./ConvertButton";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
function ChooseFileBox() {
  return (
    <center>
      <div className="mainbox">
        <ConvertButton />
        <h6 className="m-0 mt-2 text-secondary p-0">Max file size 1 GB</h6>
        <h6 className="m-0 text-secondary mt-2 p-0">
          We guarantee that your files are secure and will be deleted upon
          completion of your work.
        </h6>
      </div>
    </center>
  );
}

export default ChooseFileBox;
