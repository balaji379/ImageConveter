import React, { Fragment, useState } from "react";
import ImageConverterStore from "../../store/ImageConverterStore";

function File({ item, index }) {
  const { removeFile, changeFormat, flag, setFlag } = ImageConverterStore(
    (state) => state
  );
  // const [downloadFlag, setDownloadFlag] = useState(false);
  return (
    <Fragment>
      <div className="col-6 border border-2 p-3 ">
        <h5
          style={{ color: "rgb(12, 81, 199)" }}
          className="filename  fw-medium ms-5   text-start"
        >
          <i className="fa-solid me-3 fa-signature"> </i> {item.file.name}
        </h5>
        <h6
          style={{ color: "rgb(12, 81, 199)" }}
          className=" text-start ms-5  filesize "
        >
          <i className="fa-solid me-3 fa-ruler"></i>
          size : {item.file.size} kb
        </h6>
      </div>
      {/* adding file session start from here  */}
      <div
        className={
          !flag ? "align-items-center col-5 d-flex  border border-2 " : "d-none"
        }
      >
        <h5
          style={{
            color: "rgb(12, 81, 199)",
          }}
        >
          output :
        </h5>
        <select
          onChange={(event) => {
            changeFormat(index + 1, event.target.value);
          }}
          name="formats"
          id="formats"
          className="form-select mx-2 w-75 d-inline"
        >
          <option selected value="null">
            format
          </option>
          <option value="jpg">jpg</option>
          <option value="png">png</option>
          <option value="gif">gif</option>
          <option value="bmp">bmp</option>
          <option value="wbmp">wbmp</option>
        </select>
      </div>
      {/* adding file session ending here  */}
      {/* conversion result session start from here */}
      <div
        className={
          flag ? "align-items-center col-5 d-flex  border border-2" : "d-none"
        }
      >
        {/* download progress indicator start from here */}
        <div
          style={{ color: "rgb(12, 81, 199)" }}
          className={
            !item.downloadFlag ? "spinner-border me-4 p-0 ms-auto" : "d-none"
          }
          role="status"
        >
          <span className="p-0 m-0"></span>
        </div>
        {/* download progress indicator ending here */}

        {/* download progress completion indicator starting from here */}
        <h5
          style={{
            color: "rgb(12, 81, 199)",
            padding: "4px",
            marginLeft: "auto",
            marginRight: "1rem",
            marginTop: ".5rem",
          }}
          className={item.downloadFlag ? "d-block" : "d-none"}
        >
          <i class="fa-solid fs-3 fa-check fa-bounce"></i>
        </h5>
        {/* download progress completion indicator ending here */}

        {/* download btn starting from here  */}
        <a
          style={{ backgroundColor: "rgb(12, 81, 199)" }}
          href={item.downloadImg}
          download={"newformatfile" + "." + item.changeFormat}
          className={
            !item.downloadFlag
              ? "btn text-white btn-lg me-3 disabled "
              : "text-white btn btn-lg  me-3 btn-lg"
          }
        >
          Download
        </a>
        {/* download btn ending here  */}
      </div>
      {/* conversion result session ending here */}
      <div
        style={{
          color: "rgb(12, 81, 199)",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
        }}
        className="col-1 border border-2"
      >
        <center>
          <i
            style={{ cursor: "pointer", color: "rgb(12, 81, 199)" }}
            onClick={() => removeFile(index + 1)}
            className={
              item.flag
                ? "fa-solid fs-1 me-auto fa-square-xmark btn w-100 disabled border border-0"
                : "fa-solid fs-1 me-auto fa-square-xmark btn w-100  border border-0 "
            }
          ></i>
        </center>
      </div>
    </Fragment>
  );
}

export default File;
