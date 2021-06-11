const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
require("../db/connection");

//reg express form validator
const { body, validationResult } = require("express-validator");
module.exports.registrationVal = [
  body("name").not().isEmpty().trim().withMessage("Name is Required"),
  body("email").not().isEmpty().trim().withMessage("Email is Required"),
  body("password")
    .not()
    .isEmpty()
    .isLength(6)
    .trim()
    .withMessage("Pass Word Need 6 characters"),

  body("cpassword")
    .not()
    .isEmpty()
    .isLength(6)
    .trim()
    .withMessage("Pass Word Need 6 characters"),
];

// token two

//user Registration
const User = require("../Model/user");
module.exports.register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  const errors = validationResult(req);
  const perrors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "Email is Already Taken" });
    } else if (password != cpassword) {
      return res.status(401).json({ message: "Not Match pass" });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });

      const token = await user.generateAuthToken();

      console.log(`The Reg token part is ${token}`);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      await user.save();

      return res
        .status(200)
        .json({ msg: "Your account has been created", token });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//login val
module.exports.loginVal = [
  body("email").not().isEmpty().trim().withMessage("Email is Required"),
  body("password").not().isEmpty().trim().withMessage("Password is Required"),
];

//login part
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const { email, password } = req.body;

  try {
    const usermail = await User.findOne({ email: email });

    if (usermail) {
      const ismatch = await bcrypt.compare(password, usermail.password);
      const token = await usermail.generateAuthToken();
      console.log(`The login token part is ${token}`);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (ismatch) {
        res.status(201).json({ message: "You are Logined" });
      } else {
        return res.status(403).json({ message: "Password is Incorrected" });
      }
    } else {
      return res.status(404).json({ message: "Email Not Found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//get db data
module.exports.getData = (req, res) => {
  res.send(req.rootUser);
};

//logoutpart

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("Logout Succeed");
};
