import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../data/data';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="flex flex-col h-full group">
      <Link to={`/blog/${encodeURIComponent(post.title)}`} className="block overflow-hidden rounded-2xl mb-4 aspect-4/3">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
          <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-full font-medium">{post.category}</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-stone-900 mb-2 leading-tight group-hover:text-rose-600 transition-colors">
          <Link to={`/blog/${encodeURIComponent(post.title)}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-stone-500 text-sm line-clamp-3 mb-4 grow">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${encodeURIComponent(post.title)}`} 
          className="inline-flex items-center text-sm font-semibold text-stone-900 hover:text-rose-600 transition-colors mt-auto"
        >
          Read Article <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
