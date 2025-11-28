import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, RefreshCw, Edit } from 'lucide-react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { api } from '../services/api';
import type { Product, BlogPost } from '../types/types';
import TipTapEditor from '../components/TipTapEditor';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'blog' | 'messages' | 'users'>('product');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Content Management State
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [fetchingContent, setFetchingContent] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setFetchingContent(true);
    try {
      const [productsData, blogsData] = await Promise.all([
        api.getProducts(),
        api.getBlogPosts()
      ]);
      setProducts(productsData);
      setBlogs(blogsData);
    } catch (err) {
      console.error('Error fetching content:', err);
    } finally {
      setFetchingContent(false);
    }
  };

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

  // Edit Mode State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const productData = {
        name: productForm.name,
        brand: productForm.brand,
        price: productForm.price,
        image: productForm.image,
        tags: productForm.tags.split(',').map(t => t.trim()),
        affiliateLinks: { amazon: productForm.amazonLink },
        description: productForm.description
      };

      if (editingProductId) {
        await api.updateProduct(editingProductId, productData);
        setMessage({ type: 'success', text: 'Product updated successfully!' });
        setEditingProductId(null);
      } else {
        await api.createProduct(productData);
        setMessage({ type: 'success', text: 'Product created successfully!' });
      }
      
      setProductForm({ name: '', brand: '', price: '', image: '', tags: '', amazonLink: '', description: '' });
      fetchContent(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: editingProductId ? 'Failed to update product.' : 'Failed to create product.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const blogData = {
        title: blogForm.title,
        content: blogForm.content,
        category: blogForm.category,
        image_url: blogForm.image_url,
        read_time: blogForm.read_time,
        tags: blogForm.tags.split(',').map(t => t.trim())
      };

      if (editingBlogId) {
        await api.updateBlogPost(editingBlogId, blogData);
        setMessage({ type: 'success', text: 'Blog post updated successfully!' });
        setEditingBlogId(null);
      } else {
        // Check for duplicate title only when creating
        const exists = await api.checkBlogPostExists(blogForm.title);
        if (exists) {
          setMessage({ type: 'error', text: 'A blog post with this title already exists. Please choose a different title.' });
          setLoading(false);
          return;
        }
        await api.createBlogPost(blogData);
        setMessage({ type: 'success', text: 'Blog post created successfully!' });
      }
      
      setBlogForm({ title: '', content: '', category: '', image_url: '', read_time: 5, tags: '' });
      fetchContent(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: editingBlogId ? 'Failed to update blog post.' : 'Failed to create blog post.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      setMessage({ type: 'success', text: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to delete product' });
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await api.deleteBlogPost(id);
      setBlogs(blogs.filter(b => b.id !== id));
      setMessage({ type: 'success', text: 'Blog post deleted successfully' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to delete blog post' });
    }
  };

  const handleEditProduct = (product: Product) => {
    setActiveTab('product');
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      tags: product.tags.join(', '),
      amazonLink: product.affiliateLinks?.amazon || '',
      description: product.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setActiveTab('blog');
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      image_url: blog.image,
      read_time: parseInt(blog.readTime.replace(' min read', '')),
      tags: blog.tags.join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'users' 
                ? 'border-b-2 border-stone-900 text-stone-900' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            Users & Subscribers
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
            <div className="flex gap-3">
              {editingProductId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm({ name: '', brand: '', price: '', image: '', tags: '', amazonLink: '', description: '' });
                  }}
                  className="flex-1 py-3 bg-stone-200 text-stone-800 font-bold rounded-lg hover:bg-stone-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${editingProductId ? 'flex-1' : 'w-full'} py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center cursor-pointer`}
              >
                {loading ? <Loader2 className="animate-spin" /> : editingProductId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
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
                <select
                  value={blogForm.category}
                  onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Acne Care">Acne Care</option>
                  <option value="Anti-Aging">Anti-Aging</option>
                  <option value="K-Beauty">K-Beauty</option>
                  <option value="Routines">Routines</option>
                  <option value="Ingredient Explanations">Ingredient Explanations</option>
                </select>
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
              <label className="block text-sm font-medium mb-2">Content</label>
              <TipTapEditor
                content={blogForm.content}
                onChange={(content) => setBlogForm({...blogForm, content})}
              />
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
            <div className="flex gap-3">
              {editingBlogId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlogId(null);
                    setBlogForm({ title: '', content: '', category: '', image_url: '', read_time: 5, tags: '' });
                  }}
                  className="flex-1 py-3 bg-stone-200 text-stone-800 font-bold rounded-lg hover:bg-stone-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${editingBlogId ? 'flex-1' : 'w-full'} py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-70 flex justify-center cursor-pointer`}
              >
                {loading ? <Loader2 className="animate-spin" /> : editingBlogId ? 'Update Blog Post' : 'Create Blog Post'}
              </button>
            </div>
          </form>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <MessagesTab />
        )}

        {/* Users & Subscribers Tab */}
        {activeTab === 'users' && (
          <UsersSubscribersTab />
        )}

        {/* Content Management Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Manage Content</h2>
            <button 
              onClick={fetchContent} 
              className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
              title="Refresh Content"
            >
              <RefreshCw className={`w-5 h-5 ${fetchingContent ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Products List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Products ({products.length})</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {products.length === 0 ? (
                  <p className="text-stone-500 text-sm">No products found.</p>
                ) : (
                  products.map(product => (
                    <div key={product.id} className="flex justify-between items-start p-3 bg-stone-50 rounded-lg group">
                      <div className="flex-1 mr-4">
                        <div className="font-medium text-stone-800">{product.name}</div>
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-stone-200 text-stone-600 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-stone-400 hover:text-blue-500 transition-colors p-1 cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Blogs List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Blog Posts ({blogs.length})</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {blogs.length === 0 ? (
                  <p className="text-stone-500 text-sm">No blog posts found.</p>
                ) : (
                  blogs.map(blog => (
                    <div key={blog.id} className="flex justify-between items-start p-3 bg-stone-50 rounded-lg group">
                      <div className="flex-1 mr-4">
                        <div className="font-medium text-stone-800">{blog.title}</div>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {blog.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-stone-200 text-stone-600 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="text-stone-400 hover:text-blue-500 transition-colors p-1 cursor-pointer"
                          title="Edit Blog Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Delete Blog Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.deleteContactMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete message');
    }
  };

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
              <div className="flex-1">
                <h3 className="font-bold text-lg text-stone-900">{msg.subject}</h3>
                <p className="text-sm text-stone-500">From: <span className="font-medium text-stone-700">{msg.name}</span> ({msg.email})</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400">{new Date(msg.created_at).toLocaleDateString()}</span>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                  title="Delete Message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-stone-600 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

const UsersSubscribersTab: React.FC = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subscribersData, usersData] = await Promise.all([
          api.getSubscribers(),
          api.getUsers()
        ]);
        setSubscribers(subscribersData || []);
        setUsers(usersData || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Newsletter Subscribers */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Newsletter Subscribers ({subscribers.length})</h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {subscribers.length === 0 ? (
            <p className="text-stone-500 text-sm">No subscribers found.</p>
          ) : (
            subscribers.map((subscriber) => (
              <div key={subscriber.id} className="p-3 bg-stone-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{subscriber.email}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                        {subscriber.source}
                      </span>
                      <span className="text-xs text-stone-500">
                        {new Date(subscriber.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Registered Users */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
        <h3 className="text-lg font-bold text-stone-900 mb-4">Registered Users ({users.length})</h3>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {users.length === 0 ? (
            <p className="text-stone-500 text-sm">No registered users found.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="p-3 bg-stone-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{user.email}</p>
                    {user.full_name && (
                      <p className="text-sm text-stone-600">{user.full_name}</p>
                    )}
                    <span className="text-xs text-stone-500">
                      Joined: {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
