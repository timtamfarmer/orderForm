// src/components/MenuLayoutConfiguration.js
import React, { useState, useEffect } from 'react';

const MenuLayoutConfiguration = () => {
  const [categories, setCategories] = useState([{ title: '', items: [] }]);

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].title = value;
    setCategories(updatedCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { title: '', items: [] }]);
  };

  // Optionally, fetch available menu items from the database here

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1 text-sm font-medium">Category Title</label>
          <input
            type="text"
            value={category.title}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            className="w-full p-2 border rounded"
          />
          {/* Display available menu items and allow assignment here */}
        </div>
      ))}
      <button
        onClick={addCategory}
        className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Category
      </button>
    </div>
  );
};

export default MenuLayoutConfiguration;
