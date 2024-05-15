
import React, { useState } from "react";
import logo from "../../../../assets/4 3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function ChangePass() {

  let { register, handleSubmit, formState: { errors }, getValues } = useForm()

  let [showPassword, setShowPassword] = useState(false);
  
  let navigate = useNavigate()

  const toLogin = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  let onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",

        data ,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(response.data.message, {
        autoClose: 3000, 
        hideProgressBar: true,
        pauseOnHover : false
})
      toLogin()
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="auth-container ">
      <div className="container-fluid vh-100 bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white p-4 rounded-3 ">
            <div className="text-center">
              <img src={logo} className="w-50" alt="" />
            </div>
            <div className="form-content w-75 mx-auto my-2">
              <h3>Update Password</h3>
              <p className="text-muted">
                Please Enter Your Old Password & New Password You Need To Change
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-lock text-muted"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light"
                    placeholder="Old Password"
                    {...register("oldPassword", {
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
                {errors.oldPassword && (
                  <p className="alert alert-danger">
                    {errors.oldPassword.message}
                  </p>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-lock text-muted"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light"
                    placeholder="New Password"
                    {...register("newPassword", {
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
                {errors.newPassword && (
                  <p className="alert alert-danger">
                    {errors.newPassword.message}
                  </p>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-lock text-muted"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-light"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", {
                      required: "Password Is Required",
                      validate: (value) =>
                        value === getValues("newPassword") ||
                        "The passwords do not match",
                    })}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon1"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <i className="fa fa-eye text-muted"></i>
                  </span>
                </div>
                {errors.confirmNewPassword && (
                  <p className="alert alert-danger">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
                <button className="button-style rounded-2 w-100 text-white fw-semibold py-2 my-1">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
