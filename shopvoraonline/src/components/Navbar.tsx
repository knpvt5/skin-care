import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-stone-800 tracking-tighter">
              ShopVora<span className="text-rose-400">.</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rose-500 ${isActive ? 'text-rose-500' : 'text-stone-600'}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rose-500 ${isActive ? 'text-rose-500' : 'text-stone-600'}`}>
              About
            </NavLink>
            
            {/* Blog Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-sm font-medium text-stone-600 hover:text-rose-500 focus:outline-none"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Blog <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {/* Dropdown Content */}
              <div 
                className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 border border-stone-100 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link to="/blog?category=Acne Care" className="block px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600">Acne Care</Link>
                <Link to="/blog?category=Anti-Aging" className="block px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600">Anti-Aging</Link>
                <Link to="/blog?category=K-Beauty" className="block px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600">K-Beauty</Link>
                <Link to="/blog?category=Routines" className="block px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600">Routines</Link>
                <Link to="/blog" className="block px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50">All Posts</Link>
              </div>
            </div>

            <NavLink to="/guide" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rose-500 ${isActive ? 'text-rose-500' : 'text-stone-600'}`}>
              Skincare Guide
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-rose-500 ${isActive ? 'text-rose-500' : 'text-stone-600'}`}>
              Contact
            </NavLink>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-stone-500 hover:text-rose-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-stone-500 hover:text-rose-500 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-stone-600 hover:text-rose-500 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-rose-500 hover:bg-rose-50">Home</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-rose-500 hover:bg-rose-50">About</NavLink>
            <NavLink to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-rose-500 hover:bg-rose-50">Blog</NavLink>
            <NavLink to="/guide" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-rose-500 hover:bg-rose-50">Skincare Guide</NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-rose-500 hover:bg-rose-50">Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
