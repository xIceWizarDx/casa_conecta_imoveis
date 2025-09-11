import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const quickLinks = [
    { name: 'Início', path: '/homepage-premium-real-estate-consultancy' },
    { name: 'Sobre Nós', path: '/about-brand-story-credentials' },
    { name: 'FAQ', path: '/faq-comprehensive-buyer-education' }
  ];

  const neighborhoods = [
    'Setor Bueno',
    'Jardim Goiás', 
    'Alto da Glória',
    'Setor Marista',
    'Setor Oeste',
    'Park Lozandes'
  ];

  const services = [
    'Compra de Imóveis',
    'Venda de Imóveis',
    'Consultoria Imobiliária',
    'Avaliação de Imóveis',
    'Financiamento',
    'Documentação'
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Casa Conecta.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  const handleNeighborhoodClick = (neighborhood) => {
    const message = encodeURIComponent(`Olá! Tenho interesse em imóveis no bairro ${neighborhood}. Podem me mostrar as opções disponíveis?`);
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Casa Conecta</h3>
                  <p className="text-sm text-gray-700">Imóveis Premium</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Mais que uma imobiliária, somos consultores especializados em conectar você ao imóvel dos seus sonhos em Goiânia.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm text-gray-600">Goiânia - GO</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <a href="tel:+5562999999999" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    (62) 99999-9999
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <a href="mailto:contato@casaconecta.com.br" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    contato@casaconecta.com.br
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {quickLinks?.map((link) => (
                  <li key={link?.path}>
                    <Link 
                      to={link?.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a 
                    href="#listagem"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    Imóveis
                  </a>
                </li>
              </ul>
              
              <h5 className="text-md font-semibold mt-8 mb-4">Serviços</h5>
              <ul className="space-y-2">
                {services?.map((service) => (
                  <li key={service}>
                    <span className="text-gray-600 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neighborhoods */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Bairros Atendidos</h4>
              <ul className="space-y-3">
                {neighborhoods?.map((neighborhood) => (
                  <li key={neighborhood}>
                    <button
                      onClick={() => handleNeighborhoodClick(neighborhood)}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm text-left"
                    >
                      {neighborhood}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Fale Conosco</h4>
              
              <div className="space-y-4 mb-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Icon name="MessageCircle" size={20} />
                  <span className="font-medium">WhatsApp</span>
                </button>
                
                <a
                  href="tel:+5562999999999"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Icon name="Phone" size={20} />
                  <span className="font-medium">Ligar Agora</span>
                </a>
              </div>

              <div className="mb-6">
                <h5 className="text-md font-semibold mb-3">Horário de Atendimento</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Segunda a Sexta: 8h às 18h</p>
                  <p>Sábado: 8h às 14h</p>
                  <p>WhatsApp: 24h</p>
                </div>
              </div>

              <div>
                <h5 className="text-md font-semibold mb-3">Certificações</h5>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span className="text-sm text-gray-600">CRECI/GO Certificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-700">
              © {currentYear} Casa Conecta Imóveis. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-700">
              <a href="#" className="hover:text-gray-900 transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Cookies
              </a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              CRECI/GO 12.345 - Responsável Técnico: Carlos Eduardo Silva
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Endereço: Rua Exemplo, 123 - Setor Bueno, Goiânia - GO, 74000-000
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
