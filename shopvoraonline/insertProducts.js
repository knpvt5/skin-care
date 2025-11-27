import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Read .env file manually since we don't have dotenv
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const envPath = path.join(__dirname, '.env');
// const envContent = fs.readFileSync(envPath, 'utf-8');

// const envVars = envContent.split('\n').reduce((acc, line) => {
//   const [key, value] = line.split('=');
//   if (key && value) {
//     acc[key.trim()] = value.trim();
//   }
//   return acc;
// }, {});

process.loadEnvFile("./.env")

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const products = [
  {
    name: 'Hydrating Hyaluronic Acid Serum',
    brand: 'GlowLab',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    description: "Intense hydration for thirsty skin.",
    affiliateLinks: "https://amazon.com/example-serum",
    tags: ['hydration', 'serum', 'dry skin'],
  },
  {
    name: 'Daily SPF 50 Sunscreen',
    brand: 'SunShield',
    price: '$18.50',
    image: 'https://images.unsplash.com/photo-1556228720-1957be83f304?auto=format&fit=crop&q=80&w=600',
    description: "Broad spectrum protection without the white cast.",
    affiliateLinks: "https://amazon.com/example-spf",
    tags: ['sun protection', 'spf', 'daily'],
  },
  {
    name: 'Retinol Night Cream',
    brand: 'AgeDefy',
    price: '$32.00',
    image: 'https://images.unsplash.com/photo-1571781348782-84113d944006?auto=format&fit=crop&q=80&w=600',
    description: "Wake up to smoother, younger-looking skin.",  
    affiliateLinks: "https://amazon.com/example-retinol",
    tags: ['anti-aging', 'night', 'retinol'],
  },
  {
    name: 'Gentle Foaming Cleanser',
    brand: 'PureSkin',
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
    description: "Removes impurities without stripping natural oils.",
    affiliateLinks: "https://amazon.com/example-cleanser",
    tags: ['cleanser', 'sensitive skin'],
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