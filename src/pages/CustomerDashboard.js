import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerNavbar from '../components/common/CustomerNavbar';
import OrderDetailsModal from '../components/OrderDetailsModal';

const calculateTimeToNextSundayNoon = () => {
  const now = new Date();
  let nextSunday = new Date();
  nextSunday.setDate(now.getDate() + ((0 - now.getDay() + 7) % 7)); // Calculate next Sunday
  nextSunday.setHours(12, 0, 0, 0); // Set to 12:00 PM (noon)
  return Math.max(0, nextSunday - now); // Ensure non-negative value
};

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [menuReady, setMenuReady] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextMenuTimeRemaining, setNextMenuTimeRemaining] = useState(calculateTimeToNextSundayNoon());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You are not logged in. Please log in to access your data.');
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [customerResponse, menuResponse, orderResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/customers/me', config),
          axios.get('http://localhost:5000/api/menus/active').catch(err => {
            console.error('Error fetching active menu:', err);
            return { data: null };
          }),
          axios.get('http://localhost:5000/api/orders/my-order', config).catch(err => {
            if (err.response && err.response.status === 404) {
              return null; 
            }
            throw err;
          }),
        ]);

        setCustomerData(customerResponse.data);
        setMenuReady(!!menuResponse.data);
        setCurrentMenu(menuResponse.data);
        setOrderPlaced(!!orderResponse);
        setOrderDetails(orderResponse ? orderResponse.data : null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Timer for next menu release countdown
    const interval = setInterval(() => {
      setNextMenuTimeRemaining(calculateTimeToNextSundayNoon());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMenuReadyClick = () => {
    if (currentMenu?.activeMenu) {
      const { menuTitle, _id } = currentMenu.activeMenu;
      navigate(`/menu-details/${_id}`, {
        state: {
          customerName: customerData?.username || 'Customer',
          customerId: customerData?._id || 'Unknown ID',
          menuTitle: menuTitle,
          menuId: _id,
        },
      });
    }
  };

  const openOrderModal = () => {
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="p-4">
        <CustomerNavbar />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <CustomerNavbar />
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        {error ? (
          <div className="text-red-400 mb-4">{error}</div>
        ) : (
          <div className="mt-8">
            {orderPlaced ? (
              <div className="bg-gray-800 bg-opacity-75 p-6 rounded shadow-lg">
                <p className="text-lg mb-4">Congratulations! You have successfully placed your order for the week.</p>
                <p className="text-lg mb-4">
                  <span className="font-semibold text-indigo-400">Time Until Next Menu Release:</span>
                  <div className="bg-gray-900 text-green-400 px-6 py-3 rounded-lg shadow-lg text-2xl font-mono tracking-wider mt-2">
                    {formatTime(nextMenuTimeRemaining)}
                  </div>
                </p>
                <button
                  onClick={openOrderModal}
                  className="p-3 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300"
                >
                  View Order
                </button>
              </div>
            ) : menuReady ? (
              <button
                onClick={handleMenuReadyClick}
                className="p-3 text-white rounded bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                Menu Ready!!
              </button>
            ) : (
              <div className="text-lg mb-4">No active menu available. Please check back later.</div>
            )}
          </div>
        )}

        {/* Order Details Modal */}
        {isModalOpen && orderDetails && (
          <OrderDetailsModal order={orderDetails} customerData={customerData} onClose={closeOrderModal} />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
