import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-stone-800">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
