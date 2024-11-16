// src/pages/CustomerSettings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get('http://localhost:5000/api/customers/me', config);
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put('http://localhost:5000/api/customers/me', { username, email }, config);
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Customer Settings</h1>
      {message && (
        <p className="mb-6 p-3 text-center bg-green-600 rounded text-white shadow-md">
          {message}
        </p>
      )}
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 rounded text-white font-semibold hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
  
};

export default CustomerSettings;
