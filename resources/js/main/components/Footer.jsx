import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Início', path: '/homepage-premium-real-estate-consultancy' },
    { name: 'Sobre Nós', path: '/about-brand-story-credentials' },
    { name: 'FAQ', path: '/faq-comprehensive-buyer-education' },
    { name: 'Imóveis', path: '#listagem', anchor: true }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Casa Conecta.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Casa Conecta</h3>
                  <p className="text-sm text-gray-400">Imóveis Premium</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mais que uma imobiliária, somos consultores especializados em conectar você ao imóvel dos seus sonhos em Goiânia.
              </p>
            </div>

            {/* Links */}
            <div className="sm:text-center">
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    {link.anchor ? (
                      <a href={link.path} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.path} className="text-gray-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center space-y-4 sm:items-end">
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Icon name="MessageCircle" size={20} />
                <span className="font-medium">WhatsApp</span>
              </button>
              <a
                href="tel:+5562999999999"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Icon name="Phone" size={20} />
                <span className="font-medium">Ligar Agora</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Casa Conecta Imóveis. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
