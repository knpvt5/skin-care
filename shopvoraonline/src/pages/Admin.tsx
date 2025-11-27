import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { api } from '../services/api';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'blog' | 'messages'>('product');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    price: '',
    image: '',
    tags: '',
    amazonLink: '',
    description: ''
  });

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    category: '',
    image_url: '',
    read_time: 5,
    tags: ''
  });

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.createProduct({
        name: productForm.name,
        brand: productForm.brand,
        price: productForm.price,
        image: productForm.image,
        tags: productForm.tags.split(',').map(t => t.trim()),
        affiliateLinks: { amazon: productForm.amazonLink },
        description: productForm.description
      });
      setMessage({ type: 'success', text: 'Product created successfully!' });
      setProductForm({ name: '', brand: '', price: '', image: '', tags: '', amazonLink: '', description: '' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to create product.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.createBlogPost({
        title: blogForm.title,
        content: blogForm.content,
        category: blogForm.category,
        image_url: blogForm.image_url,
        read_time: blogForm.read_time,
        tags: blogForm.tags.split(',').map(t => t.trim())
      });
      setMessage({ type: 'success', text: 'Blog post created successfully!' });
      setBlogForm({ title: '', content: '', category: '', image_url: '', read_time: 5, tags: '' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to create blog post.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Admin" description="Admin Dashboard" />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('product')}
            className={`pb-4 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'product' 
                ? 'border-b-2 border-stone-900 text-stone-900' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`pb-4 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'blog' 
                ? 'border-b-2 border-stone-900 text-stone-900' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Add Blog Post
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-4 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'messages' 
                ? 'border-b-2 border-stone-900 text-stone-900' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Messages
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Product Form */}
        {activeTab === 'product' && (
          <form onSubmit={handleProductSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  value={productForm.brand}
                  onChange={e => setProductForm({...productForm, brand: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={e => setProductForm({...productForm, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="text"
                  value={productForm.price}
                  onChange={e => setProductForm({...productForm, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="$24.99"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={e => setProductForm({...productForm, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={e => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg h-24"
                  placeholder="Product description..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Amazon Link</label>
                <input
                  type="url"
                  value={productForm.amazonLink}
                  onChange={e => setProductForm({...productForm, amazonLink: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={productForm.tags}
                  onChange={e => setProductForm({...productForm, tags: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="hydration, serum, dry skin"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Create Product'}
            </button>
          </form>
        )}

        {/* Blog Form */}
        {activeTab === 'blog' && (
          <form onSubmit={handleBlogSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={blogForm.title}
                onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={blogForm.category}
                  onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Read Time (min)</label>
                <input
                  type="number"
                  value={blogForm.read_time}
                  onChange={e => setBlogForm({...blogForm, read_time: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={blogForm.image_url}
                onChange={e => setBlogForm({...blogForm, image_url: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content (HTML)</label>
              <textarea
                value={blogForm.content}
                onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg h-48 font-mono text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={blogForm.tags}
                onChange={e => setBlogForm({...blogForm, tags: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Create Blog Post'}
            </button>
          </form>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <MessagesTab />
        )}
      </div>
    </Layout>
  );
};

const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await api.getContactMessages();
        setMessages(data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-stone-500 text-center py-12">No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-stone-900">{msg.subject}</h3>
                <p className="text-sm text-stone-500">From: <span className="font-medium text-stone-700">{msg.name}</span> ({msg.email})</p>
              </div>
              <span className="text-xs text-stone-400">{new Date(msg.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-stone-600 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
