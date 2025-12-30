import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '918595813226';
  const defaultMessage = "Hi! I'm interested in your skincare products.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 bg-[#25D366] hover:bg-[#20BD5A]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Tooltip */}
      <div className="fixed bottom-16 left-4 md:bottom-20 md:left-6 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
          Chat on WhatsApp
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;
