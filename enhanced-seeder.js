const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Product categories
const categories = [
  'Electronics', 
  'Fashion', 
  'Home', 
  'Beauty', 
  'Books', 
  'Sports', 
  'Toys', 
  'Furniture', 
  'Grocery', 
  'Automotive'
];

// Brands by category
const brandsByCategory = {
  'Electronics': ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus', 'JBL', 'Bose', 'Philips', 'Xiaomi'],
  'Fashion': ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Zara', 'H&M', 'Gap', 'Calvin Klein', 'Tommy Hilfiger', 'Gucci', 'Armani'],
  'Home': ['Ikea', 'Bosch', 'Dyson', 'Philips', 'Prestige', 'Cello', 'Havells', 'Hindware', 'Milton', 'Wonderchef'],
  'Beauty': ['Lakme', 'Maybelline', 'L\'Oreal', 'MAC', 'Nivea', 'Dove', 'Neutrogena', 'Biotique', 'Himalaya', 'Forest Essentials'],
  'Books': ['Penguin', 'HarperCollins', 'Scholastic', 'Bloomsbury', 'Random House', 'Rupa', 'Westland', 'Pan Macmillan'],
  'Sports': ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'Yonex', 'Wilson', 'Callaway', 'Decathlon', 'Nivia'],
  'Toys': ['Lego', 'Mattel', 'Hasbro', 'Nerf', 'Fisher-Price', 'Barbie', 'Hot Wheels', 'Funskool', 'Nintendo'],
  'Furniture': ['Ikea', 'HomeTown', 'Urban Ladder', 'Pepperfry', 'Godrej', 'Nilkamal', 'Durian', 'Usha', 'Fabindia'],
  'Grocery': ['Amul', 'Nestle', 'Britannia', 'Haldiram\'s', 'Patanjali', 'MDH', 'Tata', 'Parle', 'ITC', 'Dabur'],
  'Automotive': ['Bosch', 'Castrol', 'Shell', 'Gulf', 'Michelin', 'MRF', 'Bridgestone', 'Exide', 'Philips', 'JBL']
};

// Product templates by category
const productTemplates = {
  'Electronics': [
    {
      namePrefix: 'Wireless Headphones',
      descriptionTemplate: 'Premium wireless headphones with {features}. {batteryLife} battery life and comfortable design for all-day listening.',
      priceRange: [1499, 29999],
      countInStockRange: [3, 15],
      features: ['noise cancellation', 'high-resolution audio', 'foldable design', 'touch controls', 'voice assistant support']
    },
    {
      namePrefix: 'Smartphone',
      descriptionTemplate: 'Feature-packed smartphone with {features}. Perfect for productivity, entertainment, and staying connected.',
      priceRange: [9999, 149999],
      countInStockRange: [5, 20],
      features: ['high-resolution camera', 'fast charging', 'AMOLED display', 'octa-core processor', 'expandable storage']
    },
    {
      namePrefix: 'Laptop',
      descriptionTemplate: 'Powerful laptop with {features}. Ideal for work, study, and entertainment with reliable performance.',
      priceRange: [29999, 179999],
      countInStockRange: [2, 10],
      features: ['fast processor', 'SSD storage', 'backlit keyboard', 'long battery life', 'HD webcam', 'premium build quality']
    },
    {
      namePrefix: 'Smart TV',
      descriptionTemplate: '{resolution} Smart TV with {features}. Transform your home entertainment experience with stunning visuals and smart features.',
      priceRange: [12999, 149999],
      countInStockRange: [3, 8],
      features: ['HDR support', 'slim design', 'voice control', 'built-in streaming apps', 'Dolby audio']
    },
    {
      namePrefix: 'Bluetooth Speaker',
      descriptionTemplate: 'Portable bluetooth speaker with {features}. Take your music anywhere with rich, powerful sound.',
      priceRange: [999, 19999],
      countInStockRange: [5, 20],
      features: ['water resistance', 'long battery life', 'compact design', 'multi-device connectivity', 'built-in microphone']
    }
  ],
  'Fashion': [
    {
      namePrefix: 'Running Shoes',
      descriptionTemplate: 'Premium running shoes with {features}. Designed for comfort and performance during your workouts.',
      priceRange: [1499, 12999],
      countInStockRange: [10, 50],
      features: ['breathable mesh', 'cushioned sole', 'lightweight design', 'shock absorption', 'durable construction']
    },
    {
      namePrefix: 'Designer Handbag',
      descriptionTemplate: 'Elegant designer handbag with {features}. Perfect accessory for any outfit or occasion.',
      priceRange: [1999, 24999],
      countInStockRange: [5, 15],
      features: ['premium materials', 'spacious interior', 'multiple compartments', 'adjustable strap', 'stylish design']
    },
    {
      namePrefix: 'Casual T-Shirt',
      descriptionTemplate: 'Comfortable casual t-shirt with {features}. Perfect for everyday wear or relaxed outings.',
      priceRange: [399, 2499],
      countInStockRange: [20, 100],
      features: ['soft fabric', 'stylish design', 'comfortable fit', 'breathable material', 'easy to maintain']
    }
  ],
  'Home': [
    {
      namePrefix: 'Coffee Maker',
      descriptionTemplate: 'Premium coffee maker with {features}. Start your day right with perfectly brewed coffee at the touch of a button.',
      priceRange: [1999, 24999],
      countInStockRange: [5, 15],
      features: ['programmable timer', 'auto shut-off', 'multiple brew settings', 'water filter', 'thermal carafe']
    },
    {
      namePrefix: 'Air Purifier',
      descriptionTemplate: 'Efficient air purifier with {features}. Breathe cleaner, fresher air in your home or office.',
      priceRange: [4999, 29999],
      countInStockRange: [3, 12],
      features: ['HEPA filter', 'quiet operation', 'air quality indicator', 'multiple fan speeds', 'compact design']
    },
    {
      namePrefix: 'Robot Vacuum',
      descriptionTemplate: 'Smart robot vacuum with {features}. Keep your floors clean with minimal effort.',
      priceRange: [9999, 39999],
      countInStockRange: [2, 10],
      features: ['intelligent mapping', 'app control', 'scheduled cleaning', 'multiple cleaning modes', 'auto-charging']
    }
  ]
};

