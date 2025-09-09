import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

// Standalone header for Inertia pages (no react-router dependency)
export default function HeaderStandalone() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    { name: 'Início', path: '/', icon: 'Home' },
    { name: 'Sobre Nós', path: '/about-brand-story-credentials', icon: 'Users' },
    { name: 'FAQ', path: '/faq-comprehensive-buyer-education', icon: 'HelpCircle' },
    { name: 'Painel', path: '/painel', icon: 'Image', external: true },
  ];

  const isActivePath = (path) => window.location?.pathname === path;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os imóveis disponíveis.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-subtle' : 'bg-white'
    }`}>
      <div className="w-full">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-text-primary">Casa Conecta</h1>
              <p className="text-xs font-medium text-text-secondary">Imóveis Premium</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            {items.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center space-x-4 lg:flex">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.open('tel:+5562999999999')}
              className="border-border text-text-secondary hover:border-primary hover:text-primary"
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
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="rounded-md p-2 text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary lg:hidden"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-border bg-white lg:hidden">
            <div className="space-y-3 px-4 py-4">
              {items.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 rounded-md px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.name}</span>
                </a>
              ))}

              <div className="space-y-3 border-t border-border pt-4">
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
                  className="justify-start border-border text-text-secondary hover:border-primary hover:text-primary"
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
}

