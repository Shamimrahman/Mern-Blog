const express = require("express");
const app = express();
const router = new express.Router();
require("../db/connection");
const jwt = require("jsonwebtoken");

const User = require("../Model/user");
//user registration
const {
  register,
  registrationVal,
  login,
  loginVal,
  logout,
  getData,
} = require("../Controller/userController");

//user Registration
router.post("/register", registrationVal, register);

//user Login
router.post("/login", loginVal, login);

//getData
const auth = require("../Middleware/auth");
router.get("/getdata", auth, getData);

//logout
router.get("/logout", auth, logout);
module.exports = router;
