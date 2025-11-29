import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords,
  image, 
  url,
  author 
}) => {
  const siteTitle = 'ShopVoraOnline | Skincare & Beauty';
  const defaultDescription = 'Explore expert skincare advice, beauty trends, product reviews, and comprehensive guides on skincare routines, anti-aging, K-beauty, and more at ShopVoraOnline.';
  const defaultKeywords = 'ShopVoraOnline, skincare, beauty, product reviews, skincare routine, anti-aging, K-beauty, acne care, skin care tips, beauty blog, cosmetics';
  const defaultImage = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200';
  const siteUrl = 'https://shopvoraonline.com';
  const defaultAuthor = 'ShopVoraOnline';

  const fullTitle = `${title} | ${siteTitle}`;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageImage = image || defaultImage;
  const pageUrl = url || siteUrl;
  const pageAuthor = author || defaultAuthor;

  useEffect(() => {
    // Set title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) element.setAttribute('property', prop);
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element: HTMLLinkElement | null = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Primary Meta Tags
    updateMetaTag('meta[name="title"]', 'content', fullTitle);
    updateMetaTag('meta[name="description"]', 'content', pageDescription);
    updateMetaTag('meta[name="keywords"]', 'content', pageKeywords);
    updateMetaTag('meta[name="author"]', 'content', pageAuthor);
    updateMetaTag('meta[name="robots"]', 'content', 'index, follow');
    updateMetaTag('meta[name="googlebot"]', 'content', 'index, follow');

    // Open Graph Meta Tags
    updateMetaTag('meta[property="og:type"]', 'content', 'website');
    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'content', pageDescription);
    updateMetaTag('meta[property="og:image"]', 'content', pageImage);
    updateMetaTag('meta[property="og:url"]', 'content', pageUrl);
    updateMetaTag('meta[property="og:site_name"]', 'content', 'ShopVoraOnline');

    // Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', pageDescription);
    updateMetaTag('meta[name="twitter:image"]', 'content', pageImage);

    // Canonical URL
    updateLinkTag('canonical', pageUrl);

    // Additional Meta Tags
    updateMetaTag('meta[name="mobile-web-app-capable"]', 'content', 'yes');
    updateMetaTag('meta[name="apple-mobile-web-app-capable"]', 'content', 'yes');
    updateMetaTag('meta[name="apple-mobile-web-app-status-bar-style"]', 'content', 'default');
    updateMetaTag('meta[name="theme-color"]', 'content', '#ffffff');
  }, [fullTitle, pageDescription, pageKeywords, pageImage, pageUrl, pageAuthor]);

  return null;
};

export default SEO;
