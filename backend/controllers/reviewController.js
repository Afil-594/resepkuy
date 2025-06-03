
const Review = require('../models/Review'); 


exports.getReviewsByRecipeId = async (req, res) => {
  try {
    
    
    const reviews = await Review.find({ recipeId: req.params.recipeId }).sort({ timestamp: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ message: 'Gagal mengambil data review dari server.', error: error.message });
  }
};


exports.addReview = async (req, res) => {
  const { recipeId } = req.params; 
  const { username, rating, comment } = req.body; 

  
  if (!username || !rating || !comment) {
    return res.status(400).json({ message: 'Nama pengguna, rating, dan komentar tidak boleh kosong.' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating harus antara 1 dan 5.' });
  }

  try {
    
    const newReview = new Review({
      recipeId,
      username,
      rating,
      comment
    });

    
    const savedReview = await newReview.save();
    res.status(201).json(savedReview); 
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ message: 'Gagal menambahkan review ke server.', error: error.message });
  }
};