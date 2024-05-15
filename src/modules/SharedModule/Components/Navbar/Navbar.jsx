// eslint-disable-next-line no-unused-vars
import React from "react";
import icon from '../../../../assets/Ellipse 234.png'
import { Link } from "react-router-dom";

export default function Navbar({ loginData }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary  m-3 rounded-3 ">
      <div className="container-fluid">
        <input type="search" className=" form-control w-75" placeholder='Search here' />
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" > <img src={icon} className="w-25" /> {loginData?.userName}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
