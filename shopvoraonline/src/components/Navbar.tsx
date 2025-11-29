import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="ShopVoraOnline Logo" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-serif text-2xl font-bold tracking-tight">
              ShopVora<span className="text-rose-500">Online</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-rose-600' : 'text-stone-600 hover:text-stone-900'}`} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-rose-600' : 'text-stone-600 hover:text-stone-900'}`} aria-current={isActive('/about') ? 'page' : undefined}>About</Link>
            <Link to="/blog" className={`text-sm font-medium transition-colors ${isActive('/blog') ? 'text-rose-600' : 'text-stone-600 hover:text-stone-900'}`} aria-current={isActive('/blog') ? 'page' : undefined}>Blog</Link>
            <Link to="/guide" className={`text-sm font-medium transition-colors ${isActive('/guide') ? 'text-rose-600' : 'text-stone-600 hover:text-stone-900'}`} aria-current={isActive('/guide') ? 'page' : undefined}>Skincare Guide</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-rose-600' : 'text-stone-600 hover:text-stone-900'}`} aria-current={isActive('/contact') ? 'page' : undefined}>Contact</Link>
          </nav>

          {/* Auth / Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/profile" className="text-sm font-medium text-stone-700 py-1 px-2 rounded-4xl hover:bg-rose-200 transition-colors">
                  Hi, {user.user_metadata.full_name?.split(' ')[0] || 'User'}
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="p-2 text-stone-600 hover:text-rose-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-full hover:bg-stone-800 transition-colors">Sign Up</Link>
              </div>
            )}

            <button 
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block py-3 text-base font-medium text-stone-600 border-b border-stone-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block py-3 text-base font-medium text-stone-600 border-b border-stone-50" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/blog" className="block py-3 text-base font-medium text-stone-600 border-b border-stone-50" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/guide" className="block py-3 text-base font-medium text-stone-600 border-b border-stone-50" onClick={() => setIsOpen(false)}>Skincare Guide</Link>
            <Link to="/contact" className="block py-3 text-base font-medium text-stone-600 border-b border-stone-50" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {user ? (
              <button 
                onClick={() => { signOut(); setIsOpen(false); }}
                className="block w-full text-left py-3 text-base font-medium text-rose-600"
              >
                Sign Out
              </button>
            ) : (
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/login" className="block w-full text-center py-3 border border-stone-200 rounded-lg font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="block w-full text-center py-3 bg-stone-900 text-white rounded-lg font-medium" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
