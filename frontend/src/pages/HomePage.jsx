
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeFilters from '../components/RecipeFilters';
import { searchRecipesAPI } from '../services/api'; 




const getFeaturedRecipesAPI = async () => {
  
  
  
  
  try {
    
    
    const response = await searchRecipesAPI({ query: 'popular pasta', number: 3 }); 
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(recipe => ({ 
        id: recipe.id,
        title: recipe.title,
        image: recipe.image, 
      }));
    }
    return []; 
  } catch (error) {
    console.error("Error fetching featured recipes:", error);
    return []; 
  }
};


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState('');
  const navigate = useNavigate();

  
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState('');

  
  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      setIsLoadingFeatured(true);
      setErrorFeatured('');
      try {
        const data = await getFeaturedRecipesAPI(); 
        setFeaturedRecipes(data);
      } catch (error) {
        setErrorFeatured('Gagal memuat resep unggulan.');
        console.error(error);
      } finally {
        setIsLoadingFeatured(false);
      }
    };
    loadFeaturedRecipes();
  }, []); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleIngredientSearchSubmit = (e) => {
    e.preventDefault();
    if (ingredients.trim()) {
      navigate(`/search?ingredients=${encodeURIComponent(ingredients.trim())}`);
    }
  };

  const handleFilterApply = (filters) => {
    const queryParams = new URLSearchParams();
    if (searchTerm.trim()) {
        queryParams.append('query', searchTerm.trim());
    }
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    if (Array.from(queryParams).length > 0) {
        navigate(`/search?${queryParams.toString()}`);
    } else {
        console.warn("Silakan isi kriteria pencarian atau filter.");
    }
  };

  return (
    <div style={pageStyle}>
      <header style={heroStyle}>
        <h1 style={heroTitleStyle}>Selamat Datang di ResepKuy!</h1>
        <p style={heroSubtitleStyle}>Temukan Ribuan Inspirasi Resep Lezat Setiap Hari.</p>
      </header>

      <div style={mainContentStyle}>
        <section style={searchSectionStyle}>
          {/* ... form pencarian tetap sama ... */}
          <form onSubmit={handleSearchSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Mau masak apa hari ini? (mis: ayam kecap)"
                style={inputStyle}
              />
            </div>
            <button type="submit" style={searchButtonStylePrimary}>
              Cari Resep
            </button>
          </form>

          <form onSubmit={handleIngredientSearchSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Bahan di kulkas apa aja? (cth: telur, bawang, tomat)"
                style={inputStyle}
              />
            </div>
            <button type="submit" style={searchButtonStyleSecondary}>
              Cari dari Bahan
            </button>
          </form>
        </section>

        <section style={filterSectionStyle}>
          <h2 style={sectionTitleStyle}>Pencarian Lebih Detail</h2>
          <RecipeFilters onFilterApply={handleFilterApply} />
        </section>

        {/* Bagian Resep Unggulan dengan data dari API */}
        <section style={featuredSectionStyle}>
            <h2 style={sectionTitleStyle}>Resep Unggulan Pilihan</h2>
            {isLoadingFeatured && <p style={{textAlign: 'center'}}>Memuat resep unggulan...</p>}
            {errorFeatured && <p style={{textAlign: 'center', color: 'red'}}>{errorFeatured}</p>}
            {!isLoadingFeatured && !errorFeatured && featuredRecipes.length === 0 && (
                <p style={{textAlign: 'center'}}>Tidak ada resep unggulan saat ini.</p>
            )}
            {!isLoadingFeatured && !errorFeatured && featuredRecipes.length > 0 && (
                <div style={featuredGridStyle}>
                    {featuredRecipes.map(recipe => (
                        <div key={recipe.id} style={featuredCardStyle} onClick={() => navigate(`/recipe/${recipe.id}`)}>
                            {/* Gunakan recipe.image dari API */}
                            <img 
                                src={recipe.image || 'https://placehold.co/400x300/cccccc/333333?text=Gambar+Tidak+Tersedia'} 
                                alt={recipe.title} 
                                style={featuredImageStyle} 
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/cccccc/333333?text=Gagal+Muat'; }} 
                            />
                            <h3 style={featuredTitleStyle}>{recipe.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </section>
      </div>
    </div>
  );
};


const primaryColor = '#153568';
const secondaryColor = '#fcb936';
const pageStyle = { /* ... */ };
const heroStyle = { backgroundColor: primaryColor, color: 'white', padding: '60px 20px', textAlign: 'center', marginBottom: '40px', borderRadius: '0 0 25px 25px', boxShadow: '0 5px 20px rgba(0,0,0,0.25)', };
const heroTitleStyle = { fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '20px', textShadow: '1px 1px 3px rgba(0,0,0,0.4)', };
const heroSubtitleStyle = { fontSize: '1.4rem', opacity: 0.95, maxWidth: '700px', margin: '0 auto', };
const mainContentStyle = { maxWidth: '1100px', margin: '0 auto', padding: '0 20px', };
const searchSectionStyle = { backgroundColor: '#ffffff', padding: '35px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.12)', marginBottom: '50px', };
const formStyle = { marginBottom: '30px', };
const inputGroupStyle = { position: 'relative', marginBottom: '18px', };
const inputStyle = { width: '100%', padding: '20px 22px', fontSize: '1.15rem', border: `2px solid ${primaryColor}`, borderRadius: '10px', boxSizing: 'border-box', transition: 'border-color 0.3s ease, box-shadow 0.3s ease', };
const baseButtonStyle = { width: '100%', padding: '20px 30px', fontSize: '1.2rem', fontWeight: 'bold', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', boxShadow: '0 5px 12px rgba(0,0,0,0.18)', textTransform: 'uppercase', letterSpacing: '1px', };
const searchButtonStylePrimary = { ...baseButtonStyle, backgroundColor: primaryColor, };
const searchButtonStyleSecondary = { ...baseButtonStyle, backgroundColor: secondaryColor, color: primaryColor, };
const filterSectionStyle = { marginBottom: '50px', };
const sectionTitleStyle = { fontSize: '2.2rem', fontWeight: 'bold', color: primaryColor, textAlign: 'center', marginBottom: '35px', paddingBottom: '12px', borderBottom: `4px solid ${secondaryColor}`, display: 'inline-block', position: 'relative', left: '50%', transform: 'translateX(-50%)', };
const featuredSectionStyle = { marginTop: '60px', paddingBottom: '40px', };
const featuredGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', };
const featuredCardStyle = { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.09)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column', };
const featuredImageStyle = { width: '100%', height: '220px', objectFit: 'cover', backgroundColor: '#e9ecef', };
const featuredTitleStyle = { fontSize: '1.3rem', fontWeight: '600', color: '#333', padding: '18px', textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', };

export default HomePage;
