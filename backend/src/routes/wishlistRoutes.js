const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

// In-memory wishlist
let wishlist = [];

// Get wishlist
router.get('/', (req, res) => {
  res.json(wishlist);
});

// Add to wishlist
router.post('/add', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p._id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  if (!wishlist.some(item => item._id === productId)) {
    wishlist.push(product);
  }
  
  res.json(wishlist);
});

// Remove from wishlist
router.delete('/remove/:productId', (req, res) => {
  const productId = req.params.productId;
  wishlist = wishlist.filter(item => item._id !== productId);
  res.json(wishlist);
});

module.exports = router; 