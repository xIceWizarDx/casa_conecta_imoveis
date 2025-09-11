import { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const WhatsAppFloat = () => {
    const [isVisible, setIsVisible] = useState(true);

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
        const message = encodeURIComponent(
            'Olá! Vim do site da Casa Conecta e gostaria de saber mais sobre os imóveis disponíveis. Podem me ajudar?',
        );
        window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    };

    if (!isVisible) return null;

    return (
        <div className="whatsapp-float">
            <button
                onClick={handleWhatsAppClick}
                className="group relative animate-[float_4s_ease-in-out_infinite] rounded-full border-2 border-accent bg-transparent p-4 text-accent shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
                aria-label="Falar no WhatsApp"
            >
                {/* WhatsApp Icon */}
                <Icon name="MessageCircle" size={28} color="#25D366" />

                {/* Tooltip */}
                <div className="pointer-events-none absolute top-1/2 right-full mr-4 -translate-y-1/2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Fale Conosco - Resposta Rápida
                    <div className="absolute top-1/2 left-full -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
                </div>
            </button>

            {/* Message Preview */}
            <div className="pointer-events-none absolute right-0 bottom-full mb-4 max-w-xs rounded-lg bg-white p-3 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-start space-x-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                        <Icon name="User" size={16} color="white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 text-xs font-medium text-gray-900">Casa Conecta</div>
                        <div className="text-xs text-gray-600">Olá! Como posso ajudar você a encontrar seu imóvel ideal? 😊</div>
                        <div className="mt-1 text-xs text-gray-400">Resposta em até 5 minutos</div>
                    </div>
                </div>
                <div className="absolute right-6 bottom-0 h-2 w-2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-200 bg-white" />
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
        </div>
    );
};

export default WhatsAppFloat;
