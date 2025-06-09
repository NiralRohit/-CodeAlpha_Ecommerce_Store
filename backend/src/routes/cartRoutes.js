const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

// In-memory cart
let cart = {
  cartItems: [],
  totalPrice: 0,
  totalItems: 0
};

// Get cart
router.get('/', (req, res) => {
  res.json(cart);
});

// Add to cart
router.post('/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p._id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const itemIndex = cart.cartItems.findIndex(item => item.product === productId);
  
  if (itemIndex > -1) {
    // Product exists in cart, update quantity
    cart.cartItems[itemIndex].quantity += parseInt(quantity);
  } else {
    // Product not in cart, add new item
    cart.cartItems.push({
      product: productId,
      name: product.name,
      quantity: parseInt(quantity),
      price: product.price,
      image: product.imageUrl || product.image,
      brand: product.brand
    });
  }
  
  // Calculate total price and items
  cart.totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  cart.totalItems = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  
  res.json(cart);
});

// Update cart item
router.put('/update/:productId', (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId;
  
  const itemIndex = cart.cartItems.findIndex(item => item.product === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
  
  cart.cartItems[itemIndex].quantity = parseInt(quantity);
  
  // Recalculate total price and items
  cart.totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  cart.totalItems = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  
  res.json(cart);
});

// Remove from cart
router.delete('/remove/:productId', (req, res) => {
  const productId = req.params.productId;
  
  cart.cartItems = cart.cartItems.filter(item => item.product !== productId);
  
  // Recalculate total price and items
  cart.totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  cart.totalItems = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  
  res.json(cart);
});

// Clear cart
router.delete('/clear', (req, res) => {
  cart.cartItems = [];
  cart.totalPrice = 0;
  cart.totalItems = 0;
  
  res.json({ message: 'Cart cleared', cart });
});

// Add to cart with options
router.post('/add-with-options', (req, res) => {
  const { productId, quantity, saveForLater = false } = req.body;
  
  if (saveForLater) {
    // Add to wishlist instead of cart
    const product = products.find(p => p._id === productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (!wishlist.some(item => item._id === productId)) {
      wishlist.push(product);
    }
    
    return res.json({ cart, wishlist });
  } else {
    // Normal add to cart
    const product = products.find(p => p._id === productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const itemIndex = cart.cartItems.findIndex(item => item.product === productId);
    
    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.cartItems[itemIndex].quantity += parseInt(quantity);
    } else {
      // Product not in cart, add new item
      cart.cartItems.push({
        product: productId,
        name: product.name,
        quantity: parseInt(quantity),
        price: product.price,
        image: product.imageUrl || product.image,
        brand: product.brand
      });
    }
    
    // Calculate total price and items
    cart.totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    
    cart.totalItems = cart.cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    
    return res.json(cart);
  }
});

module.exports = router; 