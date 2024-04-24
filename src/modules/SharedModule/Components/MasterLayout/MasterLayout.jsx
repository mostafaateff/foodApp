// eslint-disable-next-line no-unused-vars
import React from "react";
import Slidebar from "../Slidebar/Slidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div>
              <Slidebar />
            </div>
          </div>
          <div className="col-md-9">
            <div>
              <Navbar  />
              <Header />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
