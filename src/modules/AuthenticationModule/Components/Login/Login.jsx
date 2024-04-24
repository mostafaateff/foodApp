// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from '../../../../assets/4 3.png'
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

export default function Login( {saveLoginData} ) {

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
     
       toast.success("logged in successfully", {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
       });
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      navigate("/dashboard");
     
    } catch (error) {
     toast.error(error.response.data.message, {
       autoClose: 3000,
       hideProgressBar: true,
       pauseOnHover: false,
     });

    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-4 rounded-3 ">
              <div className="text-center">
                <img src={logo} className="w-50" alt="" />
              </div>
              <div className="form-content w-75 mx-auto">
                <h3>Log In</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group my-4 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Enter Your E-mail"
                      {...register("email", {
                        required: "Email Is Required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                          message: "Invalid mail",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <div className="input-group mt-4">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key text-muted"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control bg-light"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password Is Required",
                      })}
                    />
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <i className="fa fa-eye text-muted "></i>
                    </span>
                  </div>
                  {errors.password && (
                    <p className=" alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <div className=" mt-2 d-flex justify-content-between align-items-center">
                    <Link className=" fw-semibold text-black">
                      Register Now?
                    </Link>
                    <Link
                      className=" fw-semibold second-color "
                      to={"/forgetpass"}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button className=" button-style rounded-2 w-100 text-white fw-semibold py-2 my-2">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



