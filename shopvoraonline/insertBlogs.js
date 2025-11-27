import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Read .env file manually since we don't have dotenv
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const blogPosts = [
  {
    title: 'The Ultimate Guide to Glass Skin',
    excerpt: 'Discover the K-beauty secrets to achieving that dewy, luminous look everyone is talking about.',
    content: '<p>Glass skin is the term used to describe a complexion that is so smooth, clear, and hydrated that it appears transparent and reflective—like a sheet of glass. This trend, originating from Korea, is all about layering hydration and nourishing the skin.</p><h3>Step 1: Double Cleanse</h3><p>Start with an oil-based cleanser to remove makeup and sunscreen, followed by a water-based cleanser to clean the pores.</p>',
    category: 'K-Beauty',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    featured: true,
    relatedProducts: ['p1', 'p4'],
  },
  {
    title: 'Retinol 101: A Beginner’s Guide',
    excerpt: 'Everything you need to know about starting retinol without irritating your skin.',
    content: '<p>Retinol is a gold-standard ingredient for anti-aging, but it can be intimidating. It helps increase cell turnover and stimulate collagen production.</p><h3>How to Start</h3><p>Start slow. Use a pea-sized amount once or twice a week at night, and always follow up with moisturizer.</p>',
    category: 'Anti-Aging',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    featured: true,
    relatedProducts: ['p3', 'p2'],
  },
  {
    title: '5 Ingredients for Acne-Prone Skin',
    excerpt: 'Struggling with breakouts? Look for these key ingredients in your skincare routine.',
    content: '<p>Acne can be stubborn, but the right ingredients can make a huge difference. Salicylic acid, benzoyl peroxide, and niacinamide are your best friends.</p>',
    category: 'Acne Care',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    featured: false,
    relatedProducts: ['p4'],
  },
  {
    title: 'My Morning Skincare Routine',
    excerpt: 'A simple, effective morning routine to wake up your skin and protect it for the day.',
    content: '<p>Mornings are for protection. Vitamin C and SPF are non-negotiables.</p>',
    category: 'Routines',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read',
    featured: false,
    relatedProducts: ['p2', 'p1'],
  },
  {
    title: 'Understanding Hyaluronic Acid',
    excerpt: 'Why this hydration hero deserves a spot in everyone’s skincare cabinet.',
    content: '<p>Hyaluronic acid can hold up to 1000x its weight in water.</p>',
    category: 'Ingredient Explanations',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    featured: false,
    relatedProducts: ['p1'],
  },
];

async function insertData() {
  console.log('Starting data insertion...');
  
  for (const product of products) {
    const priceNumber = parseFloat(product.price.replace('$', ''));
    
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        brand: product.brand,
        price: priceNumber,
        image_url: product.image,
        description: product.description,
        tags: product.tags,
        product_url: product.affiliateLinks
      })
      .select();

    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message);
    } else {
      console.log(`Successfully inserted: ${product.name}`);
    }
  }
  
  console.log('Data insertion complete.');
}

insertData();