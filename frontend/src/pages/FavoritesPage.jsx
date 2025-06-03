// frontend/src/pages/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { FaTrashAlt } from 'react-icons/fa';

const getFavoritesFromStorage = () => {
  const favorites = localStorage.getItem('favoriteRecipes');
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(getFavoritesFromStorage());
  }, []);

  const handleRemoveFavorite = (recipeIdToRemove) => {
    const updatedFavorites = favoriteRecipes.filter(recipe => recipe.id !== recipeIdToRemove);
    saveFavoritesToStorage(updatedFavorites);
    setFavoriteRecipes(updatedFavorites);
  };

  return (
    <div style={pageContainerStyle}>
      <h1 style={pageTitleStyle}>Resep Favorit Anda</h1>
      
      {favoriteRecipes.length === 0 ? (
        <div style={emptyContainerStyle}>
          <p style={emptyMessageStyle}>
            Anda belum memiliki resep favorit. <br />
            Resep yang Anda sukai akan muncul di sini!
          </p>
          <Link to="/" style={browseLinkStyle}>Telusuri Resep Sekarang</Link>
        </div>
      ) : (
        <div style={gridStyle}>
          {favoriteRecipes.map(recipe => (
            <div key={recipe.id} style={cardWrapperStyle}>
              <RecipeCard recipe={recipe} />
              <button
                onClick={() => handleRemoveFavorite(recipe.id)}
                title="Hapus dari Favorit"
                style={removeButtonStyle}
              >
                <FaTrashAlt style={{ marginRight: '5px' }} /> Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styling dengan skema warna baru
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
  marginBottom: '40px', // Jarak lebih banyak
  paddingBottom: '15px',
  borderBottom: `4px solid ${secondaryColor}`,
  display: 'inline-block',
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
};

const emptyContainerStyle = {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    border: `2px dashed ${secondaryColor}`,
};

const emptyMessageStyle = {
  fontSize: '1.3rem',
  color: '#555',
  lineHeight: '1.7',
  marginBottom: '25px',
};

const browseLinkStyle = {
    display: 'inline-block', // Agar bisa di-margin auto dan padding bekerja
    padding: '12px 25px',
    backgroundColor: primaryColor,
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};
// browseLinkStyle:hover { backgroundColor: '#0f2a50', transform: 'translateY(-2px)' }

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '30px',
};

const cardWrapperStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff', // Latar kartu
    borderRadius: '12px', // Samakan dengan RecipeCard jika perlu
    boxShadow: '0 6px 18px rgba(0,0,0,0.09)', // Samakan dengan RecipeCard
    overflow: 'hidden', // Penting jika RecipeCard tidak punya overflow sendiri
};

const removeButtonStyle = {
    position: 'absolute',
    top: '12px', // Sesuaikan posisi
    right: '12px',
    background: `rgba(21, 53, 104, 0.8)`, // Warna primer dengan transparansi
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    zIndex: 10,
    transition: 'background-color 0.2s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};
// removeButtonStyle:hover { background: `rgba(21, 53, 104, 1)` }

export default FavoritesPage;
