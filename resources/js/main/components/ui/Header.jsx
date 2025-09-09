import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Início',
      path: '/',
      icon: 'Home'
    },
    {
      name: 'Sobre Nós',
      path: '/about-brand-story-credentials',
      icon: 'Users'
    },
    {
      name: 'FAQ',
      path: '/faq-comprehensive-buyer-education',
      icon: 'HelpCircle'
    }
  ];

  // Adiciona a aba de upload de imagens que aponta para a rota do painel
  const items = [
    ...navigationItems,
    { name: 'Painel', path: '/painel', icon: 'Image', external: true },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os imóveis disponíveis.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-subtle' : 'bg-white'
    }`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-text-primary">Casa Conecta</h1>
              <p className="text-xs text-text-secondary font-medium">Imóveis Premium</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {items?.map((item) => (
              item?.external ? (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-text-secondary hover:text-primary hover:bg-primary/5`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </a>
              ) : (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.open('tel:+5562999999999')}
              className="text-text-secondary border-border hover:border-primary hover:text-primary"
            >
              (62) 99999-9999
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleWhatsAppClick}
              className="bg-accent hover:bg-accent/90"
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {items?.map((item) => (
                item?.external ? (
                  <a
                    key={item?.path}
                    href={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 text-text-secondary hover:text-primary hover:bg-primary/5`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                )
              ))}
              
              <div className="pt-4 border-t border-border space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => {
                    window.open('tel:+5562999999999');
                    setIsMobileMenuOpen(false);
                  }}
                  fullWidth
                  className="justify-start text-text-secondary border-border hover:border-primary hover:text-primary"
                >
                  (62) 99999-9999
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => {
                    handleWhatsAppClick();
                    setIsMobileMenuOpen(false);
                  }}
                  fullWidth
                  className="justify-start bg-accent hover:bg-accent/90"
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
