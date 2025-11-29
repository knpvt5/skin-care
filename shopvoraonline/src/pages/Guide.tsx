import React, { useEffect, useState } from 'react';
import { Sun, Moon, Droplet, Shield, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';
import type { Product } from '../types/types';

const Guide: React.FC = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setRecommendedProducts(data.slice(0, 2));
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        title="Skincare Guide" 
        description="The ultimate beginner's guide to building an effective skincare routine. Learn the basics, understand your skin type, and discover the perfect products."
        keywords="skincare guide, skincare routine, skin routine, morning skin care routine, daily skin care routine at home, skincare steps, advanced skin care, face care routine"
        url="https://shopvoraonline.com/guide"
      />
      
      <div className="bg-stone-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Ultimate Skincare Guide</h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Building a routine doesn't have to be complicated. Here is the foundational knowledge you need to get started.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* The Basics */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">The Core Routine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* AM Routine */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">Morning (AM)</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-orange-500 shadow-sm">1</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Cleanse (Optional)</h4>
                    <p className="text-sm text-stone-600">Splash with water or use a gentle cleanser to remove night sweats.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-orange-500 shadow-sm">2</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Treat</h4>
                    <p className="text-sm text-stone-600">Vitamin C serum to brighten and protect against pollution.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-orange-500 shadow-sm">3</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Moisturize</h4>
                    <p className="text-sm text-stone-600">Lock in hydration with a lightweight moisturizer.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-orange-500 shadow-sm">4</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Protect (SPF)</h4>
                    <p className="text-sm text-stone-600">The most important step. Apply generously.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* PM Routine */}
            <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                  <Moon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">Evening (PM)</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-500 shadow-sm">1</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Double Cleanse</h4>
                    <p className="text-sm text-stone-600">Oil cleanser first to remove makeup/SPF, then water-based cleanser.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-500 shadow-sm">2</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Treat</h4>
                    <p className="text-sm text-stone-600">Retinol or exfoliating acids (don't mix them in the same night!).</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-indigo-500 shadow-sm">3</span>
                  <div>
                    <h4 className="font-bold text-stone-900">Moisturize</h4>
                    <p className="text-sm text-stone-600">A richer cream to repair the skin barrier while you sleep.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dictionary */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Ingredient Dictionary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-stone-200 rounded-xl hover:border-rose-300 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-rose-500">
                <Droplet className="w-5 h-5" />
                <h3 className="font-bold">Hyaluronic Acid</h3>
              </div>
              <p className="text-sm text-stone-600">A humectant that draws moisture into the skin. Great for all skin types for hydration.</p>
            </div>
            <div className="p-6 border border-stone-200 rounded-xl hover:border-rose-300 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-rose-500">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold">Niacinamide</h3>
              </div>
              <p className="text-sm text-stone-600">Vitamin B3. Helps control oil, minimize pores, and brighten skin tone. A multitasker.</p>
            </div>
            <div className="p-6 border border-stone-200 rounded-xl hover:border-rose-300 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-rose-500">
                <Sun className="w-5 h-5" />
                <h3 className="font-bold">Vitamin C</h3>
              </div>
              <p className="text-sm text-stone-600">An antioxidant that brightens skin and protects against free radical damage.</p>
            </div>
          </div>
        </div>

        {/* Starter Kit */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8">Starter Kit Recommendations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Guide;
