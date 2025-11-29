import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import type { Product, BlogPost } from '../types/types';

const Home: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, productsData] = await Promise.all([
          api.getBlogPosts(),
          api.getProducts()
        ]);
        setFeaturedPosts(postsData.slice(0, 3));
        setFeaturedProducts(productsData.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setNewsletterStatus({ type: '', message: '' });

    try {
      await api.subscribeToNewsletter(newsletterEmail, 'home-page');
      setNewsletterStatus({ type: 'success', message: '🎉 Successfully subscribed!' });
      setNewsletterEmail('');
    } catch (err: any) {
      setNewsletterStatus({ 
        type: 'error', 
        message: err.message || 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-rose-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Home" 
        description="Discover science-backed skincare advice, honest product reviews, and curated routines at ShopVoraOnline. Your journey to radiant skin starts here."
        keywords="skincare routine, skin care, good skin care routine, natural skin, beauty skin, beauty skincare, advanced skin care, retinol skin, your skin care"
        url="https://shopvoraonline.com"
      />
      
      {/* Hero Section */}
      <section className="relative bg-rose-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-orange-100 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-rose-100 text-rose-600 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3 h-3" />
                Skincare Simplified
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 leading-tight mb-6">
                Your Journey to <span className="text-rose-500 italic">Radiant</span> Skin Starts Here.
              </h1>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg">
                Discover science-backed advice, honest product reviews, and curated routines tailored to your unique skin needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/guide" 
                  className="inline-flex justify-center items-center px-8 py-4 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start Your Guide
                </Link>
                <Link 
                  to="/blog" 
                  className="inline-flex justify-center items-center px-8 py-4 bg-white text-stone-900 border border-stone-200 text-sm font-medium rounded-full hover:bg-stone-50 transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  Read the Blog
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000" 
                  alt="Skincare Routine" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl max-w-xs hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 font-medium uppercase">Daily Tip</p>
                    <p className="text-sm font-semibold text-stone-900">Don't forget SPF, even indoors!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Trending Now</h2>
              <p className="text-stone-500">Latest skincare secrets and guides.</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
              View All Posts <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
              View All Posts <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Shop Vora's Favorites</h2>
            <p className="text-stone-500">
              Curated picks that are actually worth the hype. We've tested these so you don't have to guess.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img 
            src="https://images.unsplash.com/photo-1556228720-1957be83f304?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join the Skincare Community</h2>
          <p className="text-stone-300 mb-10 text-lg">
            Get weekly routines, product drops, and exclusive guides delivered straight to your inbox. No spam, just glow.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              disabled={subscribing}
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 backdrop-blur-sm disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={subscribing}
              className="px-8 py-4 bg-rose-500 text-white font-bold rounded-full hover:bg-rose-600 transition-colors shadow-lg hover:shadow-rose-500/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {newsletterStatus.message && (
            <p className={`mt-4 text-sm ${newsletterStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {newsletterStatus.message}
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
