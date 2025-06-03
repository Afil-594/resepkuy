// frontend/src/components/ShoppingList.jsx
    import React from 'react';
    import { FaCopy } from 'react-icons/fa'; // Ikon untuk tombol salin

    const ShoppingList = ({ ingredients }) => {
      if (!ingredients || ingredients.length === 0) {
        return <p>Tidak ada bahan untuk ditampilkan dalam daftar belanja.</p>;
      }

      const handleCopyToClipboard = () => {
        // Format teks daftar belanja: setiap bahan di baris baru dengan tanda strip
        const shoppingListText = ingredients.map(ing => `- ${ing.original}`).join('\n');

        // Gunakan navigator.clipboard API untuk menyalin ke clipboard
        navigator.clipboard.writeText(shoppingListText)
          .then(() => {
            alert('Daftar belanja berhasil disalin ke clipboard!');
          })
          .catch(err => {
            console.error('Gagal menyalin daftar belanja: ', err);
            alert('Gagal menyalin daftar belanja. Coba lagi atau salin manual.');
          });
      };

      return (
        <div style={containerStyle}>
          <ul style={listStyle}>
            {ingredients.map((ingredient, index) => (
              <li key={ingredient.id || index} style={listItemStyle}>
                {ingredient.original} {/* Menampilkan deskripsi bahan asli */}
              </li>
            ))}
          </ul>
          {ingredients.length > 0 && ( // Hanya tampilkan tombol jika ada bahan
            <button onClick={handleCopyToClipboard} style={buttonStyle} title="Salin Daftar Belanja">
              <FaCopy style={{ marginRight: '8px' }} />
              Salin Daftar Belanja
            </button>
          )}
        </div>
      );
    };

    // Styling
    const containerStyle = {
      padding: '15px',
      backgroundColor: '#f8f9fa', // Warna latar sedikit beda
      borderRadius: '6px',
      border: '1px solid #dee2e6',
    };

    const listStyle = {
      listStyleType: 'none', // Atau 'disc' jika ingin ada bullet point
      paddingLeft: 0, // Hapus padding default jika list-style-type none
      marginBottom: '15px',
    };

    const listItemStyle = {
      padding: '6px 0',
      borderBottom: '1px dashed #e0e0e0', // Garis putus-putus antar item
      fontSize: '0.95rem',
      color: '#495057',
    };
    // Hapus border-bottom untuk item terakhir
    // Ini bisa dilakukan dengan :last-child di CSS, atau sedikit logika di render jika perlu

    const buttonStyle = {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', // Tombol mengisi lebar kontainer
      transition: 'background-color 0.2s ease',
    };
    // buttonStyle:hover { backgroundColor: '#0056b3'; } // Efek hover via CSS

    export default ShoppingList;
    