import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import type { BlogPost as BlogPostType, Product } from '../types/types';

const BlogPost: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!title) return;
      try {
        const decodedTitle = decodeURIComponent(title);
        const postData = await api.getBlogPost(decodedTitle);
        setPost(postData);

        const productsData = await api.getProducts();
        const related = productsData.filter(p => 
          p.tags.some(tag => postData.tags.includes(tag))
        );
        setRelatedProducts(related);
      } catch (err) {
        console.error(err);
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
        </div>
      </Layout>
    );
  }

  if (!post || error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-4">Article not found</h1>
          <Link to="/blog" className="text-rose-500 hover:underline">Return to Blog</Link>
        </div>
      </Layout>
    );
  }



  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} image={post.image} />
      
      <article className="bg-white">
        {/* Header */}
        <div className="relative h-[60vh] min-h-[400px]">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-5xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium mb-4">
              <span className="bg-rose-500 px-3 py-1 rounded-full">{post.category}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-white/80">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-stone prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                  Shop This Post
                </h3>
                <div className="space-y-6">
                  {relatedProducts.length > 0 ? (
                    relatedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  ) : (
                    <p className="text-stone-500 text-sm">No specific products linked to this article.</p>
                  )}
                </div>

                <div className="mt-12 bg-rose-50 p-6 rounded-xl">
                  <h4 className="font-bold text-stone-900 mb-2">Need more help?</h4>
                  <p className="text-sm text-stone-600 mb-4">
                    Check out our comprehensive skincare guide for a step-by-step routine.
                  </p>
                  <Link 
                    to="/guide" 
                    className="block w-full text-center px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    View Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
