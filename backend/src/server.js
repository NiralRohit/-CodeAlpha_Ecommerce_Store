const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files with proper MIME types
app.use(express.static(path.join(__dirname, 'web'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}));

// Products data (in-memory storage)
const products = [
  {"_id":"1","name":"Wireless Headphones","brand":"Sony","category":"Electronics","image":"/img/items/wireless-headphones.svg","imageUrl":"https://m.media-amazon.com/images/I/71BKQhFzDmL._SL1500_.jpg","price":15000,"countInStock":10,"rating":4.5,"reviews":12,"description":"Premium wireless headphones with noise cancellation","features":["30-hour battery life","Active noise cancellation","Bluetooth 5.0","Voice assistant support"]},
  {"_id":"2","name":"Smartphone","brand":"Samsung","category":"Electronics","image":"/img/items/smartphone.svg","imageUrl":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg","price":65000,"countInStock":7,"rating":4.2,"reviews":8,"description":"Latest smartphone with high-resolution camera and fast processor","features":["6.7-inch Super AMOLED display","108MP camera","5G connectivity","5000mAh battery"]},
  {"_id":"3","name":"Laptop","brand":"Dell","category":"Electronics","image":"/img/items/laptop.svg","imageUrl":"https://m.media-amazon.com/images/I/61LNGJEMh0L._SX679_.jpg","price":78000,"countInStock":5,"rating":4,"reviews":15,"description":"Powerful laptop for work and entertainment","features":["Intel Core i7 processor","16GB RAM","512GB SSD","15.6-inch Full HD display"]},
  {"_id":"4","name":"Running Shoes","brand":"Nike","category":"Fashion","image":"/img/items/running-shoes.svg","imageUrl":"https://m.media-amazon.com/images/I/81xXDjGnn4L._UY675_.jpg","price":5500,"countInStock":20,"rating":4.7,"reviews":10,"description":"Comfortable running shoes with excellent support","features":["Breathable mesh upper","Responsive cushioning","Durable rubber outsole","Lightweight design"]},
  {"_id":"5","name":"Coffee Maker","brand":"Philips","category":"Home","image":"/img/items/coffee-maker.svg","imageUrl":"https://m.media-amazon.com/images/I/61Hy6f-+XDL._SX679_.jpg","price":8000,"countInStock":8,"rating":3.8,"reviews":7,"description":"Automatic coffee maker for perfectly brewed coffee every time","features":["12-cup capacity","Programmable timer","Auto shut-off","Anti-drip system"]},
  {"_id":"6","name":"Smart Watch","brand":"Apple","category":"Electronics","image":"/img/items/smart-watch.svg","imageUrl":"https://m.media-amazon.com/images/I/61UtY2UWYPL._SX679_.jpg","price":35000,"countInStock":12,"rating":4.8,"reviews":20,"description":"Advanced smartwatch with health monitoring features","features":["Always-on Retina display","Heart rate monitor","GPS tracking","Water resistant"]},
  {"_id":"7","name":"Bluetooth Speaker","brand":"JBL","category":"Electronics","image":"/img/items/bluetooth-speaker.svg","imageUrl":"https://m.media-amazon.com/images/I/71J3RRdCsmL._SX679_.jpg","price":9500,"countInStock":15,"rating":4.3,"reviews":9,"description":"Portable Bluetooth speaker with immersive sound","features":["12-hour battery life","Waterproof design","Built-in microphone","Wireless Bluetooth streaming"]},
  {"_id":"8","name":"Digital Camera","brand":"Canon","category":"Electronics","image":"/img/items/digital-camera.svg","imageUrl":"https://m.media-amazon.com/images/I/81x-QZ+KBYL._SX679_.jpg","price":48000,"countInStock":4,"rating":4.6,"reviews":11,"description":"Professional digital camera for stunning photography","features":["24.1MP CMOS sensor","4K video recording","3-inch LCD touchscreen","Built-in Wi-Fi and Bluetooth"]},
  {"_id":"9","name":"Gaming Console","brand":"Sony","category":"Electronics","image":"/img/items/gaming-console.svg","imageUrl":"https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg","price":45000,"countInStock":6,"rating":4.9,"reviews":18,"description":"Next-generation gaming console for ultimate gaming experience","features":["8K graphics capability","Custom SSD storage","Ray tracing support","HDR gaming"]},
  {"_id":"10","name":"Denim Jeans","brand":"Levi's","category":"Fashion","image":"/img/items/denim-jeans.svg","imageUrl":"https://m.media-amazon.com/images/I/71dT0gYxUDL._UY879_.jpg","price":3500,"countInStock":25,"rating":4.1,"reviews":14,"description":"Classic denim jeans for everyday wear","features":["Premium denim","Classic fit","Five-pocket design","Button and zip closure"]},
  {"_id":"11","name":"Smart TV","brand":"LG","category":"Electronics","image":"/img/items/smart-tv.svg","imageUrl":"https://m.media-amazon.com/images/I/71LJJrKbezL._SX679_.jpg","price":55000,"countInStock":8,"rating":4.4,"reviews":16,"description":"4K Smart TV with AI-powered features","features":["55-inch 4K display","AI ThinQ technology","Dolby Vision and Atmos","WebOS smart platform"]},
  {"_id":"12","name":"Air Purifier","brand":"Dyson","category":"Home","image":"/img/items/air-purifier.svg","imageUrl":"https://m.media-amazon.com/images/I/61YVdHX5rYL._SX679_.jpg","price":35000,"countInStock":5,"rating":4.6,"reviews":9,"description":"Advanced air purifier with HEPA filtration","features":["HEPA H13 filtration","Air quality sensor","Night mode","Auto mode"]},
  {"_id":"13","name":"Blender","brand":"Ninja","category":"Home","image":"/img/items/blender.svg","imageUrl":"https://m.media-amazon.com/images/I/71YtJhD6HqL._SX679_.jpg","price":12000,"countInStock":15,"rating":4.3,"reviews":11,"description":"Professional-grade blender for smoothies and food processing","features":["1000W motor","6 blending programs","BPA-free materials","Easy clean design"]},
  {"_id":"14","name":"Designer Handbag","brand":"Michael Kors","category":"Fashion","image":"/img/items/designer-handbag.svg","imageUrl":"https://m.media-amazon.com/images/I/71YtJhD6HqL._SX679_.jpg","price":25000,"countInStock":7,"rating":4.7,"reviews":8,"description":"Luxury designer handbag with premium materials","features":["Genuine leather","Multiple compartments","Adjustable strap","Signature logo"]},
  {"_id":"15","name":"Robot Vacuum","brand":"iRobot","category":"Home","image":"/img/items/robot-vacuum.svg","imageUrl":"https://m.media-amazon.com/images/I/61YtJhD6HqL._SX679_.jpg","price":28000,"countInStock":6,"rating":4.5,"reviews":13,"description":"Smart robot vacuum with mapping technology","features":["Smart mapping","App control","Self-charging","Multi-surface cleaning"]},
  {"_id":"16","name":"Fitbit Versa 4 Fitness Smartwatch","brand":"Fitbit","category":"Electronics","image":"/img/items/fitness-tracker.svg","imageUrl":"https://m.media-amazon.com/images/I/61Mrd1CgklL._SX679_.jpg","price":19089,"countInStock":15,"rating":4.3,"reviews":13,"description":"Advanced fitness smartwatch that tracks your health metrics, activity, and sleep patterns","features":["Heart rate monitoring","Built-in GPS tracking","Sleep tracking and analysis","6+ day battery life","40+ exercise modes"]},
  {"_id":"17","name":"Tablet","brand":"Apple","category":"Electronics","image":"/img/items/tablet.svg","imageUrl":"https://m.media-amazon.com/images/I/61uA2UVnYWL._SX679_.jpg","price":45000,"countInStock":12,"rating":4.7,"reviews":23,"description":"Powerful tablet for work, creativity, and entertainment","features":["10.9-inch Liquid Retina display","A14 Bionic chip","12MP camera","All-day battery life"]},
  {"_id":"18","name":"Wireless Earbuds","brand":"Samsung","category":"Electronics","image":"/img/items/wireless-earbuds.svg","imageUrl":"https://m.media-amazon.com/images/I/61ARlJJYpaL._SX679_.jpg","price":8500,"countInStock":20,"rating":4.4,"reviews":15,"description":"Premium wireless earbuds with active noise cancellation","features":["Active noise cancellation","Ambient sound mode","Up to 8 hours of battery life","Touch controls"]},
  {"_id":"19","name":"Microwave Oven","brand":"LG","category":"Home","image":"/img/items/microwave-oven.svg","imageUrl":"https://m.media-amazon.com/images/I/71DwQXPiGPL._SX679_.jpg","price":12000,"countInStock":9,"rating":4.1,"reviews":11,"description":"Versatile microwave oven with convection and grilling functions","features":["32L capacity","Convection cooking","Auto cook menus","Child lock safety feature"]},
  {"_id":"20","name":"Yoga Mat","brand":"Gaiam","category":"Sports","image":"/img/items/yoga-mat.svg","imageUrl":"https://m.media-amazon.com/images/I/71NJP0ld4IL._SX679_.jpg","price":1800,"countInStock":30,"rating":4.2,"reviews":9,"description":"Non-slip yoga mat for comfortable practice and exercise","features":["6mm thickness for comfort","Non-slip textured surface","Lightweight and portable","Free from harmful chemicals"]}
];

// In-memory cart (instead of MongoDB)
let cart = {
  cartItems: [],
  totalPrice: 0,
  totalItems: 0
};

// In-memory wishlist
let wishlist = [];

// In-memory recently viewed
let recentlyViewed = [];

// Product routes
app.get('/api/products', (req, res) => {
  try {
    console.log('Products API called');
    console.log('Number of products:', products.length);
    res.json(products);
  } catch (error) {
    console.error('Error in products API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:id', (req, res) => {
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

// Recently viewed products route
app.get('/api/recent-products', (req, res) => {
  res.json(recentlyViewed);
});

// Wishlist routes
app.get('/api/wishlist', (req, res) => {
  res.json(wishlist);
});

app.post('/api/wishlist/add', (req, res) => {
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

app.delete('/api/wishlist/remove/:productId', (req, res) => {
  const productId = req.params.productId;
  wishlist = wishlist.filter(item => item._id !== productId);
  res.json(wishlist);
});

// Related products route (products in same category)
app.get('/api/products/:id/related', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4); // Get up to 4 related products
  
  res.json(relatedProducts);
});

// Cart routes
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart/add', (req, res) => {
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

app.put('/api/cart/update/:productId', (req, res) => {
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

app.delete('/api/cart/remove/:productId', (req, res) => {
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

app.delete('/api/cart/clear', (req, res) => {
  cart.cartItems = [];
  cart.totalPrice = 0;
  cart.totalItems = 0;
  
  res.json({ message: 'Cart cleared', cart });
});

// Amazon-like features: Add to cart with quantity
app.post('/api/cart/add-with-options', (req, res) => {
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

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 