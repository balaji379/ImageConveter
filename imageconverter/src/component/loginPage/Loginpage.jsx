import React, { useEffect } from "react";
import "./css/login.css";
import { AiOutlineLogin } from "react-icons/ai";
import DynamicForm from "./DynamicForm";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ImageConverterStore from "../../store/ImageConverterStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Loginpage() {
  const { islogged, setislogged, setjwt } = ImageConverterStore(
    (state) => state
  );
  const navigate = useNavigate();
  // useeffect this function is use to check whether the use is valid user or not
  //
  async function validateUser() {
    const response = await axios.get(
      "http://localhost:8080/image/validate/user",
      { withCredentials: true }
    );

    if (response.status === 200) {
      setislogged("true");
      navigate("/image-converte");
      console.log(
        "jwt token print from validate user method in js : ",
        response.data
      );
      setjwt(response.data);
    } else console.log("this is print from else block :" + response.data);
  }
  //
  //
  useEffect(() => {
    validateUser();
  }, []);

  async function getJwt(data) {
    try {
      const { email, password } = data;
      console.log(`this form data ${email} ${password}`);
      const response = await axios.post(
        "http://localhost:8080/images-validate/generateToken",
        { username: email, password: password },
        { withCredentials: true }
      );

      setislogged("true");
      setjwt(response.data);
      navigate("/image-converte");
    } catch (e) {
      alert("invalid credentials please enter valid credentials");
    }
  }
  //
  //
  //
  //  Oauth authentication button configuration for google and github
  const googlebtn = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
    // const response = await axios.get(
    //   "http://localhost:8080/oauth2/authorization/google",
    //   {
    //     withCredentials: true,
    //   }
    // );
    console.log("this info print from google  : " + response.data);
  };
  const githubbtn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };
  // creating validation obj throught the zod
  const validationobj = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Atleast 5 Character" })
      .max(10, { message: "Atmost 10 Character" }),
  });

  // extract fields from the zustand store
  const {
    emailclassName,
    passclassName,
    emailIconclassName,
    passIconclassName,
  } = ImageConverterStore((state) => state);
  console.log("this is print from loginpage" + emailclassName);

  //  configure the zod with react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: zodResolver(validationobj) });

  // html code start here
  return (
    <div>
      <div id="logincontainer" className="container-fluid ">
        <div className="formbox">
          {/* logo start */}
          <div className=" logocontainer border">
            <div id="logobox" className="">
              <AiOutlineLogin className="loginlogo" />
            </div>
          </div>
          {/* logo end */}
          {/* welcome box start from here */}
          <div className=" m-0 w-100">
            <center className="mt-2">
              <span className="fs-4 ">Sign in with email</span>
              <center className="mt-2 welcomelinebox">
                <span className="welcomeline">
                  Welcome to Image Converter sign in to start transforming your
                  images!"
                </span>
              </center>
            </center>
          </div>
          {/* welcome box end here */}
          {/* login form start from here*/}
          <form className="mt-3 " onSubmit={handleSubmit(getJwt)}>
            <DynamicForm
              name="email"
              id="email"
              type="email"
              icon={"fa-solid fa-envelope"}
              setValue={setValue}
              register={{
                ...register("email"),
              }}
              inputFieldclass={emailclassName}
              inputFieldIconclass={emailIconclassName}
              error={errors.email}
            />
            <DynamicForm
              name="password"
              id="password"
              type="password"
              inputFieldclass={passclassName}
              inputFieldIconclass={passIconclassName}
              register={{
                ...register("password"),
              }}
              icon={"fa-solid fa-lock"}
              setValue={setValue}
              error={errors.password}
            />
            <p style={{ fontSize: "13px" }} className="text-end mb-2 me-3 mt-2">
              Forgot Password ?
            </p>
            <center>
              <button
                style={{ width: "86%", backgroundColor: "rgb(243, 233, 233)" }}
                className="btn border-2 submit rounded-5"
                type="submit"
              >
                Get Started
              </button>
            </center>
            <center style={{ fontSize: "13px", margin: "5px 0 0 0" }}>
              or sign in with
            </center>
          </form>
          <div className="oathuBtns">
            <button className="btn border " onClick={googlebtn}>
              <FcGoogle style={{ fontSize: "1em", marginBottom: "3px" }} />
              <span className="ms-2">Google</span>
            </button>
            <button className="btn border " onClick={githubbtn}>
              <ImGithub style={{ fontSize: "1em", marginBottom: "3px" }} />
              <span className="ms-2">Github</span>
            </button>
          </div>
          {/* login form ending here */}
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
