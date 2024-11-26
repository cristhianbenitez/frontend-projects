import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router';

import mealDB from '../utils/mealDB';
import Logo from '../assets/logo-light.svg';
import ArrowLeft from '../assets/expand-left.svg';

export const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const getMealById = useCallback(async (id) => {
    try {
      const response = await mealDB.getMealById(id);
      setRecipe(response.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  }, []);

  const getUniqueIngredients = useCallback((recipe) => {
    return Object.keys(recipe)
      .filter((key) => key.startsWith('strIngredient') && recipe[key])
      .map((key) => {
        const measureKey = key.replace('strIngredient', 'strMeasure');
        const measure = recipe[measureKey];
        const ingredient = recipe[key];
        return {
          key,
          text: `${measure ? measure + ' ' : ''}${ingredient}`
        };
      })
      .filter((item, index, self) => index === self.findIndex((t) => t.text === item.text));
  }, []);

  useEffect(() => {
    getMealById(id);
  }, [id, getMealById]);

  console.log(recipe);

  if (!recipe) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header className="site-header px-[72px] pt-8 pb-[52px]">
        <nav className="flex justify-between items-center">
          <Link to="/" className="logo">
            <img src={Logo} alt="Recipe App Home" />
          </Link>
          <Link to="/" className="back-link">
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 text-darkBlue">
              <img src={ArrowLeft} alt="" aria-hidden="true" />
              <span>Back to categories</span>
            </div>
          </Link>
        </nav>
      </header>

      <main className="max-w-[616px] mx-auto">
        <article className="recipe-details">
          <header>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full max-h-[400px] object-cover rounded-lg mb-8"
            />
            <h1 className="text-[2.5rem] font-playfair font-semibold mb-5">{recipe.strMeal}</h1>

            <div className="recipe-meta flex items-center gap-3 text-sm mb-10">
              <p className="bg-grayBlue px-6 py-3 rounded-full">
                <span>Category: </span>
                <span className="font-semibold">{recipe.strCategory}</span>
              </p>
              <p className="bg-grayBlue px-6 py-3 rounded-full">
                <span>Area: </span>
                <span className="font-semibold">{recipe.strArea}</span>
              </p>
            </div>
          </header>

          <section className="ingredients-section">
            <h2 className="text-base flex items-center gap-3 mb-4 font-bold">
              <i className="w-4 h-8 bg-[#FEBD2E] block rounded-full" aria-hidden="true" />
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 mb-10">
              {getUniqueIngredients(recipe).map(({ key, text }) => (
                <li key={key}>{text}</li>
              ))}
            </ul>
          </section>

          <section className="instructions-section mb-32">
            <h2 className="text-base flex items-center gap-3 mb-4 font-bold">
              <i className="w-4 h-8 bg-[#4E80EE] block rounded-full" aria-hidden="true" />
              Instructions
            </h2>
            {recipe.strInstructions.split('\n').map((instruction, index) => (
              <p key={index} className="mb-4">
                {instruction}
              </p>
            ))}
          </section>
        </article>
      </main>
    </>
  );
};
