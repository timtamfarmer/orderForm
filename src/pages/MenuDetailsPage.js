import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const calculateTimeToThursdayNoon = () => {
  const now = new Date();
  let nextThursday = new Date();
  nextThursday.setDate(now.getDate() + ((4 - now.getDay() + 7) % 7)); // Calculate next Thursday
  nextThursday.setHours(12, 0, 0, 0); // Set to 12:00 PM (noon)
  return Math.max(0, nextThursday - now); // Ensure non-negative value
};

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const MenuDetailsPage = () => {
  const location = useLocation();
  const [customerName, setCustomerName] = useState(location.state?.customerName || '');
  const [customerId, setCustomerId] = useState(location.state?.customerId || '');
  const { menuTitle, menuId, menuCategories } = location.state || {};
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeToThursdayNoon());
  const navigate = useNavigate();

  // Timer useEffect for order closing countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeToThursdayNoon());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/customers/me', config);
        setCustomerName(data.username);
        setCustomerId(data._id);
      } catch (err) {
        console.error('Failed to fetch customer data:', err);
      }
    };
    fetchCustomerData();
  }, []);

  const handleStartNowClick = () => {
    navigate(`/customer/orders/${menuId}`, {
      state: { customerName, customerId, menuTitle, menuId, menuCategories },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6 relative">
      <button
        onClick={() => navigate('/customer')}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-indigo-400">Menu Details</h1>
        <p className="text-lg mb-4"><span className="font-semibold">Customer Name:</span> {customerName || 'Loading...'}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Menu Title:</span> {menuTitle}</p>
        <p className="text-lg mb-4 flex flex-col items-center">
          <span className="font-semibold mb-2 text-indigo-400">Time Remaining Until Thursday 12 PM:</span>
          <div className="bg-gray-900 text-green-400 px-6 py-3 rounded-lg shadow-lg text-2xl font-mono tracking-wider">
            {formatTime(timeRemaining)}
          </div>
        </p>
        <button
          onClick={handleStartNowClick}
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default MenuDetailsPage;
