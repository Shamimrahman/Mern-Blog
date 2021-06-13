const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
require("../db/connection");
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};
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
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    if (password != cpassword) {
      return res.status(401).json({ errors: [{ msg: "Password Not Match" }] });
    }
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });

      const token = createToken(user);

      console.log(`The Reg token part is ${token}`);
      return res
        .status(200)
        .json({ msg: "Your account has been created", token });
    } catch (error) {
      return res.status(500).json({ errors: error });
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
/*module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Please fill up al fileds" }] });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const ismatch = await bcrypt.compare(password, user.password);

      if (ismatch) {
        const token = createToken(user);
        console.log(`The login token part is ${token}`);

        return res.status(201).json({ msg: "You are Logined" });
      } else {
        return res
          .status(403)
          .json({ errors: [{ msg: "Password is not correct" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
*/
//get db data
module.exports.getData = (req, res) => {
  res.send(req.rootUser);
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ msg: "You have login successfully", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Password is not correct" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

//logoutpart

/*module.exports.logout = (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("Logout Succeed");
}; */
