// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../../assets/4 3.png";
import axios from "axios";

export default function Register() {

  let appendToFormData = (data) => {
      
    let registerFormData = new FormData();

    registerFormData.append("userName", data.userName)
    registerFormData.append("email", data.email)
    registerFormData.append("country", data.country)
     registerFormData.append("password", data.password)
     registerFormData.append("confirmPassword", data.confirmPassword)
    registerFormData.append("phoneNumber", data.phoneNumber)
    registerFormData.append("profileImage", data.profileImage)

    return registerFormData ;

  };

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    let loginData = appendToFormData(data);
    
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        loginData
      );
      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      navigate("/verification");
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
      console.log(error);
    }
  };
  
  let [showPassword, setShowPassword] = useState(null);

  
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10 bg-white p-4 rounded-3 ">
            <div className="text-center">
              <img src={logo} className="w-50" alt="" />
            </div>
            <div className="form-content mx-5 my-2">
              <h3>Register</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div className="row g-0  justify-content-between">
                  <div className="col-md-5">
                    <div className="input-group my-4 ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light py-3"
                        placeholder="userName"
                        {...register("userName", {
                          required: "userName Is Required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger">
                        {errors.userName.message}
                      </p>
                    )}
                    <div className="input-group my-4  ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light py-3"
                        placeholder="country "
                        {...register("country", {
                          required: "country  Is Required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger">
                        {errors.country.message}
                      </p>
                    )}
                    <div className="input-group my-4 ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control bg-light py-3"
                        placeholder="password "
                        {...register("password", {
                          required: "password  Is Required",
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
                      <p className="alert alert-danger">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-5">
                    <div className="input-group my-4 ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light py-3"
                        placeholder="Enter Your E-mail "
                        {...register("email", {
                          required: "email  Is Required",
                          pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                            message: "Invalid mail",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="alert alert-danger">
                        {errors.email.message}
                      </p>
                    )}

                    <div className="input-group my-4 ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light py-3"
                        placeholder="phoneNumber "
                        {...register("phoneNumber", {
                          required: "phoneNumber Is Required",
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="alert alert-danger">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                    <div className="input-group my-4 ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control bg-light py-3"
                        placeholder="confirm-password "
                        {...register("confirmPassword", {
                          required: "Password Is Required",
                          validate: (value) =>
                            value === getValues("password") ||
                            "The passwords do not match",
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
                    {errors.confirmPassword && (
                      <p className="alert alert-danger">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row  justify-content-center">
                  <div className="col-md-6">
                    <div className="input-group my-4 ">
                      <input
                        type="file"
                        className="form-control bg-light py-3"
                        placeholder="profileImage"
                        {...register("profileImage", {
                          required: "profileImage Is Required",
                        })}
                      />
                    </div>
                    {errors.profileImage && (
                      <p className="alert alert-danger">
                        {errors.profileImage.message}
                      </p>
                    )}
                  </div>
                </div>
                <button className="button-style rounded-2 w-75 text-white fw-semibold py-2 my-1 ">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
