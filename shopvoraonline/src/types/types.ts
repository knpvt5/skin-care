export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  affiliateLinks: {
    amazon?: string;
  };
  tags: string[];
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown content
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  featured?: boolean;
  relatedProducts: string[]; // Product IDs
}