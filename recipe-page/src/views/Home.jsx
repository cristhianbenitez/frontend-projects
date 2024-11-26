import { useState, useEffect, useCallback } from 'react';
import { Header, Categories, RecipeCard, SearchBar } from '../components';
import mealDB from '../utils/mealDB';

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('Dessert');
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('Name');
  const [search, setSearch] = useState('');

  const fetchRecipes = useCallback(async (category) => {
    try {
      const response = await mealDB.getMealsByCategory(category);
      setRecipes(response.meals.slice(0, 6));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await mealDB.getCategories();
        setCategories(response.categories.slice(0, 6));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchRecipes(currentCategory);
  }, [currentCategory, fetchRecipes]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSortBy('Name');
    fetchRecipes(category);
  };

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    if (!searchTerm) {
      return fetchRecipes(currentCategory);
    }

    const searchMethods = [
      { method: mealDB.searchMealsByName },
      { method: mealDB.searchMealsByArea },
      { method: mealDB.searchMealsByIngredient }
    ];

    try {
      for (const { method } of searchMethods) {
        const response = await method(searchTerm);

        if (response.meals) {
          let results = response.meals;

          if (results.length > 0) {
            setRecipes(results.slice(0, 6));
            return;
          }
        }
      }

      // No results found in any search
      setRecipes([]);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
    }
  };

  const handleSorting = (sortBy) => {
    const sortedRecipes = [...recipes].sort((a, b) => {
      switch (sortBy) {
        case 'Name':
          return a.strMeal.localeCompare(b.strMeal);
        default:
          return a.idMeal.localeCompare(b.idMeal);
      }
    });
    setSortBy(sortBy);
    setRecipes(sortedRecipes);
  };

  return (
    <>
      <Header />
      <section className="w-full flex flex-col justify-center md:flex-row gap-8 mx-auto px-8 xl:px-[72px]">
        <Categories
          categories={categories}
          currentCategory={currentCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <section className="w-full md:w-10/12 md:max-w-[713px] lg:max-w-[844px]">
          <SearchBar
            sortBy={sortBy}
            handleSorting={handleSorting}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};
