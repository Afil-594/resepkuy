
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchRecipesAPI, findRecipesByIngredientsAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard'; 

const SearchResultsPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const [searchQueryDisplay, setSearchQueryDisplay] = useState('');


  useEffect(() => {
    const fetchRecipes = async () => {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get('query');
      const ingredients = queryParams.get('ingredients');
      const cuisine = queryParams.get('cuisine');
      const diet = queryParams.get('diet');
      const maxCalories = queryParams.get('maxCalories');

      
      if (query) {
        setSearchQueryDisplay(`untuk "${query}"`);
      } else if (ingredients) {
        setSearchQueryDisplay(`dengan bahan "${ingredients}"`);
      } else {
        setSearchQueryDisplay('');
      }


      setIsLoading(true);
      setError('');
      setRecipes([]);

      try {
        let response;
        const apiParams = {};

        if (ingredients) {
          apiParams.ingredients = ingredients;
          
          if (cuisine) apiParams.cuisine = cuisine; 
          if (diet) apiParams.diet = diet;
          if (maxCalories) apiParams.maxCalories = maxCalories;
          response = await findRecipesByIngredientsAPI(apiParams.ingredients); 
          setRecipes(response.data || []);
        } else {
          apiParams.query = query;
          if (cuisine) apiParams.cuisine = cuisine;
          if (diet) apiParams.diet = diet;
          if (maxCalories) apiParams.maxCalories = maxCalories;
          response = await searchRecipesAPI(apiParams);
          setRecipes(response.data || []);
        }
      } catch (err) {
        console.error("Error fetching search results:", err.response ? err.response.data : err.message);
        setError('Gagal memuat hasil pencarian. Coba lagi nanti atau periksa koneksi Anda.');
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [location.search]);

  return (
    <div style={pageContainerStyle}>
      <Link to="/" style={backLinkStyle}>&larr; Kembali ke Pencarian Utama</Link>
      <h1 style={pageTitleStyle}>Hasil Pencarian Resep {searchQueryDisplay}</h1>

      {isLoading && <p style={statusMessageStyle}>Sedang mencari resep untuk Anda...</p>}
      {error && <p style={{...statusMessageStyle, color: '#d9534f'}}>{error}</p>}

      {!isLoading && !error && recipes.length === 0 && (
        <p style={statusMessageStyle}>
          Tidak ada resep yang ditemukan dengan kriteria ini. Coba ubah kata kunci atau filter Anda.
        </p>
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <div style={gridStyle}>
          {recipes.map(recipe => (
            
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};


const primaryColor = '#153568'; 
const secondaryColor = '#fcb936'; 

const pageContainerStyle = {
    maxWidth: '1200px',
    margin: '30px auto', 
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
};

const pageTitleStyle = {
  fontSize: '2.5rem', 
  fontWeight: 'bold',
  color: primaryColor,
  textAlign: 'center',
  marginBottom: '30px',
  paddingBottom: '15px', 
  borderBottom: `4px solid ${secondaryColor}`,
  display: 'inline-block', 
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
};

const backLinkStyle = {
  display: 'inline-block',
  marginBottom: '25px',
  color: primaryColor,
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  padding: '8px 15px',
  border: `2px solid ${primaryColor}`,
  borderRadius: '8px',
  transition: 'background-color 0.3s, color 0.3s',
};


const statusMessageStyle = {
    textAlign: 'center',
    fontSize: '1.3rem', 
    color: '#555',
    padding: '60px 20px', 
    backgroundColor: '#f9f9f9', 
    borderRadius: '10px',
    border: '1px dashed #ddd',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '30px', 
  marginTop: '20px',
};

export default SearchResultsPage;
