
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Studio Headphones',
    description: 'Immersive sound, soft over-ear cushions and a clean everyday design.',
    price: 3499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    featured: true
  },
  {
    name: 'Everyday Backpack',
    description: 'A versatile carry-all with thoughtful storage for work and weekends.',
    price: 2199,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
    featured: true
  },
  {
    name: 'Minimal Desk Lamp',
    description: 'A warm, focused glow for late-night reading and creative work.',
    price: 1899,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Classic Sneakers',
    description: 'Comfort-first everyday sneakers with a timeless silhouette.',
    price: 2999,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    featured: true
  },
  {
    name: 'Ceramic Coffee Set',
    description: 'A pair of understated ceramic cups for your daily coffee ritual.',
    price: 999,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Classic Wristwatch',
    description: 'A refined everyday watch with a simple, easy-to-read dial.',
    price: 4599,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Portable Speaker',
    description: 'Compact wireless audio for your desk, room or next trip.',
    price: 2599,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Cotton Overshirt',
    description: 'A relaxed layering piece made for easy everyday styling.',
    price: 1799,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85',
    featured: true
  }
];

try {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing.');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const operations = products.map(product => ({
    updateOne: {
      filter: { name: product.name },
      update: { $set: product },
      upsert: true
    }
  }));

  await Product.bulkWrite(operations);

  console.log('Sample products added or updated successfully!');
} catch (error) {
  console.error('Seeding failed:', error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
