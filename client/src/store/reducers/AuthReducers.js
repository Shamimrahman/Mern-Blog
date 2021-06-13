//at first amr initial state nite hobe for login and registration
//for auth

//reducers bujhay kivabe korbo
import jwt_decode from "jwt-decode";

import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGOUT,
  LOGIN_ERRORS,
} from "../types/usertypes";

const initialState = {
  loading: false,
  loginErrors: [],
  registerErrors: [],
  loginErrors: [],
  token: "",
  user: "",
};

//access my token

/*const token = localStorage.getItem("myToken");
console.log(token);
//ai token a amader ekjon user er sob info ase
//ekhn amader ai token ke decode korte hobe using jwt-decode

//check korte hobe j token expire hoise naki thn decode korte hobe
/*if (token) {
  const decodeToken = jwt_decode(token);
  console.log(decodeToken);
  const expiresIn = new Date(decodeToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
  } else {
    //initial state er token k access kora
    initialState.token = token;

    //thn decodeToken korar fole user a info gulo destructure korbo
    const { user } = decodeToken;
    console.log(user);
    initialState.user = user;

    //user k access
    //thn redux a dekhbo
  }
}*/

//uporer code k re use korar jonno ekta function create korte hobe

const verifyToken = (token) => {
  //if(token) er pore  removeItem porjonto nite hobe
  const decodeToken = jwt_decode(token);
  console.log(decodeToken);
  const expiresIn = new Date(decodeToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
  } else {
    return decodeToken;
  }

  //thne uporer getItem niye if(token){
  //verifyToken(token) korte hobe
};
const token = localStorage.getItem("myToken");
if (token) {
  const decoded = verifyToken(token);
  initialState.token = token;
  const { user } = decoded;
  initialState.user = user;
}

//now take function
//for login logout reg
const AuthReducer = (state = initialState, action) => {
  if (action.type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (action.type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (action.type === REGISTER_ERRORS) {
    return { ...state, registerErrors: action.payload };
  } else if (action.type === SET_TOKEN) {
    //for redirecteed page after reg
    const decoded = verifyToken(action.payload);
    const { user } = decoded;
    return {
      ...state,
      token: action.payload,
      user: user,
      registerErrors: [],
      loginErrors: [],
    };
  } else if (action.type === LOGOUT) {
    return { ...state, token: "", user: "" };
  } else if (action.type === LOGIN_ERRORS) {
    return { ...state, loginErrors: action.payload };
    //token save korar por errors gula token theke khali korte hobe
  } else {
    return state;
  }
};

export default AuthReducer;
