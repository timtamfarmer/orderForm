import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeList from '../components/Recipe/RecipeList';
import RecipeForm from '../components/Recipe/RecipeForm';

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recipes');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateRecipe = async (formData) => {
    try {
      if (selectedRecipe) {
        // Update existing recipe
        await axios.put(`http://localhost:5000/api/recipes/${selectedRecipe._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create new recipe
        await axios.post('http://localhost:5000/api/recipes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchRecipes(); // Refresh the list
      setSelectedRecipe(null); // Clear selected recipe
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError('Failed to save recipe.');
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      fetchRecipes(); // Refresh the list
    } catch (err) {
      console.error('Error deleting recipe:', err);
      setError('Failed to delete recipe.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Recipe Management</h1>
      <div className="mb-6">
        <RecipeForm onSubmit={handleCreateOrUpdateRecipe} initialData={selectedRecipe} />
      </div>
      <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} onDeleteRecipe={handleDeleteRecipe} />
    </div>
  );
};

export default RecipeManagement;
