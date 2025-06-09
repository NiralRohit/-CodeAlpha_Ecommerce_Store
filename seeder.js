const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Sample products data
const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Features Bluetooth 5.0 and comfortable ear cushions.',
    price: 8999,
    image: '/images/headphones.jpg',
    category: 'Electronics',
    brand: 'Sony',
    countInStock: 10
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone with advanced 48MP triple camera, 5000mAh battery, 8GB RAM and 128GB storage. Features AMOLED display and fast charging.',
    price: 32999,
    image: '/images/smartphone.jpg',
    category: 'Electronics',
    brand: 'Samsung',
    countInStock: 5
  },
  {
    name: 'Laptop',
    description: 'Powerful laptop with 16GB RAM, 512GB SSD, dedicated graphics card and 14-inch FHD display. Perfect for work and gaming.',
    price: 65999,
    image: '/images/laptop.jpg',
    category: 'Electronics',
    brand: 'Dell',
    countInStock: 3
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with breathable mesh, cushioned insole and durable outsole. Perfect for jogging and everyday use.',
    price: 4499,
    image: '/images/shoes.jpg',
    category: 'Fashion',
    brand: 'Nike',
    countInStock: 15
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with adjustable brewing strength, programmable timer and 12-cup capacity. Makes perfect coffee every time.',
    price: 2499,
    image: '/images/coffee-maker.jpg',
    category: 'Home',
    brand: 'Philips',
    countInStock: 7
  },
  {
    name: 'Smart Watch',
    description: 'Advanced smartwatch with heart rate monitor, sleep tracking, GPS, and water resistance. Compatible with both Android and iOS devices.',
    price: 7999,
    image: '/images/smartwatch.jpg',
    category: 'Electronics',
    brand: 'Apple',
    countInStock: 12
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 20W output, 12-hour battery life, IPX7 waterproof rating, and built-in microphone for calls.',
    price: 3499,
    image: '/images/bluetooth-speaker.jpg',
    category: 'Electronics',
    brand: 'JBL',
    countInStock: 8
  },
  {
    name: 'Digital Camera',
    description: '24MP digital camera with 4K video recording, optical image stabilization, 3-inch touchscreen, and Wi-Fi connectivity for instant sharing.',
    price: 42999,
    image: '/images/digital-camera.jpg',
    category: 'Electronics',
    brand: 'Canon',
    countInStock: 6
  },
  {
    name: 'Gaming Console',
    description: 'Next-gen gaming console with 1TB storage, 4K gaming capability, ray tracing, and includes wireless controller.',
    price: 49999,
    image: '/images/gaming-console.jpg',
    category: 'Electronics',
    brand: 'Sony',
    countInStock: 4
  },
  {
    name: 'Denim Jeans',
    description: 'Classic denim jeans with comfortable stretch material, stylish design, and durable construction for everyday wear.',
    price: 1999,
    image: '/images/jeans.jpg',
    category: 'Fashion',
    brand: 'Levi\'s',
    countInStock: 20
  },
  {
    name: 'Air Purifier',
    description: 'HEPA air purifier that removes 99.97% of allergens, dust, and pollutants. Features quiet operation and covers rooms up to 400 sq ft.',
    price: 8499,
    image: '/images/air-purifier.jpg',
    category: 'Home',
    brand: 'Dyson',
    countInStock: 7
  },
  {
    name: 'Fitness Tracker',
    description: 'Lightweight fitness tracker with heart rate monitoring, step counter, sleep analysis, and 7-day battery life.',
    price: 2999,
    image: '/images/fitness-tracker.jpg',
    category: 'Electronics',
    brand: 'Fitbit',
    countInStock: 15
  },
  {
    name: 'Blender',
    description: 'High-performance blender with 1000W motor, multiple speed settings, and pulse function. Perfect for smoothies, soups, and sauces.',
    price: 3999,
    image: '/images/blender.jpg',
    category: 'Home',
    brand: 'Philips',
    countInStock: 9
  },
  {
    name: 'Designer Handbag',
    description: 'Elegant designer handbag made from premium leather with spacious interior, multiple compartments, and adjustable shoulder strap.',
    price: 12999,
    image: '/images/handbag.jpg',
    category: 'Fashion',
    brand: 'Gucci',
    countInStock: 6
  },
  {
    name: 'LED Smart TV',
    description: '55-inch 4K Ultra HD Smart LED TV with HDR, Dolby Vision, built-in streaming apps, and voice control compatibility.',
    price: 54999,
    image: '/images/smart-tv.jpg',
    category: 'Electronics',
    brand: 'Samsung',
    countInStock: 5
  },
  {
    name: 'Robot Vacuum',
    description: 'Automated robot vacuum with mapping technology, app control, HEPA filter, and 120-minute runtime on a single charge.',
    price: 18999,
    image: '/images/robot-vacuum.jpg',
    category: 'Home',
    brand: 'iRobot',
    countInStock: 8
  }
];

// Export the products array
module.exports = { products };

// Only run the database operations if this file is run directly
if (require.main === module) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
    .then(async () => {
      console.log('Connected to MongoDB');
      
      try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Products cleared');
        
        // Insert new products
        await Product.insertMany(products);
        console.log('Products added to database');
        
        // Disconnect from MongoDB
        mongoose.disconnect();
        console.log('MongoDB disconnected');
      } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });
} 