
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import RecipePage from './pages/RecipePage';
import FavoritesPage from './pages/FavoritesPage'; 
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-8"> {/* Sesuaikan padding jika perlu */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          {/* Pastikan rute /favorites menggunakan komponen FavoritesPage */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
