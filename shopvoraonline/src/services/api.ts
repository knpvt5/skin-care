import { supabase } from '../lib/supabase';
import type { Product, BlogPost } from '../types/types';

// Helper function to strip HTML tags and get plain text
const stripHtmlTags = (html: string): string => {
  // Create a temporary div element to parse HTML
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  // Get text content and clean up extra whitespace
  return tmp.textContent || tmp.innerText || '';
};

export const api = {
  // Auth
  auth: {
    getProfile: async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  // Contact
  submitContact: async (data: { name: string; email: string; subject: string; message: string }) => {
    const { error } = await supabase
      .from('contact')
      .insert([data]);
    
    if (error) throw error;
    return true;
  },

  getContactMessages: async () => {
    const { data, error } = await supabase
      .from('contact')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  deleteContactMessage: async (id: string) => {
    const { error } = await supabase
      .from('contact')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Newsletter
  subscribeToNewsletter: async (email: string, source: string = 'website') => {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email, source }])
      .select()
      .single();
    
    if (error) {
      // Check if error is due to duplicate email
      if (error.code === '23505') {
        throw new Error('This email is already subscribed to our newsletter.');
      }
      throw error;
    }
    return data;
  },

  getSubscribers: async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  getUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Products
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    
    return data.map((product: any) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: '$' + product.price.toFixed(2),
      image: product.image_url,
      affiliateLinks: {
        amazon: product.product_url
      },
      tags: product.tags || [],
      description: product.description
    })) as Product[];
  },

  createProduct: async (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const dbProduct = {
      name: product.name,
      brand: product.brand,
      price: parseFloat(product.price.replace('$', '')),
      image_url: product.image,
      tags: product.tags,
      product_url: product.affiliateLinks?.amazon,
      description: product.description
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbProduct])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateProduct: async (id: string, product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const dbProduct = {
      name: product.name,
      brand: product.brand,
      price: parseFloat(product.price.replace('$', '')),
      image_url: product.image,
      tags: product.tags,
      product_url: product.affiliateLinks?.amazon,
      description: product.description
    };

    const { data, error } = await supabase
      .from('products')
      .update(dbProduct)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteProduct: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Blogs
  getBlogPosts: async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    
    // Map DB fields to frontend interface
    return data.map((post: any) => {
      const plainText = stripHtmlTags(post.content);
      return {
        id: post.id,
        title: post.title,
        excerpt: plainText.substring(0, 150) + '...',
        content: post.content,
        date: new Date(post.published_at).toLocaleDateString(),
        category: post.category,
        tags: post.tags,
        image: post.image_url,
        readTime: post.read_time + ' min read',
        relatedProducts: [],
      };
    }) as BlogPost[];
  },

  getBlogPost: async (title: string) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('title', title)
      .single();
    
    if (error) throw error;

    const plainText = stripHtmlTags(data.content);
    return {
      id: data.id,
      title: data.title,
      excerpt: plainText.substring(0, 150) + '...',
      content: data.content,
      date: new Date(data.published_at).toLocaleDateString(),
      category: data.category,
      tags: data.tags,
      image: data.image_url,
      readTime: data.read_time + ' min read',
      relatedProducts: [],
    } as BlogPost;
  },

  checkBlogPostExists: async (title: string) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .eq('title', title)
      .maybeSingle();
    
    if (error) throw error;
    return !!data;
  },

  createBlogPost: async (post: { title: string; content: string; category: string; image_url: string; read_time: number; tags: string[] }) => {
    const { data, error } = await supabase
      .from('blogs')
      .insert([post])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  updateBlogPost: async (id: string, post: { title: string; content: string; category: string; image_url: string; read_time: number; tags: string[] }) => {
    const { data, error } = await supabase
      .from('blogs')
      .update(post)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  deleteBlogPost: async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
