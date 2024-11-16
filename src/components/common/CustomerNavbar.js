// src/components/common/CustomerNavbar.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';

const CustomerNavbar = () => {

    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            return;
          }
  
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          const { data } = await axios.get('http://localhost:5000/api/customers/me', config);
          setUsername(data.username); // Assuming the response contains the username
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
  
      fetchUserData();
    }, []);

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // Redirect to login page
        navigate('/');
      };

      return (
        <nav className="bg-slate-700 p-4 text-white shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/customer" className="ml-4 text-gray-200 hover:text-gray-100 text-lg transition duration-300">
                <img src='/images/logo.png' />
              </Link>
              <h1 className="text-2xl font-semibold tracking-wide">
                Welcome, {username || 'Guest'}!
              </h1>
              
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/customer"
                className="hover:underline hover:text-gray-200 transition duration-300 text-lg"
              >
                Home
              </Link>
              <Link
                to="/customer/orders"
                className="hover:underline hover:text-gray-200 transition duration-300 text-lg"
              >
                Past Orders
              </Link>
              <Link
                to="/customer/settings"
                className="hover:underline flex items-center transition duration-300 text-lg"
              >
                <SettingsIcon fontSize="medium" className="text-white mr-1" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 text-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      );
      
      
};

export default CustomerNavbar;
