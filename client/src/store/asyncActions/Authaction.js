import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGOUT,
  LOGIN_ERRORS,
} from "../types/usertypes";
import axios from "axios";

export const PostReg = (state) => {
  //headers config
  //redux thunk return a function
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/register", state, config);
      dispatch({ type: CLOSE_LOADER });
      //reg er time a amra token generate korbo
      //backend thekeo hoitese
      localStorage.setItem("myToken", data.token);
      //ekhn mytoken authReducer a access korte hobe

      //reg howar pore directly log in page a jawar jonno
      dispatch({ type: "SET_TOKEN", payload: data.token });
      console.log(data);
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      //get errror check or form valodation
      dispatch({
        type: REGISTER_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};

//login

export const postLogin = (state) => {
  return async (dispatch) => {
    //call this Postlogin in to login.jsx
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: SET_LOADER });
      const { data } = await axios.post("/login", state, config);
      dispatch({ type: CLOSE_LOADER });
      localStorage.setItem("myToken", data.token);
      dispatch({ type: SET_TOKEN, payload: data.token });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
      console.log(error.response);
    }
  };
};
