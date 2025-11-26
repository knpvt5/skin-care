import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <Layout>
      <SEO title="About Us" description="Learn about the mission behind ShopVoraOnline." />
      
      <div className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6">Our Story</h1>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="prose prose-stone prose-lg mx-auto">
            <p className="lead text-xl text-stone-600 mb-8">
              ShopVoraOnline was born from a simple frustration: skincare is confusing. With thousands of products launching every year, how do you know what actually works?
            </p>
            
            <p className="mb-6">
              We believe that skincare shouldn't be a mystery. It should be accessible, understandable, and—most importantly—fun. Our mission is to democratize skincare education, breaking down complex ingredients into simple terms and providing honest, unbiased reviews.
            </p>
            
            <div className="my-12 relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=1200" 
                alt="Team working" 
                className="w-full h-auto"
              />
            </div>

            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-12 mb-6">The Mission</h2>
            <p className="mb-6">
              We're here to help you build a routine that fits your life, your budget, and your skin goals. Whether you're a 10-step K-beauty enthusiast or a "wash and go" minimalist, there's a place for you here.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-12 mb-6">Meet the Founder</h2>
            <div className="flex flex-col sm:flex-row gap-8 items-center mb-12">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300" 
                alt="Founder" 
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-stone-900">Sarah Vora</h3>
                <p className="text-rose-500 font-medium mb-2">Founder & Editor-in-Chief</p>
                <p className="text-stone-600 text-sm">
                  A skincare enthusiast turned educator, Sarah started ShopVoraOnline to share her journey of healing her own acne-prone skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
