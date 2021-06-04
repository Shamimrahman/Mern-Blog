const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//for use in all file and this is imp for db connection
dotenv.config({ path: "./config.env" });
app.use(cors());

//db start
require("./db/connection");
app.use(cookieParser());

//db end

//cookie parser

//to get json data from postamn
app.use(express.json());

//to get json data from frontend
//Get data from ui
app.use(express.urlencoded({ extended: false }));

//middle ware data
app.use(bodyParser.json());

//router start
const router = require("./Router/routers");
app.use(router);
//middle ware data
app.use(bodyParser.json());
//connection

app.listen(port, () => {
  console.log(`Connected from ${port} host`);
});
