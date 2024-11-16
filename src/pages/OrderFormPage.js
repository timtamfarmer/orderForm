import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderFormPage = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menus/active`);
      if (response.status === 200) {
        setMenuData(response.data.activeMenu);
      } else {
        setError(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response);
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
      } else if (err.request) {
        console.error('No response received:', err.request);
        setError('No response received from server.');
      } else {
        console.error('Error setting up request:', err.message);
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  const handleAddItem = (item) => {
    const uniqueId = item.id || item._id;
    const quantity = quantities[uniqueId] || 1;
    const existingItemIndex = selectedItems.findIndex((cartItem) => cartItem.id === uniqueId);
    if (existingItemIndex >= 0) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems((prevItems) => [...prevItems, { ...item, id: uniqueId, quantity }]);
    }
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = async () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    try {
      setIsModalOpen(false);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to place an order.');
        return;
      }
  
      // Ensure menuId is included in the order data
      const orderData = {
        menuId: menuData?._id, // Corrected to access menuId from menuData
        items: selectedItems,
        totalItems: selectedItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
        status: 'completed', // Explicitly set status to completed
      };
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post('http://localhost:5000/api/orders/create', orderData, config);
      if (response.status === 201) {
        alert('Order submitted successfully!');
        navigate('/customer');
        setSelectedItems([]); // Clear items
      } else {
        alert('Failed to submit the order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('An error occurred while submitting the order. Please try again later.');
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {/* Left Side: Active Menu Form */}
      <div className="w-full md:w-3/4 p-6 md:border-r border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400 text-center md:text-left">
          Order Form for {menuData?.menuTitle || 'Menu'}
        </h1>
        {menuData?.categories && menuData.categories.length > 0 ? (
          menuData.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-300">{category.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => {
                  const uniqueId = item.id || item._id || `${categoryIndex}-${itemIndex}`;
                  return (
                    <div
                      key={uniqueId}
                      className="border border-gray-700 rounded-lg p-4 bg-gray-900 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                    >
                      <span className="block text-xl font-bold mb-2 text-indigo-200">{item.title}</span>
                      <p className="mb-4 text-gray-300">{item.description}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <label className="block text-sm">Quantity:</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={quantities[uniqueId] || 1}
                          className="w-32 focus:ring-indigo-400 focus:outline-none"
                          onChange={(e) => handleQuantityChange(uniqueId, parseInt(e.target.value, 10))}
                        />
                        <span>{quantities[uniqueId] || 1}</span>
                      </div>
                      <button
                        onClick={() => handleAddItem(item)}
                        className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
                      >
                        Add to Order
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center">No menu items available.</p>
        )}
      </div>
  
      {/* Right Side: Live Preview Cart */}
      <div className="w-full md:w-1/4 p-6 bg-gray-900 rounded-lg md:ml-6 mt-6 md:mt-0 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Live Preview Cart</h2>
        {selectedItems.length > 0 ? (
          <div>
            {selectedItems.map((item, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-gray-400">Quantity: {item.quantity}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id || item._id || index, parseInt(e.target.value, 10))}
                  className="w-full mt-2 p-2 bg-gray-700 text-white rounded focus:ring-indigo-400 focus:outline-none"
                />
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="mt-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded w-full transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleSubmitOrder}
              className="mt-6 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg w-full transition duration-300"
            >
              Submit Order
            </button>
          </div>
        ) : (
          <p className="text-gray-400">No items in the cart.</p>
        )}
      </div>
  
      {/* Order Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <p className="text-lg mb-4">Are you sure you want to submit the order?</p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmOrder}
                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded w-full transition duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded w-full transition duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default OrderFormPage;
