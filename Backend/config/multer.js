const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

// Configure the Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user-profiles", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
  },
});

const upload = multer({ storage });

module.exports = upload;
