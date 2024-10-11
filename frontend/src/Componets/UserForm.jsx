import React, { useState } from "react";
import axios from "axios"; // Import axios

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileSelect = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous message

    // Create form data to send
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("socialMediaHandle", socialMedia);

    // Append all selected files to the form data
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("profilePhoto", file);
      });
    }

    try {
      // Make a POST request using axios
      const response = await axios.post(
        "http://localhost:4000/user/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("User information submitted successfully!");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to submit the form. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">User Submission Form</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="social-media"
            className="block text-sm font-medium text-gray-700"
          >
            Social Media Handle:
          </label>
          <input
            id="social-media"
            type="text"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            placeholder="Enter your social media handle"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images:
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="images"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              type="button"
              className="w-32 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => document.getElementById("images").click()}
            >
              Choose Files
            </button>
            <span className="text-sm text-gray-500">
              {selectedFiles
                ? `${selectedFiles.length} file(s) selected`
                : "No file chosen"}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {message && (
          <div
            className={`mt-4 p-2 rounded-md ${
              message.includes("Error")
                ? "bg-red-200 text-red-700"
                : "bg-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
