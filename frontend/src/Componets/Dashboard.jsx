// src/components/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import the custom Axios instance

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(""); // State to manage errors

  useEffect(() => {
    // Define an asynchronous function to fetch user data
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://threewbussiness.onrender.com/user"
        ); // GET request to /user
        if (response.data.success) {
          setUsers(response.data.data); // Assuming backend sends { success: true, data: [...] }
        } else {
          setError(response.data.message || "Failed to fetch user data.");
        }
        setLoading(false); // Data fetched successfully
      } catch (err) {
        // Handle errors
        const errorMessage =
          err.response?.data?.message || "Failed to fetch user data.";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchUsers(); // Invoke the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    // Render a loading state
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    // Render an error state
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 ">Admin Dashboard</h1>
          {/* Optional: Add a button or link here for additional actions */}
          {/* <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add User
          </button> */}
        </header>

        {/* Table Container */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">
                  #
                </th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">
                  Full Name
                </th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">
                  Social Media
                </th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">
                  Profile Photo
                </th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{user.fullName}</td>
                  <td className="py-4 px-6">
                    <a
                      href={user.socialMediaHandle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Social
                    </a>
                  </td>
                  <td className="py-4 px-6 ">
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="w-12 h-12 object-cover rounded-full border"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <span className="block">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Optional: Pagination or other controls can be added here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
