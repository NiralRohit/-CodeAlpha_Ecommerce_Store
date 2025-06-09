const express = require('express');
const router = express.Router();
const { products } = require('../data/products');
let recentlyViewed = [];

// Get all products
router.get('/', (req, res) => {
  try {
    console.log('Products API called');
    console.log('Number of products:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error in products API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  // Add to recently viewed
  if (!recentlyViewed.some(p => p._id === product._id)) {
    recentlyViewed.unshift(product);
    // Keep only 5 most recent
    if (recentlyViewed.length > 5) {
      recentlyViewed.pop();
    }
  }
  
  res.json(product);
});

// Get recently viewed products
router.get('/recent/viewed', (req, res) => {
  res.json(recentlyViewed);
});

// Get related products
router.get('/:id/related', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4); // Get up to 4 related products
  
  res.json(relatedProducts);
});

module.exports = router; 