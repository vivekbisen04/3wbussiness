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
        <div className="text-xl">Loading...</div>
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
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">
                  #
                </th>
                <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">
                  Full Name
                </th>
                <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm">
                  Social Media
                </th>
                <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">
                  Profile Photo
                </th>
                <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.fullName}</td>
                  <td className="py-3 px-4">{user.socialMediaHandle}</td>
                  <td className="py-3 px-4">
                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}{" "}
                    {new Date(user.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
