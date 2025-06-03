// frontend/src/components/FavoriteButton.jsx
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Menggunakan ikon dari react-icons

// Fungsi helper untuk mengambil favorit dari localStorage
const getFavoritesFromStorage = () => {
  const favorites = localStorage.getItem('favoriteRecipes');
  return favorites ? JSON.parse(favorites) : []; // Mengembalikan array kosong jika tidak ada
};

// Fungsi helper untuk menyimpan favorit ke localStorage
const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};

const FavoriteButton = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Cek apakah resep ini sudah jadi favorit saat komponen dimuat atau recipe.id berubah
  useEffect(() => {
    if (recipe && recipe.id) { // Pastikan recipe dan recipe.id ada
      const currentFavorites = getFavoritesFromStorage();
      // Cek apakah ada resep di currentFavorites yang id-nya sama dengan recipe.id
      setIsFavorite(currentFavorites.some(favRecipe => favRecipe.id === recipe.id));
    }
  }, [recipe]); // Bergantung pada prop recipe

  const toggleFavorite = () => {
    if (!recipe || !recipe.id) { // Pengaman jika recipe atau recipe.id tidak ada
      console.error("Tidak bisa menambahkan/menghapus favorit: data resep tidak lengkap.");
      return;
    }

    let currentFavorites = getFavoritesFromStorage();
    let updatedFavorites;

    if (isFavorite) {
      // Hapus dari favorit: filter keluar resep dengan id yang sama
      updatedFavorites = currentFavorites.filter(favRecipe => favRecipe.id !== recipe.id);
    } else {
      // Tambah ke favorit: tambahkan objek resep saat ini
      // Pastikan tidak ada duplikat sebelum menambahkan (meskipun UI seharusnya mencegah ini)
      if (!currentFavorites.some(favRecipe => favRecipe.id === recipe.id)) {
        updatedFavorites = [...currentFavorites, recipe]; // Simpan seluruh objek resep
      } else {
        updatedFavorites = currentFavorites; // Seharusnya tidak terjadi jika logika isFavorite benar
      }
    }

    saveFavoritesToStorage(updatedFavorites);
    setIsFavorite(!isFavorite); // Update state untuk mengubah ikon
  };

  // Jangan render tombol jika data resep tidak ada
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

// Styling untuk tombol
const buttonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.8rem', // Ukuran ikon
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default FavoriteButton;