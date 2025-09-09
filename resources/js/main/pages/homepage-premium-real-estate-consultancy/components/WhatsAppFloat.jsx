import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Animate the button periodically to draw attention
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Hide/show based on scroll position
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Vim do site da Casa Conecta e gostaria de saber mais sobre os imóveis disponíveis. Podem me ajudar?');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className={`whatsapp-float ${isAnimating ? 'animate-bounce' : ''}`}>
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-accent hover:bg-accent/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Falar no WhatsApp"
      >
        {/* WhatsApp Icon */}
        <Icon name="MessageCircle" size={28} color="white" />
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">1</span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Fale Conosco - Resposta Rápida
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
      </button>
      
      {/* Message Preview */}
      <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-3 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="User" size={16} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-900 mb-1">
              Casa Conecta
            </div>
            <div className="text-xs text-gray-600">
              Olá! Como posso ajudar você a encontrar seu imóvel ideal? 😊
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Resposta em até 5 minutos
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200" />
      </div>
    </div>
  );
};

export default WhatsAppFloat;