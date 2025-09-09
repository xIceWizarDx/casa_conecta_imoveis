import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConsultationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // WhatsApp integration with form data
    const message = encodeURIComponent(
      `Olá! Gostaria de agendar uma consulta.\n\nNome: ${formData?.name}\nEmail: ${formData?.email}\nTelefone: ${formData?.phone}\nDúvida: ${formData?.question}`
    );
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', question: '' });
  };

  const handleWhatsAppDirect = () => {
    const message = encodeURIComponent('Olá! Não encontrei a resposta para minha dúvida no FAQ. Podem me ajudar?');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <section id="consultation-section" className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Icon name="HelpCircle" size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Não encontrou sua resposta?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Nossa expertise vai além das perguntas padrão. Cada família tem necessidades únicas, 
            e estamos aqui para oferecer orientação personalizada sobre sua situação específica.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Agende uma Consulta Gratuita
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nome completo"
                type="text"
                placeholder="Seu nome completo"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                required
              />
              
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                required
              />
              
              <Input
                label="Telefone/WhatsApp"
                type="tel"
                placeholder="(62) 99999-9999"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Sua dúvida específica
                </label>
                <textarea
                  placeholder="Descreva sua situação ou dúvida específica..."
                  value={formData?.question}
                  onChange={(e) => handleInputChange('question', e?.target?.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                fullWidth
                className="bg-primary hover:bg-secondary"
              >
                {isSubmitting ? 'Enviando...' : 'Agendar Consulta Gratuita'}
              </Button>
            </form>
          </div>

          {/* Quick Contact Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={24} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">
                    WhatsApp Imediato
                  </h4>
                  <p className="text-text-secondary mb-4">
                    Resposta rápida para dúvidas urgentes. Nosso time está online de segunda a sábado.
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={handleWhatsAppDirect}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Falar Agora
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">
                    Ligação Direta
                  </h4>
                  <p className="text-text-secondary mb-4">
                    Prefere falar por telefone? Ligue diretamente para nossa equipe especializada.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => window.open('tel:+5562999999999')}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    (62) 99999-9999
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="Clock" size={20} className="text-white" />
                <h4 className="text-lg font-semibold">Horário de Atendimento</h4>
              </div>
              <div className="space-y-1 text-sm opacity-90">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 14h</p>
                <p>WhatsApp: Resposta em até 2 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;