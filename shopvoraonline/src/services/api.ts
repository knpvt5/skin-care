import { supabase } from '../lib/supabase';
import type { Product, BlogPost } from '../data/data';

export const api = {
  // Contact
  submitContact: async (data: { name: string; email: string; subject: string; message: string }) => {
    const { error } = await supabase
      .from('contact')
      .insert([data]);
    
    if (error) throw error;
    return true;
  },

  // Products
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    return data as Product[]; // Assuming Supabase data matches Product interface roughly, might need mapping
  },

  createProduct: async (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    // Mapping frontend structure to DB structure if needed, but for now assuming direct mapping based on user request
    const dbProduct = {
      name: product.name,
      brand: product.brand,
      price: parseFloat(product.price.replace('$', '')), // Convert string price to number
      image_url: product.image,
      tags: product.tags,
      product_url: product.affiliateLinks?.amazon, // Assuming amazon link as primary for now based on schema
      // description: '...' // Missing in frontend interface but present in DB
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbProduct])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Blogs
  getBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    
    // Map DB fields to frontend interface
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.content.substring(0, 100) + '...', // Generate excerpt if missing
      content: post.content,
      // author: 'Vora', // Removed author
      date: new Date(post.published_at).toLocaleDateString(),
      category: post.category,
      image: post.image_url,
      readTime: post.read_time + ' min read',
      relatedProducts: [], // Not in DB schema yet
    })) as BlogPost[];
  },

  getBlogPost: async (id: string) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      excerpt: data.content.substring(0, 100) + '...',
      content: data.content,
      date: new Date(data.published_at).toLocaleDateString(),
      category: data.category,
      image: data.image_url,
      readTime: data.read_time + ' min read',
      relatedProducts: [],
    } as BlogPost;
  },

  createBlogPost: async (post: { title: string; content: string; category: string; image_url: string; read_time: number; tags: string[] }) => {
    const { data, error } = await supabase
      .from('blogs')
      .insert([post])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
