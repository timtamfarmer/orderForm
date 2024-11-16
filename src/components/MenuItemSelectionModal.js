// src/components/MenuItemSelectionModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuItemSelectionModal = ({ onClose, onSelectItem }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/menu-items'); // Fetch menu items from the API
        setMenuItems(data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Select Menu Item</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item._id}
              onClick={() => onSelectItem(item)}
              className="p-2 cursor-pointer hover:bg-gray-200 border-b"
            >
              {item.title}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MenuItemSelectionModal;
