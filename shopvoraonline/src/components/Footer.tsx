import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { api } from '../services/api';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await api.subscribeToNewsletter(email, 'footer');
      setStatus({ type: 'success', message: '✓ Subscribed!' });
      setEmail('');
    } catch (err: any) {
      setStatus({ 
        type: 'error', 
        message: err.message || 'Failed to subscribe' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-stone-800 tracking-tighter">
              ShopVora<span className="text-rose-400">.</span>
            </Link>
            <p className="mt-4 text-sm text-stone-500 leading-relaxed">
              Democratizing skincare education with science-backed advice and honest reviews. Your skin journey starts here.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/art_of_folds?igsh=MXYzeWdmODBwczRsZg==" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/profile.php?id=61579919684282" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://x.com/shopvoraonline" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-rose-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="mailto:contach@shopvoraonline.com" className="text-stone-400 hover:text-rose-500 transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/blog" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">Blog</Link></li>
              <li><Link to="/guide" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">Skincare Guide</Link></li>
              <li><Link to="/about" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Topics</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/blog?category=Acne Care" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">Acne Care</Link></li>
              <li><Link to="/blog?category=Anti-Aging" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">Anti-Aging</Link></li>
              <li><Link to="/blog?category=K-Beauty" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">K-Beauty</Link></li>
              <li><Link to="/blog?category=Product Reviews" className="text-sm text-stone-500 hover:text-rose-500 transition-colors">Product Reviews</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 tracking-wider uppercase">Stay Glowing</h3>
            <p className="mt-4 text-sm text-stone-500">
              Subscribe to get the latest skincare tips and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-2">
              <input 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
                className="px-4 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 text-sm disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status.message && (
                <p className={`text-xs ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <p className="text-xs text-center text-stone-600 leading-relaxed">
              <span className="font-semibold">DISCLAIMER:</span> THIS SITE IS FOR INFORMATIONAL PURPOSES ONLY AND SHOULD NOT BE USED AS A SUBSTITUTE FOR ADVICE OR TREATMENT FROM A QUALIFIED MEDICAL PROFESSIONAL. THIS SITE IS AFFILIATED WITH FORMULYST AND CARROT & STICK, WHOSE PRODUCTS ARE AMONG THOSE WE REVIEW AND RANK.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} ShopVoraOnline. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-stone-400 hover:text-stone-600">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-stone-400 hover:text-stone-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
