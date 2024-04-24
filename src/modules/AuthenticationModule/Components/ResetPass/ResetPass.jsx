// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../../../../assets/4 3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPass() {

  let navigate = useNavigate()

  let { register, handleSubmit, formState: { errors },  getValues } = useForm()
  
  // let password;
 
  const onSubmit = async(data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset"
        , data);
      console.log(response);
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  }

  // password = watch("password", "");

  let [showPassword, setShowPassword] = useState(null);

   return (
     <div className="auth-container ">
       <div className="container-fluid vh-100 bg-overlay">
         <div className="row vh-100 justify-content-center align-items-center">
           <div className="col-md-6 bg-white p-4 rounded-3 ">
             <div className="text-center">
               <img src={logo} className="w-50" alt="" />
             </div>
             <div className="form-content w-75 mx-auto my-2">
               <h3>Reset Password</h3>
               <p className="text-muted">
                 Please Enter Your Otp or Check Your Inbox
               </p>
               <form onSubmit={handleSubmit(onSubmit)}>
                 <div className="input-group mb-3">
                   <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-envelope text-muted"></i>
                   </span>
                   <input
                     type="text"
                     className="form-control bg-light"
                     placeholder="Email"
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
                     placeholder="OTP"
                     {...register("seed", {
                       required: "OTP Is Required",
                     })}
                   />
                 </div>
                 {errors.seed && (
                   <p className="alert alert-danger">{errors.seed.message}</p>
                 )}
                 <div className="input-group mb-3">
                   <span className="input-group-text" id="basic-addon1">
                     <i className="fa fa-lock text-muted"></i>
                   </span>
                   <input
                     type={showPassword ? "text" : "password"}
                     className="form-control bg-light"
                     placeholder="New Password"
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
                   <p className="alert alert-danger">
                     {errors.password.message}
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
                     <i className="fa fa-eye text-muted"></i>
                   </span>
                 </div>
                 {errors.confirmPassword && (
                   <p className="alert alert-danger">
                     {errors.confirmPassword.message}
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
