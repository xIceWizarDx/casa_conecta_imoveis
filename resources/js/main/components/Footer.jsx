import Icon from './AppIcon';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Casa Conecta.');
        window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {/* Brand */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                                    <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Casa Conecta</h3>
                                    <p className="text-sm text-gray-400">Imóveis Premium</p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-300">
                                Mais que uma imobiliária, somos consultores especializados em conectar você ao imóvel dos seus sonhos em Goiânia.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col items-center space-y-4 sm:items-end">
                            <button
                                onClick={handleWhatsAppClick}
                                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-accent px-4 py-3 text-white transition-colors hover:bg-accent/90 sm:w-auto"
                            >
                                <Icon name="MessageCircle" size={20} />
                                <span className="font-medium">WhatsApp</span>
                            </button>
                            <a
                                href="tel:+5562999999999"
                                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary px-4 py-3 text-white transition-colors hover:bg-primary/90 sm:w-auto"
                            >
                                <Icon name="Phone" size={20} />
                                <span className="font-medium">Ligar Agora</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="text-sm text-gray-400">© {currentYear} Casa Conecta Imóveis. Todos os direitos reservados.</div>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <a href="#" className="transition-colors hover:text-white">
                                Política de Privacidade
                            </a>
                            <a href="#" className="transition-colors hover:text-white">
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
