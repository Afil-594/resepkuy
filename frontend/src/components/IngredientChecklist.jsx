// frontend/src/components/IngredientChecklist.jsx
    import React, { useState, useEffect } from 'react';

    const IngredientChecklist = ({ ingredients }) => {
      // State untuk menyimpan status checked dari setiap bahan
      // Key-nya adalah ID bahan atau original string, value-nya boolean (true/false)
      const [checkedItems, setCheckedItems] = useState({});

      // Inisialisasi checkedItems saat props ingredients berubah
      useEffect(() => {
        const initialCheckedState = {};
        if (ingredients && ingredients.length > 0) {
          ingredients.forEach(ingredient => {
            // Gunakan ingredient.id jika ada, jika tidak gunakan ingredient.original sebagai fallback key unik
            const key = ingredient.id ? ingredient.id.toString() : ingredient.original;
            initialCheckedState[key] = false; // Default semua belum tercentang
          });
        }
        setCheckedItems(initialCheckedState);
        // Untuk pengembangan: Anda bisa menambahkan logika untuk memuat status dari localStorage
        // jika ingin checklist ini persisten antar sesi untuk resep yang sama.
      }, [ingredients]);

      const handleCheckboxChange = (ingredientKey) => {
        setCheckedItems(prevCheckedItems => ({
          ...prevCheckedItems,
          [ingredientKey]: !prevCheckedItems[ingredientKey] // Toggle status checked
        }));
        // Untuk pengembangan: Simpan perubahan ke localStorage di sini jika menggunakan persistensi.
      };

      if (!ingredients || ingredients.length === 0) {
        return <p>Tidak ada informasi bahan yang tersedia untuk ditampilkan.</p>;
      }

      return (
        <ul style={listStyle}>
          {ingredients.map((ingredient, index) => {
            // Tentukan key unik untuk setiap item checkbox
            const ingredientKey = ingredient.id ? ingredient.id.toString() : ingredient.original;
            return (
              <li key={ingredientKey || index} style={listItemStyle}>
                <label style={labelStyle}>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[ingredientKey]} // Pastikan value adalah boolean
                    onChange={() => handleCheckboxChange(ingredientKey)}
                    style={checkboxStyle}
                  />
                  <span style={checkedItems[ingredientKey] ? checkedTextStyle : textStyle}>
                    {ingredient.original} {/* Menampilkan deskripsi bahan asli */}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      );
    };

    // Styling
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
    };

    const listItemStyle = {
      marginBottom: '10px',
      padding: '8px',
      backgroundColor: '#f9f9f9',
      borderRadius: '4px',
      border: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
    };

    const labelStyle = {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    };

    const checkboxStyle = {
      marginRight: '12px',
      width: '18px', // Ukuran checkbox
      height: '18px',
      cursor: 'pointer',
    };

    const textStyle = {
      fontSize: '1rem',
      color: '#333',
    };

    const checkedTextStyle = {
      ...textStyle,
      textDecoration: 'line-through',
      color: '#888',
    };

    export default IngredientChecklist;