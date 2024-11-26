import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API endpoints
const getMealsByCategory = (category) => api.get(`/filter.php?c=${category}`);
const getCategories = () => api.get('/categories.php');
const searchMealsByName = (term) => api.get(`/search.php?s=${term}`);
const searchMealsByArea = (area) => api.get(`/filter.php?a=${area}`);
const searchMealsByIngredient = (ingredient) => api.get(`/filter.php?i=${ingredient}`);
const getMealById = (id) => api.get(`/lookup.php?i=${id}`);

const mealDB = {
  api,
  getMealsByCategory,
  getCategories,
  searchMealsByName,
  searchMealsByArea,
  searchMealsByIngredient,
  getMealById
};

export default mealDB;
