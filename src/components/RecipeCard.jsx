import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const RecipeCard = ({ recipe, onRemove }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative group">
      <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-[#114232] font-semibold text-lg">{recipe.title}</h3>
        </div>
      </Link>

      {/* Show trash icon if onRemove prop is provided */}
      {onRemove && (
        <button
          onClick={() => onRemove(recipe.id)}
          className="absolute top-2 right-2 bg-red-100 text-red-600 p-2 rounded-full shadow hover:bg-red-200 transition"
          title="Remove from saved"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
