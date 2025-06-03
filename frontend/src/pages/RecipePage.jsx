
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeDetailsAPI } from '../services/api';
import RecipeDetail from '../components/RecipeDetail'; 
import ReviewSection from '../components/ReviewSection'; 

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;
      setIsLoading(true);
      setError('');
      try {
        const response = await getRecipeDetailsAPI(id);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe details:", err.response ? err.response.data : err.message);
        setError('Gagal memuat detail resep. Resep mungkin tidak ditemukan atau ada masalah jaringan.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  return (
    <div style={pageContainerStyle}>
      <Link to="/search" style={backLinkStyle}>&larr; Kembali ke Hasil Pencarian</Link> {/* Atau ke halaman sebelumnya */}
      
      {isLoading && <p style={statusMessageStyle}>Sedang memuat resep pilihan Anda...</p>}
      {error && <p style={{ ...statusMessageStyle, color: '#d9534f', borderColor: '#d9534f' }}>{error}</p>}
      
      {!isLoading && !error && recipe && (
        <>
          {/* Komponen RecipeDetail akan menangani tampilan detail, kita akan style itu secara terpisah jika perlu */}
          <RecipeDetail recipe={recipe} />
          {/* Komponen ReviewSection juga akan di-style terpisah */}
          <ReviewSection recipeId={id} />
        </>
      )}
      {!isLoading && !error && !recipe && (
        <p style={statusMessageStyle}>Resep tidak ditemukan. Mungkin ID resep tidak valid.</p>
      )}
    </div>
  );
};


const primaryColor = '#153568';


const pageContainerStyle = {
    maxWidth: '1000px', 
    margin: '30px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff', 
    borderRadius: '12px', 
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)', 
};

const backLinkStyle = {
  display: 'inline-block',
  marginBottom: '25px',
  color: primaryColor,
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  padding: '10px 18px',
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
    marginTop: '20px',
};

export default RecipePage;
