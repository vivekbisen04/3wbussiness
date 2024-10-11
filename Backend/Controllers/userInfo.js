const UserInfo = require("../models/userInfo");
const cloudinary = require("../config/cloudinaryConfig");


// Add a new user info
const addUserInfo = async (req, res) => {
  try {
    const { fullName, socialMediaHandle } = req.body;

    // req.file contains the image uploaded via multer
    const result = await cloudinary.uploader.upload(req.file.path);

   
    const newUser = new UserInfo({
      fullName,
      socialMediaHandle,
      profilePhoto: result.secure_url, // Use Cloudinary URL for the profile photo
    });

    // Save the user info to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User information added successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        success: false,
        message: "Failed to add user information",
        error: error.message,
      });
  }
};

// Get a specific user info by ID
const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user info by ID
    const userInfo = await UserInfo.findById(id);

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User information not found",
      });
    }

    res.status(200).json({
      success: true,
      data: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user information",
      error: error.message,
    });
  }
};

// Get all users info
const getAllUsersInfo = async (req, res) => {
  try {
    // Retrieve all user info from the database
    const users = await UserInfo.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user information",
      error: error.message,
    });
  }
};

module.exports = {
  addUserInfo,
  getUserInfo,
  getAllUsersInfo, // Export the new controller method
};
