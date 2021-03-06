import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import Fade from "react-reveal/Fade";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postLogin } from "../../store/asyncActions/Authaction";
import { useDispatch, useSelector } from "react-redux";
import { usercontext } from "../../App";
const Login = ({ setUser, user }) => {
  const { loginErrors, loading } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const history = useHistory();
  //Onchange functionality to check amra j input nite pari
  const [state, setstate] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const inputHandle = (e) => {
    name = e.target.name;
    value = e.target.value;

    setstate({ ...state, [name]: value });
  };

  //login functionality
  /*const login = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = state;

      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        toast.info("Please fill up the all fields");
      } else if (res.status === 403) {
        toast.error("Wrong Password ");
      } else if (res.status === 404) {
        toast.error("No Email Found ");
      } else {
        toast.success("Login Successfully");
        history.push("/home");

        //cotext api
        dispatch({ type: "USER", payload: true });
      }
    } catch (error) {}
  }; */

  const login = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(postLogin(state));
  };

  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors]);

  return (
    <div>
      <Fade bottom>
        <h1 className="text-center text-2xl mt-8 ml-42 mb-4">Login Page</h1>

        <div className="font-sans min-h-screen antialiased fixed-contain mt-5">
          <div className="flex flex-col sm:w-96 sm:m-auto mx-5 space-y-8">
            <form className="items-center" method="POST">
              <div className="flex flex-col div-des mt-9  p-10 rounded-lg shadow-2xl space-y-6">
                <h1
                  className="
             text-xl text-center text-gray-500 "
                >
                  Sign in to your account
                </h1>

                <div className="flex flex-col space-y-1 shadow-2xl ">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border css-des rounded px-3 py-2 w-full focus:outline-none focus:border-gray-500 focus:shadow border-gray-800 shadow-2xl "
                    placeholder="Email"
                    onChange={inputHandle}
                    value={state.email}
                  />
                </div>

                <div className="flex flex-col space-y-1 shadow-2xl">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="border- rounded 
                   css-des px-3 py-2 w-full focus:outline-none focus:border-gray-500 border-gray-800 focus:shadow shadow-2xl"
                    placeholder="Password "
                    onChange={inputHandle}
                    value={state.password}
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                  <Link to="/registration">
                    <a className="inline-block text-gray-500 hover:text-green-500 hover:underline">
                      Not Register?
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white font-bold px-5 py-2 rounded focus:outline-none shadow-2xl hover:bg-green-600 transition-colors"
                    onClick={login}
                  >
                    Log In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fade>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};

export default Login;
