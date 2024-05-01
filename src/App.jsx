import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import MasterLayout from "./modules/SharedModule/Components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/Components/NotFound/NotFound";
import AuthLayout from "./modules/SharedModule/Components/AuthLayout/AuthLayout";
import Dashbord from "./modules/HomeModules/Components/Dashbord/Dashbord";
import ReceipesList from "./modules/ReceipesModule/Components/ReceipesList/ReceipesList";
import CategoriesList from "./modules/CategoriesModule/Components/CategoriesList/CategoriesList";
import UsersList from "./modules/UsersModule/Components/UsersList/UsersList";
import Login from "./modules/AuthenticationModule/Components/Login/Login";
import Register from "./modules/AuthenticationModule/Components/Register/Register";
import ForgetPass from "./modules/AuthenticationModule/Components/ForgetPass/ForgetPass";
import ResetPass from "./modules/AuthenticationModule/Components/ResetPass/ResetPass";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/SharedModule/Components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  let [loginData, setLoginData] = useState(null);

  let saveLoginData = () => {
    let encodedCode = localStorage.getItem("token");
    let decodedCode = jwtDecode(encodedCode);
    setLoginData(decodedCode);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashbord /> },
        { path: "home", element: <Dashbord /> },
        { path: "recipes", element: <ReceipesList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index:true,
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "login",
          element: <Login saveLoginData={saveLoginData} />,
        },
        { path: "register", element: <Register /> },
        { path: "forgetPass", element: <ForgetPass /> },
        { path: "resetPass", element: <ResetPass /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
