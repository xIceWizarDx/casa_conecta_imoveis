import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FAQItem = ({ question, answer, category, hasWhatsAppCTA = false, hasConsultationCTA = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Tenho uma dúvida sobre: ${question}`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  const handleConsultationClick = () => {
    // Scroll to consultation section or open modal
    const consultationSection = document.getElementById('consultation-section');
    if (consultationSection) {
      consultationSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/30 rounded-xl transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-1">{question}</h3>
          <span className="text-sm text-text-secondary font-medium">{category}</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary ml-4 flex-shrink-0" 
        />
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border/50">
          <div className="pt-4">
            <div className="text-text-primary leading-relaxed whitespace-pre-line">
              {answer}
            </div>
            
            {(hasWhatsAppCTA || hasConsultationCTA) && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border/30">
                {hasWhatsAppCTA && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={handleWhatsAppClick}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Falar no WhatsApp
                  </Button>
                )}
                {hasConsultationCTA && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={handleConsultationClick}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Agendar Consulta
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;