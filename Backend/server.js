const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// connecting to db
require("./dbconn.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userinfo=require("./Routes/Userroutes.js");
const adminRoutes = require("./Routes/adminRoutes.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json("nnsnsc");
});
app.use("/user",userinfo);
app.use("/admin",adminRoutes);



app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});