// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import logo from "../../../../assets/logo.png";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link} from 'react-router-dom';


export default function Slidebar({loginData}) {

  console.log(loginData?.userGroup);

  const logOut = () => {
    localStorage.removeItem('token')
  }

  let [isCollapse, setIsCollapse] = useState(false)
  
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  return (
    <>
      {loginData?.userGroup === "SystemUser" ? (
        <div className="sidebar-container position-sticky top-0">
          <Sidebar collapsed={isCollapse} className="text-white">
            <Menu>
              <div onClick={toggleCollapse}>
                <img src={logo} className="w-75" alt="" />
              </div>
              <MenuItem
                icon={<i className="fa fa-home"></i>}
                component={<Link to="" />}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-receipt"></i>}
                component={<Link to="/dashboard/recipes" />}
              >
                Recipes
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-heart"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                Favorites
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      ) : (
        <div className="sidebar-container position-sticky top-0">
          <Sidebar collapsed={isCollapse} className="text-white">
            <Menu>
              <div onClick={toggleCollapse}>
                <img src={logo} className="w-75" alt="" />
              </div>
              <MenuItem
                icon={<i className="fa fa-home"></i>}
                component={<Link to="" />}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-user-group "></i>}
                component={<Link to="/dashboard/users" />}
              >
                Users
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-receipt"></i>}
                component={<Link to="/dashboard/recipes" />}
              >
                Recipes
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-calendar-days"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                Categories
              </MenuItem>
              <MenuItem
                icon={<i className="fa  fa-unlock-keyhole"></i>}
                component={<Link to="/changePass" />}
              >
                Change Password
              </MenuItem>
              <MenuItem
                icon={<i className="fa fa-right-from-bracket"></i>}
                onClick={logOut}
                component={<Link to="/login" />}
              >
                logout
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      )}
    </>
  );
}
