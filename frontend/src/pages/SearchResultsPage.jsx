// frontend/src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchRecipesAPI, findRecipesByIngredientsAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard'; // Kita asumsikan RecipeCard sudah punya style yang bagus atau kita sesuaikan di sini

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

      // Menentukan teks pencarian untuk ditampilkan
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
          // Tambahkan filter lain jika ada untuk pencarian bahan
          if (cuisine) apiParams.cuisine = cuisine; // Spoonacular findByIngredients tidak support banyak filter
          if (diet) apiParams.diet = diet;
          if (maxCalories) apiParams.maxCalories = maxCalories;
          response = await findRecipesByIngredientsAPI(apiParams.ingredients); // Sesuaikan jika findRecipesByIngredientsAPI menerima objek params
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
            // Menggunakan style dari RecipeCard.jsx, pastikan itu juga konsisten atau override di sini jika perlu
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

// Styling dengan skema warna baru
const primaryColor = '#153568'; // Biru tua
const secondaryColor = '#fcb936'; // Kuning/Oranye

const pageContainerStyle = {
    maxWidth: '1200px',
    margin: '30px auto', // Beri jarak dari navbar
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Contoh font modern
};

const pageTitleStyle = {
  fontSize: '2.5rem', // Ukuran judul
  fontWeight: 'bold',
  color: primaryColor,
  textAlign: 'center',
  marginBottom: '30px',
  paddingBottom: '15px', // Padding bawah untuk garis
  borderBottom: `4px solid ${secondaryColor}`,
  display: 'inline-block', // Agar border-bottom tidak full width
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
// backLinkStyle:hover { backgroundColor: primaryColor, color: 'white' } // Efek via CSS

const statusMessageStyle = {
    textAlign: 'center',
    fontSize: '1.3rem', // Sedikit lebih besar
    color: '#555',
    padding: '60px 20px', // Padding lebih banyak
    backgroundColor: '#f9f9f9', // Latar belakang lembut untuk pesan
    borderRadius: '10px',
    border: '1px dashed #ddd',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '30px', // Jarak antar kartu
  marginTop: '20px',
};

export default SearchResultsPage;
