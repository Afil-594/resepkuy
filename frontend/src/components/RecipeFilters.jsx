
import React, { useState } from 'react';

const RecipeFilters = ({ onFilterApply }) => {
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onFilterApply({
      cuisine: cuisine.trim(),
      diet: diet, 
      maxCalories: maxCalories.trim() ? parseInt(maxCalories.trim()) : null,
      
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={filterGridStyle}>
        {/* Filter Asal Masakan (Cuisine) */}
        <div style={filterItemStyle}>
          <label htmlFor="cuisine" style={labelStyle}>Asal Masakan:</label>
          <input
            type="text"
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="cth: Italian, Chinese, Indonesian"
            style={inputStyle}
          />
        </div>

        {/* Filter Diet */}
        <div style={filterItemStyle}>
          <label htmlFor="diet" style={labelStyle}>Jenis Diet:</label>
          <select
            id="diet"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            style={inputStyle} 
          >
            <option value="">Semua Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleo">Paleo</option>
            {/* Tambahkan opsi diet lain sesuai kebutuhan dari Spoonacular */}
          </select>
        </div>

        {/* Filter Kalori Maksimum */}
        <div style={filterItemStyle}>
          <label htmlFor="maxCalories" style={labelStyle}>Kalori Maksimum:</label>
          <input
            type="number"
            id="maxCalories"
            value={maxCalories}
            onChange={(e) => setMaxCalories(e.target.value)}
            placeholder="cth: 500"
            min="0" 
            style={inputStyle}
          />
        </div>

        {/* Tambahkan input filter lain di sini jika perlu */}
        {/* Misal: Waktu Memasak Maksimum, Jumlah Bahan Maksimal, dll. */}
      </div>

      <button type="submit" style={buttonStyle}>
        Terapkan Filter
      </button>
    </form>
  );
};


const formStyle = {
  padding: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  marginTop: '20px',
};

const filterGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
  gap: '20px',
  marginBottom: '20px',
};

const filterItemStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '8px',
  fontSize: '0.9rem',
  color: '#333',
  fontWeight: '500',
  textAlign: 'left',
};

const inputStyle = {
  padding: '12px',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '12px 25px',
  fontSize: '1rem',
  color: 'white',
  backgroundColor: '#5cb85c', 
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  display: 'block', 
  margin: '0 auto', 
};

export default RecipeFilters;