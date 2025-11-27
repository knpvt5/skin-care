export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  affiliateLinks: {
    amazon?: string;
  };
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown content
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  featured?: boolean;
  relatedProducts: string[]; // Product IDs
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Hydrating Hyaluronic Acid Serum',
    brand: 'GlowLab',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviews: 1240,
    affiliateLinks: {
      amazon: '#',
    },
    tags: ['hydration', 'serum', 'dry skin'],
  },
  {
    id: 'p2',
    name: 'Daily SPF 50 Sunscreen',
    brand: 'SunShield',
    price: '$18.50',
    image: 'https://images.unsplash.com/photo-1556228720-1957be83f304?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviews: 850,
    affiliateLinks: {
      amazon: '#',
    },
    tags: ['sun protection', 'spf', 'daily'],
  },
  {
    id: 'p3',
    name: 'Retinol Night Cream',
    brand: 'AgeDefy',
    price: '$32.00',
    image: 'https://images.unsplash.com/photo-1571781348782-84113d944006?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviews: 560,
    affiliateLinks: {},
    tags: ['anti-aging', 'night', 'retinol'],
  },
  {
    id: 'p4',
    name: 'Gentle Foaming Cleanser',
    brand: 'PureSkin',
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
    reviews: 2100,
    affiliateLinks: {
      amazon: '#',
    },
    tags: ['cleanser', 'sensitive skin'],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Ultimate Guide to Glass Skin',
    excerpt: 'Discover the K-beauty secrets to achieving that dewy, luminous look everyone is talking about.',
    content: '<p>Glass skin is the term used to describe a complexion that is so smooth, clear, and hydrated that it appears transparent and reflective—like a sheet of glass. This trend, originating from Korea, is all about layering hydration and nourishing the skin.</p><h3>Step 1: Double Cleanse</h3><p>Start with an oil-based cleanser to remove makeup and sunscreen, followed by a water-based cleanser to clean the pores.</p>',
    author: 'Vora',
    date: 'Oct 24, 2023',
    category: 'K-Beauty',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    featured: true,
    relatedProducts: ['p1', 'p4'],
  },
  {
    id: 'b2',
    title: 'Retinol 101: A Beginner’s Guide',
    excerpt: 'Everything you need to know about starting retinol without irritating your skin.',
    content: '<p>Retinol is a gold-standard ingredient for anti-aging, but it can be intimidating. It helps increase cell turnover and stimulate collagen production.</p><h3>How to Start</h3><p>Start slow. Use a pea-sized amount once or twice a week at night, and always follow up with moisturizer.</p>',
    author: 'Dr. Skin',
    date: 'Nov 02, 2023',
    category: 'Anti-Aging',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    featured: true,
    relatedProducts: ['p3', 'p2'],
  },
  {
    id: 'b3',
    title: '5 Ingredients for Acne-Prone Skin',
    excerpt: 'Struggling with breakouts? Look for these key ingredients in your skincare routine.',
    content: '<p>Acne can be stubborn, but the right ingredients can make a huge difference. Salicylic acid, benzoyl peroxide, and niacinamide are your best friends.</p>',
    author: 'Vora',
    date: 'Nov 10, 2023',
    category: 'Acne Care',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    featured: false,
    relatedProducts: ['p4'],
  },
  {
    id: 'b4',
    title: 'My Morning Skincare Routine',
    excerpt: 'A simple, effective morning routine to wake up your skin and protect it for the day.',
    content: '<p>Mornings are for protection. Vitamin C and SPF are non-negotiables.</p>',
    author: 'Vora',
    date: 'Nov 15, 2023',
    category: 'Routines',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min read',
    featured: false,
    relatedProducts: ['p2', 'p1'],
  },
  {
    id: 'b5',
    title: 'Understanding Hyaluronic Acid',
    excerpt: 'Why this hydration hero deserves a spot in everyone’s skincare cabinet.',
    content: '<p>Hyaluronic acid can hold up to 1000x its weight in water.</p>',
    author: 'Vora',
    date: 'Nov 20, 2023',
    category: 'Ingredient Explanations',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    featured: false,
    relatedProducts: ['p1'],
  },
];
