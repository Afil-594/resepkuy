
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 


const getFavoritesFromStorage = () => {
  const favorites = localStorage.getItem('favoriteRecipes');
  return favorites ? JSON.parse(favorites) : []; 
};


const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};

const FavoriteButton = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  
  useEffect(() => {
    if (recipe && recipe.id) { 
      const currentFavorites = getFavoritesFromStorage();
      
      setIsFavorite(currentFavorites.some(favRecipe => favRecipe.id === recipe.id));
    }
  }, [recipe]); 

  const toggleFavorite = () => {
    if (!recipe || !recipe.id) { 
      console.error("Tidak bisa menambahkan/menghapus favorit: data resep tidak lengkap.");
      return;
    }

    let currentFavorites = getFavoritesFromStorage();
    let updatedFavorites;

    if (isFavorite) {
      
      updatedFavorites = currentFavorites.filter(favRecipe => favRecipe.id !== recipe.id);
    } else {
      
      
      if (!currentFavorites.some(favRecipe => favRecipe.id === recipe.id)) {
        updatedFavorites = [...currentFavorites, recipe]; 
      } else {
        updatedFavorites = currentFavorites; 
      }
    }

    saveFavoritesToStorage(updatedFavorites);
    setIsFavorite(!isFavorite); 
  };

  
  if (!recipe || !recipe.id) {
    return null;
  }

  return (
    <button
      onClick={toggleFavorite}
      title={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
      style={buttonStyle}
    >
      {isFavorite ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart style={{ color: '#555' }}/>}
    </button>
  );
};


const buttonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.8rem', 
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default FavoriteButton;