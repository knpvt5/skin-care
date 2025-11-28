import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-stone-600 mb-8">
            Oops! The page you are looking for seems to have wandered off. It might have been moved or deleted.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
