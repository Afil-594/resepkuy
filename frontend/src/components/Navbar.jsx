// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Untuk membuat link navigasi
import logoResepKuy from '../assets/images/LogoResepKuy.png'; // <-- 1. IMPORT LOGO DI SINI (sesuaikan path jika perlu)

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={brandStyle}>
          {/* 2. TAMBAHKAN TAG IMG UNTUK LOGO */}
          <img src={logoResepKuy} alt="ResepKuy Logo" style={logoImageStyle} />
        {/* Teks ini bisa Anda hapus jika logo sudah mencakup nama */}
        </Link>
        <div style={linksContainerStyle}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/favorites" style={linkStyle}>
            Favorit
          </Link>
          {/* Anda bisa tambahkan link lain di sini nanti */}
        </div>
      </div>
    </nav>
  );
};

// Contoh styling dasar (inline styles)
const navStyle = {
  backgroundColor: '#FFFFFF',
  padding: '0.8rem 2rem', // Sedikit kurangi padding vertikal jika logo membuat navbar terlalu tinggi
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const brandStyle = {
  fontSize: '1.75rem',
  fontWeight: 'bold',
  color: '#333',
  textDecoration: 'none',
  display: 'flex', // <-- 3. Tambahkan display flex untuk alignment logo dan teks
  alignItems: 'center', // <-- Pusatkan item secara vertikal
};

// 4. TAMBAHKAN STYLE UNTUK LOGO IMAGE
const logoImageStyle = {
 
  height: '80px', // Sesuaikan tinggi logo Anda
  marginRight: '10px', // Jarak antara logo dan teks "ResepKuy!"
};

const linksContainerStyle = {
  display: 'flex',
  gap: '1.5rem',
};

const linkStyle = {
  color: '#555',
  textDecoration: 'none',
  fontSize: '1rem',
  padding: '0.5rem 0',
  transition: 'color 0.3s ease',
};

export default Navbar;
