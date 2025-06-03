
const axios = require('axios');
require('dotenv').config(); 

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = process.env.SPOONACULAR_API_KEY;


exports.searchRecipes = async (req, res) => {
  
  const { query, cuisine, diet, maxCalories, maxReadyTime, number } = req.query;

  try {
    const params = {
      apiKey: API_KEY,
      query: query,
      number: number || 20, 
      addRecipeInformation: true, 
    };

    
    if (cuisine) params.cuisine = cuisine;
    if (diet) params.diet = diet;
    if (maxCalories) params.maxCalories = maxCalories;
    if (maxReadyTime) params.maxReadyTime = maxReadyTime;

    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, { params });
    res.json(response.data.results); 
  } catch (error) {
    console.error('Error searching recipes:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching recipes from Spoonacular', error: error.message });
  }
};


exports.getRecipeDetails = async (req, res) => {
  const { id } = req.params;

  
  const constructedUrl = `${SPOONACULAR_BASE_URL}/${id}/information`;

  console.log('----------------------------------------------------');
  console.log('[Backend Log] Attempting to fetch URL for recipe details:');
  console.log('Constructed URL:', constructedUrl); 
  console.log('Recipe ID:', id);
  console.log('SPOONACULAR_BASE_URL:', SPOONACULAR_BASE_URL);
  console.log('API Key being used (first 5 chars):', API_KEY ? API_KEY.substring(0, 5) + '...' : 'API KEY NOT FOUND/UNDEFINED');
  console.log('----------------------------------------------------');

  try {
    const response = await axios.get(constructedUrl, {
      params: { apiKey: API_KEY, includeNutrition: true }
    });
    res.json(response.data);
  } catch (error) {
    console.error('------------------- ERROR DETAILS --------------------');
    console.error(`Error fetching recipe details for ID ${id}:`);
    if (error.isAxiosError) {
        console.error('Axios error config URL:', error.config.url);
        console.error('Axios error message:', error.message);
        console.error('Axios error response:', error.response ? error.response.data : 'No response data');
    } else {
        console.error('Non-Axios error:', error.message);
    }
    console.error('----------------------------------------------------');
    res.status(500).json({ message: 'Error fetching recipe details from server', error: error.message });
  }
};


exports.findRecipesByIngredients = async (req, res) => {
  const { ingredients, number } = req.query;

  if (!ingredients) {
    return res.status(400).json({ message: "Parameter 'ingredients' dibutuhkan." });
  }

  try {
    const params = {
      apiKey: API_KEY,
      ingredients: ingredients,
      number: number || 10,
      ranking: 1,
    };
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/findByIngredients`, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error finding recipes by ingredients:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error finding recipes by ingredients', error: error.message });
  }
};