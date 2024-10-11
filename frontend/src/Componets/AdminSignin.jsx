// src/components/AdminSignIn.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";// Import the custom Axios instance

export default function AdminSignIn() {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

  const { name, email, password } = formData;

  // Handle input changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make a POST request to the backend for admin registration
      const response = await axios.post("http://localhost:4000/admin/signin", {
        name,
        email,
        password,
      });

      // Assuming the backend sends back a token
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Optionally, you can store other admin details if needed
      // localStorage.setItem('adminName', response.data.name);

      // Navigate to the admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      // Handle errors and set error message
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Signin</h2>

        {/* Display error message if any */}
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name" // Changed from "username" to "name"
              name="name" // Added name attribute
              value={name}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email" // Use type="email" for better validation
              id="email" // Changed from "username" to "email"
              name="email" // Added name attribute
              value={email}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password" // Added name attribute
              value={password}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button and Navigation to Login */}
          <div>
            <button
              type="submit" // Changed from onClick to form submission
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Signin
            </button>

            <h5 className="pt-5 text-center text-sm text-gray-600">
              Already have an admin account?{" "}
              <button
                type="button" // Prevent form submission
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/admin/login")}
              >
                Login
              </button>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
}
