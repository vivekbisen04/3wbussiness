const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  addUserInfo,
  getUserInfo,
  getAllUsersInfo,
} = require("../Controllers/userInfo");

// Route to add new user info
router.post("/add", upload.single("profilePhoto"), addUserInfo);

// Route to get user info by ID
router.get("/:id", getUserInfo);

// Route to get all users info
router.get("/", getAllUsersInfo);

module.exports = router;
