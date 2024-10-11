// routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../Controllers/adminController");

// Route for admin registration (sign-in)
router.post("/signin", registerAdmin);

// Route for admin login
router.post("/login", loginAdmin);

module.exports = router;
