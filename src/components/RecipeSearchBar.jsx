const RecipeSearchBar = ({
  query,
  setQuery,
  ingredients,
  setIngredients,
  diet,
  setDiet,
  onSearch
}) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-4 mb-8">
      <input
        type="text"
        placeholder="Search recipe name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87A922]"
      />
      <input
        type="text"
        placeholder="Ingredients (comma separated)..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87A922]"
      />
      <select
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87A922]"
      >
        <option value="">Select Diet</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten free">Gluten Free</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="paleo">Paleo</option>
      </select>
      <button
        onClick={onSearch}
        className="w-full sm:w-auto bg-[#87A922] hover:bg-[#6f8c1b] text-white px-6 py-2 rounded-full font-semibold transition"
      >
        🔍 Search
      </button>
    </div>
  );
};

export default RecipeSearchBar;
