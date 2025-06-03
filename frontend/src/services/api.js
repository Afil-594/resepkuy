// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Membuat instance Axios dengan base URL dari .env
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// --- Fungsi untuk Resep ---
export const searchRecipesAPI = (params) => {
  // params bisa berupa objek: { query, cuisine, diet, number, dll. }
  return apiClient.get('/recipes/search', { params });
};

export const getRecipeDetailsAPI = (id) => {
  return apiClient.get(`/recipes/${id}`);
};

export const findRecipesByIngredientsAPI = (ingredients, number) => {
  // ingredients adalah string, mis: "apples,flour,sugar"
  // number adalah opsional jumlah resep yang diinginkan
  const params = { ingredients };
  if (number) {
    params.number = number;
  }
  return apiClient.get('/recipes/findByIngredients', { params });
};

// --- Fungsi untuk Review ---
// Ganti dengan API key kamu yang sesuai
const REVIEW_API_KEY = 'f5d23f67e478b128c18503449c3b212f225b518afe9c8f4bc3b7c367e2a90762'; // ← ganti dengan API key kamu

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


// Anda bisa menambahkan fungsi lain di sini nanti jika dibutuhkan (misal, untuk favorit jika disimpan di backend)