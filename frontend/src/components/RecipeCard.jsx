
import React from 'react';
import { Link } from 'react-router-dom'; 

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return null; 
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


const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  overflow: 'hidden', 
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  height: '100%', 
};




const linkNoStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, 
}

const imageStyle = {
  width: '100%',
  height: '200px', 
  objectFit: 'cover', 
};

const contentStyle = {
  padding: '15px',
  flexGrow: 1, 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', 
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#333',
  marginBottom: '10px',
  
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2, 
  WebkitBoxOrient: 'vertical',
  minHeight: '2.4em', 
};

const sourceStyle = {
    fontSize: '0.8rem',
    color: '#777',
    marginTop: 'auto', 
};

export default RecipeCard;