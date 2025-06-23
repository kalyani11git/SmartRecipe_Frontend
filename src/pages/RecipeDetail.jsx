import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const recipeRes = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      setRecipe(recipeRes.data);

      const relatedRes = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/similar?number=4&apiKey=${API_KEY}`
      );
      setRelated(relatedRes.data);

      // 🔐 Check if already saved
      const token = localStorage.getItem('token');
      if (token) {
        const savedRes = await axios.get(
          `${BASE_URL+'/api/user/is-saved/'+id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsSaved(savedRes.data === true);
      }
    } catch (err) {
      console.error("Error fetching recipe details", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);


  const handleSaveRecipe = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to save recipes.");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/api/user/save-recipe',
        {
          id: recipe.id,
          savedAt: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Recipe added to favorites!");
        setIsSaved(true);
      } else {
        toast.error("Failed to save recipe.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving.");
    }
  };

  if (loading) return <p className="text-center py-10 text-[#114232]">Loading recipe...</p>;
  if (!recipe) return <p className="text-center text-red-500">Recipe not found</p>;

  return (
    <div className="bg-[#F7F6BB] text-[#114232] py-10 px-4 min-h-screen">
      {/* Main Info */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left: Image */}
        <div className="flex-1 relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full max-h-[500px] object-cover rounded-lg shadow-md"
          />
          <button
            onClick={handleSaveRecipe}
            disabled={isSaved}
            className={`absolute bottom-4 left-4 px-5 py-2 rounded-full font-semibold shadow-md transition ${
              isSaved ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#87A922] text-white hover:bg-[#6f8c1b]'
            }`}
          >
            {isSaved ? 'Saved' : '❤️ Save to Favorites'}
          </button>
        </div>

        {/* Right: Ingredients */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg mb-2"><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
          <p className="text-lg mb-6"><strong>Servings:</strong> {recipe.servings}</p>

          <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.extendedIngredients?.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
        <div
          className="leading-7"
          dangerouslySetInnerHTML={{ __html: recipe.instructions || "<p>No instructions available.</p>" }}
        />
      </div>

      {/* Related Recipes */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Related Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r) => (
              <a
                key={r.id}
                href={`/recipe/${r.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={`https://spoonacular.com/recipeImages/${r.id}-556x370.jpg`}
                  alt={r.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#114232] text-lg">{r.title}</h3>
                  <p className="text-sm text-[#87A922] mt-1">Ready in {r.readyInMinutes} mins</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
