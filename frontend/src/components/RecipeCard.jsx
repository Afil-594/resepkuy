// frontend/src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Untuk navigasi ke detail resep

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return null; // Atau tampilkan placeholder jika resep tidak ada
  }

  return (
    <div style={cardStyle}>
      <Link to={`/recipe/${recipe.id}`} style={linkNoStyle}>
        <img src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={recipe.title} style={imageStyle} />
        <div style={contentStyle}>
          <h3 style={titleStyle} title={recipe.title}>
            {recipe.title}
          </h3>
          {/* Anda bisa menambahkan info lain di sini jika tersedia di data pencarian */}
          {/* Misalnya: recipe.readyInMinutes, recipe.servings, dll. */}
          <p style={sourceStyle}>
            Sumber: {recipe.sourceName || (recipe.creditsText && `Spoonacular (${recipe.creditsText})`) || 'Tidak diketahui'}
          </p>
        </div>
      </Link>
    </div>
  );
};

// Contoh styling dasar untuk RecipeCard
const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  overflow: 'hidden', // Agar gambar tidak keluar dari border-radius
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Memastikan semua kartu punya tinggi yang sama jika dalam grid
};

// Efek hover bisa ditambahkan di CSS:
// .recipe-card:hover { transform: translateY(-5px); boxShadow: '0 6px 12px rgba(0,0,0,0.15)'; }

const linkNoStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, // Agar link mengisi seluruh kartu
}

const imageStyle = {
  width: '100%',
  height: '200px', // Tinggi gambar tetap
  objectFit: 'cover', // Memastikan gambar terpotong dengan baik, bukan penyok
};

const contentStyle = {
  padding: '15px',
  flexGrow: 1, // Agar konten mengisi sisa ruang
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Mendorong source ke bawah jika ada ruang
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#333',
  marginBottom: '10px',
  // Mencegah judul terlalu panjang (ellipsis)
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2, // Batasi hingga 2 baris
  WebkitBoxOrient: 'vertical',
  minHeight: '2.4em', // Pastikan ruang untuk 2 baris
};

const sourceStyle = {
    fontSize: '0.8rem',
    color: '#777',
    marginTop: 'auto', // Mendorong ke bagian bawah kartu
};

export default RecipeCard;