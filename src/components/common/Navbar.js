// src/components/common/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Redirect to login page
    navigate('/');
  };

  return (
    <nav className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            to="/admin"
            className="hover:text-gray-200 transition duration-200 text-lg font-semibold"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/menus"
            className="hover:text-gray-200 transition duration-200 text-lg font-semibold"
          >
            Menu Management
          </Link>
          <Link
            to="/admin/orders"
            className="hover:text-gray-200 transition duration-200 text-lg font-semibold"
          >
            Order Management
          </Link>
          <Link
            to="/admin/recipes"
            className="hover:text-gray-200 transition duration-200 text-lg font-semibold"
          >
            Recipe Management
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
