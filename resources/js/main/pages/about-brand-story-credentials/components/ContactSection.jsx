import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // WhatsApp integration with form data
    const message = encodeURIComponent(
      `Olá! Vim através do site Casa Conecta.\n\n` +
      `Nome: ${formData?.name}\n` +
      `Email: ${formData?.email}\n` +
      `Telefone: ${formData?.phone}\n` +
      `Interesse: ${formData?.interest}\n` +
      `Mensagem: ${formData?.message}`
    );
    
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta para conhecer melhor os serviços da Casa Conecta.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  const contactMethods = [
    {
      icon: "MessageCircle",
      title: "WhatsApp Preferencial",
      description: "Atendimento rápido e personalizado",
      action: "Iniciar Conversa",
      highlight: true,
      onClick: handleWhatsAppClick
    },
    {
      icon: "Phone",
      title: "Ligação Direta",
      description: "(62) 99999-9999",
      action: "Ligar Agora",
      highlight: false,
      onClick: () => window.open('tel:+5562999999999')
    },
    {
      icon: "Mail",
      title: "E-mail Corporativo",
      description: "contato@casaconecta.com.br",
      action: "Enviar E-mail",
      highlight: false,
      onClick: () => window.open('mailto:contato@casaconecta.com.br')
    }
  ];

  const officeInfo = {
    address: "Rua T-25, 123 - Setor Bueno",
    city: "Goiânia - GO",
    cep: "74210-030",
    hours: "Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h",
    whatsappHours: "WhatsApp: 24/7"
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Fale com Nossos Especialistas
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel ideal. 
            Escolha a forma de contato que preferir e receba atendimento personalizado
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Canais de Atendimento
              </h3>
              <div className="space-y-4">
                {contactMethods?.map((method, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      method?.highlight
                        ? 'border-primary bg-primary/5 hover:bg-primary/10'
                        : 'border-border bg-gray-50 hover:border-primary/50'
                    }`}
                    onClick={method?.onClick}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        method?.highlight ? 'bg-primary/20' : 'bg-white'
                      }`}>
                        <Icon 
                          name={method?.icon} 
                          size={24} 
                          color={method?.highlight ? "var(--color-primary)" : "var(--color-text-secondary)"} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-1">
                          {method?.title}
                        </h4>
                        <p className="text-sm text-text-secondary mb-2">
                          {method?.description}
                        </p>
                        <span className={`text-sm font-medium ${
                          method?.highlight ? 'text-primary' : 'text-text-secondary'
                        }`}>
                          {method?.action} →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="MapPin" size={20} className="mr-2 text-primary" />
                Nosso Escritório
              </h4>
              <div className="space-y-3 text-sm text-text-secondary">
                <div>{officeInfo?.address}</div>
                <div>{officeInfo?.city}</div>
                <div>CEP: {officeInfo?.cep}</div>
                <div className="pt-3 border-t border-border">
                  <div className="whitespace-pre-line">{officeInfo?.hours}</div>
                  <div className="text-primary font-medium mt-2">{officeInfo?.whatsappHours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Solicite uma Consulta
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nome Completo"
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="E-mail"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                  <Input
                    label="Telefone"
                    type="tel"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleInputChange}
                    placeholder="(62) 99999-9999"
                    required
                  />
                </div>

                <Input
                  label="Interesse"
                  type="text"
                  name="interest"
                  value={formData?.interest}
                  onChange={handleInputChange}
                  placeholder="Ex: Casa 3 quartos no Jardim Goiás"
                />

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    value={formData?.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Conte-nos mais sobre o que você está procurando..."
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
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-text-secondary">
                    Ao enviar, você será redirecionado para o WhatsApp para finalizar o contato
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Precisa de Atendimento Imediato?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Nossa equipe está disponível via WhatsApp 24/7 para responder suas dúvidas 
              e agendar visitas. Resposta garantida em até 5 minutos!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={handleWhatsAppClick}
                className="bg-accent hover:bg-accent/90"
              >
                WhatsApp Agora
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => {
                  const message = encodeURIComponent('Olá! Gostaria de agendar uma visita para conhecer imóveis disponíveis.');
                  window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
                }}
              >
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;