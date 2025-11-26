import React from 'react';
import { Mail, MapPin, Instagram } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <Layout>
      <SEO title="Contact Us" description="Get in touch with the ShopVoraOnline team." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-6">Get in Touch</h1>
            <p className="text-lg text-stone-600 mb-8">
              Have a question about a product? Want to suggest a topic for the blog? Or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 rounded-full text-rose-500">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Email Us</h3>
                  <p className="text-stone-600">hello@shopvoraonline.com</p>
                  <p className="text-stone-600">press@shopvoraonline.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 rounded-full text-rose-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Location</h3>
                  <p className="text-stone-600">Los Angeles, CA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 rounded-full text-rose-500">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Social</h3>
                  <p className="text-stone-600">@ShopVoraOnline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1">Subject</label>
                <select 
                  id="subject" 
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                >
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Contact;
