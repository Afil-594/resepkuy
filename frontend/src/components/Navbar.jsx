
import React from 'react';
import { Link } from 'react-router-dom'; 
import logoResepKuy from '../assets/images/LogoResepKuy.png'; 

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={brandStyle}>
          {}
          <img src={logoResepKuy} alt="ResepKuy Logo" style={logoImageStyle} />
        {}
        </Link>
        <div style={linksContainerStyle}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/favorites" style={linkStyle}>
            Favorit
          </Link>
          {}
        </div>
      </div>
    </nav>
  );
};


const navStyle = {
  backgroundColor: '#FFFFFF',
  padding: '0.8rem 2rem',
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
  display: 'flex', 
  alignItems: 'center', 
};


const logoImageStyle = {
 
  height: '80px', 
  marginRight: '10px',
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
