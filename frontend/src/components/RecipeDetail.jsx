    
    import React from 'react';
    import FavoriteButton from './FavoriteButton';
    import IngredientChecklist from './IngredientChecklist';
    import ShoppingList from './ShoppingList'; 

    const RecipeDetail = ({ recipe }) => {
      if (!recipe) {
        return <p style={loadingStyle}>Memuat detail resep...</p>;
      }

      const calories = recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount?.toFixed(0);

      return (
        <div style={detailContainerStyle}>
          <div style={headerStyle}>
            <h1 style={recipeTitleStyle}>{recipe.title}</h1>
            <FavoriteButton recipe={recipe} />
          </div>

          <img src={recipe.image || 'https://via.placeholder.com/600x400?text=No+Image'} alt={recipe.title} style={recipeImageStyle} />

          <div style={infoGridStyle}>
            <div style={infoBoxStyle}>
              <h3 style={sectionTitleStyle}>Informasi Umum</h3>
              {/* ... (konten Informasi Umum tetap sama) ... */}
              <p><strong>Waktu Memasak:</strong> {recipe.readyInMinutes} menit</p>
              <p><strong>Porsi:</strong> {recipe.servings} porsi</p>
              {calories && <p><strong>Kalori:</strong> {calories} kcal</p>}
              <p><strong>Sumber:</strong> <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>{recipe.sourceName || 'Lihat Sumber Asli'}</a></p>
              {recipe.diets && recipe.diets.length > 0 && (
                <p><strong>Diet:</strong> {recipe.diets.join(', ')}</p>
              )}
              {recipe.cuisines && recipe.cuisines.length > 0 && (
                <p><strong>Asal Masakan:</strong> {recipe.cuisines.join(', ')}</p>
              )}
            </div>

            <div style={infoBoxStyle}>
              <h3 style={sectionTitleStyle}>Daftar Belanja</h3>
              {}
              <ShoppingList ingredients={recipe.extendedIngredients || []} />
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Bahan-bahan</h2>
            <IngredientChecklist ingredients={recipe.extendedIngredients || []} />
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Langkah Memasak</h2>
            {/* ... (konten Langkah Memasak tetap sama) ... */}
            {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
              <ol style={instructionsListStyle}>
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number} style={stepStyle}>{step.step}</li>
                ))}
              </ol>
            ) : recipe.instructions ? (
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            ) : (
              <p>Instruksi tidak tersedia.</p>
            )}
          </div>
        </div>
      );
    };

    
    const loadingStyle = {  
        textAlign: 'center', 
        padding: '50px', 
        fontSize: '1.2em' 
    };
    const detailContainerStyle = { 
        padding: '20px', 
        maxWidth: '900px', 
        margin: '0 auto' 
    };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
    const recipeTitleStyle = { fontSize: '2.2rem', color: '#333', fontWeight: 'bold', flexGrow: 1, marginRight: '15px' };
    const recipeImageStyle = { width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' };
    const infoGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' };
    const infoBoxStyle = { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' };
    const sectionStyle = { marginBottom: '30px' };
    const sectionTitleStyle = { fontSize: '1.6rem', color: '#444', marginBottom: '15px', borderBottom: '2px solid #007bff', paddingBottom: '5px', display: 'inline-block' };
    const instructionsListStyle = { listStyleType: 'decimal', paddingLeft: '20px', lineHeight: '1.8' };
    const stepStyle = { marginBottom: '10px' };
    const sourceLinkStyle = { color: '#007bff', textDecoration: 'none' };
    

    export default RecipeDetail;
    