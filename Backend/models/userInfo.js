const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    socialMediaHandle: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
