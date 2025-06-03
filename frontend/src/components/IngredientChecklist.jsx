
    import React, { useState, useEffect } from 'react';

    const IngredientChecklist = ({ ingredients }) => {
      
      
      const [checkedItems, setCheckedItems] = useState({});

      
      useEffect(() => {
        const initialCheckedState = {};
        if (ingredients && ingredients.length > 0) {
          ingredients.forEach(ingredient => {
            
            const key = ingredient.id ? ingredient.id.toString() : ingredient.original;
            initialCheckedState[key] = false; 
          });
        }
        setCheckedItems(initialCheckedState);
      }, [ingredients]);

      const handleCheckboxChange = (ingredientKey) => {
        setCheckedItems(prevCheckedItems => ({
          ...prevCheckedItems,
          [ingredientKey]: !prevCheckedItems[ingredientKey] 
        }));
        
      };

      if (!ingredients || ingredients.length === 0) {
        return <p>Tidak ada informasi bahan yang tersedia untuk ditampilkan.</p>;
      }

      return (
        <ul style={listStyle}>
          {ingredients.map((ingredient, index) => {
            
            const ingredientKey = ingredient.id ? ingredient.id.toString() : ingredient.original;
            return (
              <li key={ingredientKey || index} style={listItemStyle}>
                <label style={labelStyle}>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[ingredientKey]} 
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
      width: '18px', 
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