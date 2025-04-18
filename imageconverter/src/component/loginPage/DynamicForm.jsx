import React from "react";
import "./css/login.css";
import { useEffect } from "react";
import ImageConverterStore from "../../store/ImageConverterStore";
function DynamicForm({
  register,
  name,
  type = "text",
  icon,
  id,
  inputFieldclass,
  inputFieldIconclass,
  setValue,
  error,
}) {
  const {
    passPlaceHolder,
    emailPlaceHolder,
    handleLoginFormError,
    changeErrorMeassage,
  } = ImageConverterStore((state) => state);
  console.log(inputFieldIconclass);

  useEffect(() => {
    if (error) {
      handleLoginFormError(error, name, setValue);
    }
  }, [error]);
  return (
    <div className="input-group mt-3 px-4 mt-1">
      <span
        style={{ backgroundColor: "rgb(243, 233, 233)" }}
        className={inputFieldIconclass}
      >
        <center>
          <i className={icon}></i>
        </center>
      </span>
      <input
        style={{ backgroundColor: "rgb(243, 233, 233)" }}
        type={type}
        className={inputFieldclass}
        placeholder={name === "email" ? emailPlaceHolder : passPlaceHolder}
        id={id}
        name={name}
        onClick={() => changeErrorMeassage(name)}
        {...register}
      />
    </div>
  );
}

export default DynamicForm;
