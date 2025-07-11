
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
});


export const searchRecipesAPI = (params) => {
  
  return apiClient.get('/recipes/search', { params });
};

export const getRecipeDetailsAPI = (id) => {
  return apiClient.get(`/recipes/${id}`);
};

export const findRecipesByIngredientsAPI = (ingredients, number) => {
  
  
  const params = { ingredients };
  if (number) {
    params.number = number;
  }
  return apiClient.get('/recipes/findByIngredients', { params });
};


const REVIEW_API_KEY = process.env.REACT_APP_REVIEW_API_KEY;

export const getReviewsAPI = (recipeId) => {
  return apiClient.get(`/reviews/${recipeId}`, {
    headers: {
      'x-api-key': REVIEW_API_KEY
    }
  });
};

export const addReviewAPI = (recipeId, reviewData) => {
  return apiClient.post(`/reviews/${recipeId}`, reviewData, {
    headers: {
      'x-api-key': REVIEW_API_KEY
    }
  });
};