// Additional categories
for (const category of categories) {
  if (!productTemplates[category]) {
    productTemplates[category] = [
      {
        namePrefix: `${category} Item`,
        descriptionTemplate: `Quality ${category.toLowerCase()} item with {features}. Perfect for everyday use with exceptional quality and design.`,
        priceRange: [499, 9999],
        countInStockRange: [5, 30],
        features: ['premium quality', 'durable construction', 'modern design', 'ergonomic design', 'satisfaction guaranteed']
      }
    ];
  }
}

// Helper functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPrice(min, max) {
  return Math.round(getRandomInt(min, max) / 100) * 100 - 1; // Round to nearest 100 and subtract 1
}

function generateRandomFeatures(featuresList, count = 3) {
  const shuffled = [...featuresList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate large product dataset
function generateProducts(count = 110) {
  const products = [];
  
  // Keep existing products and add more
  const existingProducts = require('./seeder').products;
  products.push(...existingProducts);
  
  while (products.length < count) {
    const category = getRandomItem(categories);
    const brand = getRandomItem(brandsByCategory[category]);
    const template = getRandomItem(productTemplates[category]);
    
    const features = generateRandomFeatures(template.features, getRandomInt(2, 4));
    const featuresText = features.join(', ');
    
    const resolution = getRandomItem(['HD', '4K', 'Ultra HD', 'Full HD']);
    const batteryLife = getRandomItem(['Up to 10 hours', 'Up to 15 hours', 'Up to 20 hours', 'Up to 30 hours']);
    
    let description = template.descriptionTemplate
      .replace('{features}', featuresText)
      .replace('{resolution}', resolution)
      .replace('{batteryLife}', batteryLife);
    
    const variant = getRandomInt(1, 5);
    
    const product = {
      name: `${brand} ${template.namePrefix} ${variant}`,
      description,
      price: getRandomPrice(template.priceRange[0], template.priceRange[1]),
      image: `/images/placeholder.jpg`,
      category,
      brand,
      countInStock: getRandomInt(template.countInStockRange[0], template.countInStockRange[1])
    };
    
    products.push(product);
  }
  
  return products;
}

// Generate 110 products (including existing ones)
const allProducts = generateProducts(110);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing products
      await Product.deleteMany({});
      console.log('Products cleared');
      
      // Insert new products
      await Product.insertMany(allProducts);
      console.log(`${allProducts.length} products added to database`);
      
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