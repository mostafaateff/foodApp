
import React from "react";
import logo from "../../../../assets/4 3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Verification() {

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
    console.log(response);
      toast.success(response.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

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
                <h3>Verification</h3>
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

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Enter Your Code"
                      {...register("code", {
                        required: "code Is Required",
                      })}
                    />
                  </div>
                  {errors.code && (
                    <p className="alert alert-danger">{errors.code.message}</p>
                  )}
                  <button className=" button-style rounded-2 w-100 text-white fw-semibold py-2 my-2">
                    Submit
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
