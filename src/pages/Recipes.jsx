import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import RecipeSearchBar from '../components/RecipeSearchBar';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [offset, setOffset] = useState(0);

  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [diet, setDiet] = useState('');

  const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

  const fetchRecipes = async (url, reset = false) => {
    setIsFetching(true);
    try {
      const response = await axios.get(url);
      const newRecipes = response.data.results || response.data.recipes || [];

      setRecipes(prev => (reset ? newRecipes : [...prev, ...newRecipes]));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const loadRandomRecipes = () => {
    const url = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;
    fetchRecipes(url, true);
    setIsSearchMode(false);
    setOffset(10);
  };

  const handleSearch = () => {
    const base = `https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=${API_KEY}`;
    const fullURL = `${base}${query ? `&query=${query}` : ''}${diet ? `&diet=${diet}` : ''}${ingredients ? `&includeIngredients=${ingredients}` : ''}`;
    fetchRecipes(fullURL, true);
    setIsSearchMode(true);
    setOffset(10);
  };

  const loadMore = () => {
    const base = isSearchMode
      ? `https://api.spoonacular.com/recipes/complexSearch?number=10&offset=${offset}&apiKey=${API_KEY}`
      : `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;

    const fullURL = isSearchMode
      ? `${base}${query ? `&query=${query}` : ''}${diet ? `&diet=${diet}` : ''}${ingredients ? `&includeIngredients=${ingredients}` : ''}`
      : base;

    fetchRecipes(fullURL);
    setOffset(prev => prev + 10);
  };

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !isFetching
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, isSearchMode, query, ingredients, diet]);

  return (
    <div className="min-h-screen bg-[#F7F6BB] px-6 py-10">
      <h2 className="text-3xl font-extrabold text-[#114232] mb-6 text-center">
        Explore Recipes by Ingredients, Name, or Diet
      </h2>

      <RecipeSearchBar
        query={query}
        setQuery={setQuery}
        ingredients={ingredients}
        setIngredients={setIngredients}
        diet={diet}
        setDiet={setDiet}
        onSearch={handleSearch}
      />

      {isFetching && recipes.length === 0 ? (
        <p className="text-center text-[#114232]">Loading recipes...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {isFetching && recipes.length > 0 && (
        <p className="text-center mt-6 text-[#114232]">Loading more recipes...</p>
      )}
    </div>
  );
};

export default Recipes;
