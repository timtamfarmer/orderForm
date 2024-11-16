// src/pages/AdminHome.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';

const AdminHome = () => {
  const [overviewData, setOverviewData] = useState({});

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/api/admin/overview', config);
        setOverviewData(data);
      } catch (error) {
        console.error('Error fetching admin overview data:', error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-700">Admin Dashboard</h1>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
              <p className="text-lg font-medium">{overviewData.userCount}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-green-500 via-teal-500 to-green-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-semibold mb-2">Total Menus</h2>
              <p className="text-lg font-medium">{overviewData.menuCount}</p>
            </div>
            <div className="p-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-semibold mb-2">Pending Orders</h2>
              <p className="text-lg font-medium">{overviewData.orderCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default AdminHome;
