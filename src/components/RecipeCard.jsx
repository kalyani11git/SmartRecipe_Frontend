// components/RecipeCard.jsx
import { Link } from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-[#114232] font-semibold text-lg">{recipe.title}</h3>
        {/* <p className="text-sm text-gray-500 mt-1">ID: {recipe.id}</p> */}
      </div>
    </div>
</Link>
  
  );
};

export default RecipeCard;
