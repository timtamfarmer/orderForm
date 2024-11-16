import React from 'react';

const RecipeList = ({ recipes, onSelectRecipe, onDeleteRecipe }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      {recipes.length > 0 ? (
        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="border p-4 rounded shadow hover:bg-gray-50 transition">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onSelectRecipe(recipe)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => onDeleteRecipe(recipe._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available.</p>
      )}
    </div>
  );
};

export default RecipeList;
