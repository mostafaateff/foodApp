// eslint-disable-next-line no-unused-vars
import React from "react";
import Slidebar from "../Slidebar/Slidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout(loginData) {
  return (
    <>
      <div className="d-flex ">
        <div className="sidebar-container">
          <Slidebar />
        </div>
        <div className="w-100">
          <Navbar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
