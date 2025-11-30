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

  // React 19 native metadata support - these tags are automatically hoisted to <head>
  return (
    <>
      <title>{fullTitle}</title>
      
      {/* Primary Meta Tags */}
      <meta name="title" content={fullTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={pageAuthor} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="ShopVoraOnline" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Additional Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
};

export default SEO;
