// eslint-disable-next-line no-unused-vars
import React from 'react'
import logo from "../../../../assets/4 3.png";
import img from '../../../../assets/Group 48101676.png'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

  let navigate = useNavigate()
  
  const navToHome = () => {
    navigate('/dashboard/home')
  }

  return (
    <>
      <div className="notfound vh-100">
        <div className="container-fluid">
          <div className="row gap-0  ">
            <div className="col-md-4 notfound-Data ">
              <div className="notfound-logo h-25 m-4">
                <img src={logo} alt="" className="w-100" />
              </div>
              <div className="notfound-title my-5 ms-5 ">
                <h3 className="fw-bolder m-4">Oops.</h3>
                <h4 className="notfound-color m-4">Page not found</h4>
                <p className="w-75 m-4">
                  This Page doesn’t exist or was removed! We suggest you back to
                  home.
                </p>
                <button
                  onClick={navToHome}
                  className="notfound-button text-white w-75 py-2 rounded-2 fw-semibold m-4"
                >
                  <div className="w-50 mx-auto d-flex justify-content-center align-items-center pe-4">
                    <i className="fa fa-arrow-left w-25 pe-4"></i>
                    <div className=" text-center w-50  ">
                      <span>Back To Home</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="col-8   ">
              <div className="w-100 vh-100 bg-not position-relative ">
                <img src={img} className="w-50 position-absolute " alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
