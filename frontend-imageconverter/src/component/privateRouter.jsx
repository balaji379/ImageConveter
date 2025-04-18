import React from "react";
import ImageConverterStore from "../store/ImageConverterStore";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {
  const { islogged } = ImageConverterStore((State) => State);
  return (
    <div>{islogged === "true" ? <Outlet /> : <Navigate to={"/login"} />}</div>
  );
}

export default PrivateRouter;
