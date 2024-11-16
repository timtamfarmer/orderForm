// src/components/FormBuilder.js
import React, { useState } from 'react';
import MenuItemSelectionModal from './MenuItemSelectionModal'; // Modal to select menu items
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

const FormBuilder = () => {
  const [categories, setCategories] = useState([]);
  const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(null);
  const [menuTitle, setMenuTitle] = useState('');

  // Function to add a new category
  const addCategory = () => {
    setCategories([...categories, { title: '', items: [] }]);
  };

  // Function to update the category title
  const updateCategoryTitle = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].title = value;
    setCategories(updatedCategories);
  };

  // Function to open the menu item modal
  const openMenuItemModal = (index) => {
    setSelectedCategoryIndex(index);
    setIsMenuItemModalOpen(true);
  };

  // Function to close the menu item modal
  const closeMenuItemModal = () => {
    setIsMenuItemModalOpen(false);
  };

  // Function to add an item to a category
  const addItemToCategory = (item) => {
    if (selectedCategoryIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[selectedCategoryIndex].items.push(item);
      setCategories(updatedCategories);
    }
    closeMenuItemModal();
  };

   // Function to remove a category
   const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
    setTooltipOpen(null); // Close tooltip when removing category
  };

  // Function to toggle tooltip
  const toggleTooltip = (index) => {
    setTooltipOpen(tooltipOpen === index ? null : index);
  };

  // Function to remove an item from a category
  const removeItemFromCategory = (categoryIndex, itemIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items.splice(itemIndex, 1); // Remove the item
    setCategories(updatedCategories);
  };

  // Function to submit the menu to the database
  const submitMenu = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/menus/create', { menuTitle, categories });
      console.log('Menu saved:', response.data);
      alert('Menu successfully saved!');
      
      // Use state setters if categories and menuTitle are state variables
      setCategories([]); // or setCategories('') depending on its type (empty array for arrays, empty string for string)
      setMenuTitle(''); // Reset menuTitle to an empty string
    } catch (error) {
      console.error('Error saving menu:', error);
      alert('Failed to save the menu.');
    }
  };
  

  return (
    <div className="p-8 flex-grow bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Form Builder</h1>
      <div className="mb-6">
        <input
          type="text"
          value={menuTitle}
          onChange={(e) => setMenuTitle(e.target.value)}
          placeholder="Enter Menu Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition"
        />
      </div>
      <button
        onClick={addCategory}
        className="flex items-center gap-2 px-4 py-2 mb-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-lg"
      >
        <AddCircleIcon className="text-white" />
        Add Category
      </button>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-3 shadow-sm">
            <input
              type="text"
              value={category.title}
              onChange={(e) => updateCategoryTitle(categoryIndex, e.target.value)}
              placeholder="Category Title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 transition"
            />
            <button
              onClick={() => toggleTooltip(categoryIndex)}
              className="ml-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition"
            >
              <SettingsIcon className="text-gray-600" />
            </button>
            {tooltipOpen === categoryIndex && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg p-2">
                <button
                  onClick={() => removeCategory(categoryIndex)}
                  className="text-red-600 hover:text-red-800 block px-4 py-2"
                >
                  Remove Category
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => openMenuItemModal(categoryIndex)}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow"
          >
            Add Menu Item
          </button>
          <ul className="mt-4">
            {category.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg mb-2 shadow-sm"
              >
                <span className="font-medium">{item.title}</span>
                <button
                  onClick={() => removeItemFromCategory(categoryIndex, itemIndex)}
                  className="p-2 text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {isMenuItemModalOpen && (
        <MenuItemSelectionModal onClose={closeMenuItemModal} onSelectItem={addItemToCategory} />
      )}
      <button
        onClick={submitMenu}
        className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 shadow-lg"
      >
        Submit Menu
      </button>
    </div>
  );
  
};

export default FormBuilder;
