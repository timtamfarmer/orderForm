// src/components/MenuItemFormModal.js
import React, { useState } from 'react';
import axios from 'axios';

const MenuItemFormModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('img', img);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      const token = localStorage.getItem('token');

      // Make the POST request to the API
      const response = await axios.post('http://localhost:5000/api/menu-items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensures form data is correctly encoded
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Menu item created:', response.data);

      // Reset form and close modal
      setTitle('');
      setDescription('');
      setImg(null);
      onClose();
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-400">Create Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Menu Item Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter item title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Menu Item Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter item description"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Menu Item Image</label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              className="w-full p-2 border rounded-lg bg-gray-900 text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent file:bg-gray-700 file:text-white file:border-0 file:mr-4 file:px-4 file:py-2"
              accept="image/*"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default MenuItemFormModal;
