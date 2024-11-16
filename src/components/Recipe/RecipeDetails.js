import React from 'react';

const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null; // If no recipe is selected, don't render anything

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {recipe.image && (
          <div className="mb-4">
            <img
              src={`http://localhost:5000/uploads/${recipe.image}`} // Adjust the path based on your server setup
              alt={recipe.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <p className="mb-4 text-gray-700">{recipe.description}</p>

        <h3 className="text-2xl font-semibold mb-3">Ingredients</h3>
        <ul className="list-disc list-inside mb-6">
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </li>
            ))
          ) : (
            <p>No ingredients listed.</p>
          )}
        </ul>

        <h3 className="text-2xl font-semibold mb-3">Steps</h3>
        <ol className="list-decimal list-inside space-y-4">
          {recipe.steps && recipe.steps.length > 0 ? (
            recipe.steps.map((step, index) => (
              <li key={index} className="p-4 border rounded shadow-sm">
                <div className="mb-2">
                  <strong className="text-lg">{step.title || `Step ${index + 1}`}</strong>
                  {step.time && (
                    <span className="ml-2 text-sm text-gray-500">({step.time} minutes)</span>
                  )}
                </div>
                <p className="text-gray-700">{step.description}</p>
                {step.media && (
                  <div className="mt-2">
                    {step.media.type === 'image' ? (
                      <img
                        src={`http://localhost:5000/uploads/${step.media.url}`} // Adjust the path
                        alt={`Step ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <video
                        controls
                        src={`http://localhost:5000/uploads/${step.media.url}`} // Adjust the path
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                )}
              </li>
            ))
          ) : (
            <p>No steps defined.</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
