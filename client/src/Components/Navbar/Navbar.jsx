import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usercontext } from "../../App";
import { LOGOUT } from "../../store/types/usertypes";
const Navbar = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: "LOGOUT" });

    //thne AuthReducers a jaite hobe
    //logout er type dite hobe
  };
  const Rendermenu = () => {
    if (user) {
      return (
        <div>
          <Link to="/home" className="mr-5 hover:text-blue-500 ">
            Home
          </Link>
          <Link to="/blog" className="mr-5 hover:text-blue-500 ">
            Blog
          </Link>
          <Link to="/cp" className="mr-5 hover:text-blue-500 ">
            Create-Post
          </Link>

          <Link
            to="/logout"
            className="mr-5 hover:text-blue-500"
            onClick={logout}
          >
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/registration" className="mr-5 hover:text-blue-500 ">
            Registration
          </Link>
          <Link to="/" className="mr-5 hover:text-blue-500 ">
            Login
          </Link>
        </div>
      );
    }
  };

  const Propic = () => {
    if (user) {
      return (
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <header
        className="text-white-400 bg-gray-1000 body-font mt-4   sticky collapse  "
        collapseOnSelect
        expand="lg"
        variant="light"
        fixed="top"
      >
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center shadow-xl">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full mr-5"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="mr-14 text-xl">Mern Blog</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Rendermenu></Rendermenu>
          </nav>
          <div className="inline-flex  items-center py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 ">
            <Propic></Propic>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
