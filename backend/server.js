
const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const connectDB = require('./config/db'); 


const recipeRoutes = require('./routes/recipes');
const reviewRoutes = require('./routes/reviews');

const app = express(); 


connectDB();


app.use(cors()); 
app.use(express.json()); 



app.get('/', (req, res) => {
  res.send('Selamat Datang di API Aplikasi Resep Makanan!');
});



app.use('/api/recipes', recipeRoutes);

app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
  
});