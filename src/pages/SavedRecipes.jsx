import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const SavedRecipes = () => {
  const [savedRecipeDetails, setSavedRecipeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        // Step 1: Fetch saved recipe IDs from backend
        const response = await axios.get(`${BASE_URL+'/api/user/get-saved-recipes'}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const savedRecipes = response.data || [];
        console.log("savedRecipes :"+savedRecipes[0].id);
        

        // Step 2: Fetch details from Spoonacular
        const detailsPromises = savedRecipes.map((item) =>
          axios.get(`https://api.spoonacular.com/recipes/${item.id}/information?includeNutrition=false&apiKey=${API_KEY}`)
        );

        console.log("detailsPromises : "+detailsPromises);
        
        const resolvedDetails = await Promise.all(detailsPromises);
        console.log("Resolved recipe details:", resolvedDetails);
        const fullDetails = resolvedDetails.map((res) => res.data);
        setSavedRecipeDetails(fullDetails);
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSavedRecipes();
  }, [token]);

  if (!token) {
    return <p className="text-center py-10 text-red-500">You need to be logged in to view saved recipes.</p>;
  }

  if (loading) {
    return <p className="text-center py-10 text-[#114232]">Loading your saved recipes...</p>;
  }

  return (
    <div className="min-h-screen bg-[#F7F6BB] px-6 py-10">
      <h2 className="text-3xl font-extrabold text-[#114232] mb-6 text-center">Your Saved Recipes</h2>
      {savedRecipeDetails.length === 0 ? (
        <p className="text-center text-[#114232]">No saved recipes yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {savedRecipeDetails.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
