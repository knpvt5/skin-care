import { createClient } from '@supabase/supabase-js';

process.loadEnvFile("./.env")

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

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
    tags: ['k-beauty', 'glass skin', 'hydration'],
  },
  {
    title: 'Retinol 101: A Beginner’s Guide',
    excerpt: 'Everything you need to know about starting retinol without irritating your skin.',
    content: '<p>Retinol is a gold-standard ingredient for anti-aging, but it can be intimidating. It helps increase cell turnover and stimulate collagen production.</p><h3>How to Start</h3><p>Start slow. Use a pea-sized amount once or twice a week at night, and always follow up with moisturizer.</p>',
    category: 'Anti-Aging',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    tags: ['retinol', 'anti-aging', 'beginner'],
  },
  {
    title: '5 Ingredients for Acne-Prone Skin',
    excerpt: 'Struggling with breakouts? Look for these key ingredients in your skincare routine.',
    content: '<p>Acne can be stubborn, but the right ingredients can make a huge difference. Salicylic acid, benzoyl peroxide, and niacinamide are your best friends.</p>',
    category: 'Acne Care',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    tags: ['acne', 'ingredients', 'skincare'],
  },
  {
    title: 'My Morning Skincare Routine',
    excerpt: 'A simple, effective morning routine to wake up your skin and protect it for the day.',
    content: '<p>Mornings are for protection. Vitamin C and SPF are non-negotiables.</p>',
    category: 'Routines',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read',
    tags: ['routine', 'morning', 'vitamin c'],
  },
  {
    title: 'Understanding Hyaluronic Acid',
    excerpt: 'Why this hydration hero deserves a spot in everyone’s skincare cabinet.',
    content: '<p>Hyaluronic acid can hold up to 1000x its weight in water.</p>',
    category: 'Ingredient Explanations',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    tags: ['hyaluronic acid', 'ingredients', 'hydration'],
  },
];

async function insertData() {
  console.log('Starting blog data insertion...');
  
  for (const post of blogPosts) {
    // Parse read time string "5 min read" to integer 5
    const readTimeInt = parseInt(post.readTime);
    
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title: post.title,
        content: post.content,
        category: post.category,
        image_url: post.image,
        read_time: readTimeInt || 5, // Default to 5 if parsing fails
        tags: post.tags
      })
      .select();

    if (error) {
      console.error(`Error inserting ${post.title}:`, error.message);
    } else {
      console.log(`Successfully inserted: ${post.title}`);
    }
  }
  
  console.log('Blog data insertion complete.');
}

insertData();