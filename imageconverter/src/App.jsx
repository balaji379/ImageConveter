import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ImageConverter from "./component/imageConverter";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChooseFileBox from "./component/imageConverter/ChooseFileBox";
import AddMorefile from "./component/imageConverter/AddMorefile";
import ConversionResult from "./component/conversionResult";
import Loginpage from "./component/loginPage/Loginpage";
import PrivateRouter from "./component/privateRouter";
import ImageConverterStore from "./store/ImageConverterStore";
import Unauthorization from "./component/error/Unauthorization";

function App() {
  const { islogged, tokenvalidation } = ImageConverterStore((state) => state);
  const navigate = useNavigate();
  return (
    <div>
      {tokenvalidation == "true" ? navigate("/authentication_error") : null}
      <Routes>
        {/* private route */}
        <Route element={<PrivateRouter />}>
          {islogged === "true" ? (
            <>
              <Route path="/image-converte" element={<ImageConverter />}>
                <Route path="" element={<ChooseFileBox />} />
                <Route path="addmorefile" element={<AddMorefile />} />
              </Route>
              <Route
                path="/conversion-result"
                element={<ConversionResult />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/image-converte" element={<Loginpage />}>
                <Route path="" element={<Loginpage />} />
                <Route path="addmorefile" element={<Loginpage />} />
              </Route>
              <Route path="/conversion-result" element={<Loginpage />}></Route>
            </>
          )}
        </Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="*" element={<Loginpage />}></Route>
        <Route path="/authentication_error" element={<Unauthorization />} />
      </Routes>
    </div>
  );
}

export default App;
