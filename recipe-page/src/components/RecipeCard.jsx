import PropTypes from 'prop-types';
import { Link } from 'react-router';

export const RecipeCard = ({ recipe }) => {
  return (
    <article className="rounded-xl bg-grayBlue p-2 md:h-[232px] flex flex-col">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-h-[180px] object-cover rounded-lg" />
        <h3 className="font-medium mt-2 truncate">{recipe.strMeal}</h3>
      </Link>
    </article>
  );
};

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired
};
