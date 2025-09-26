import { useEffect, useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import SettingsModal from '@/components/modals/SettingsModal';
import { openWhatsApp, openPhone, formatPhoneDisplay, useContactInfo } from '@/lib/contact';
import { usePage } from '@inertiajs/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';

// Standalone header for Inertia pages (no react-router dependency)
export default function HeaderStandalone() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const page = usePage();
    const auth = page?.props?.auth;
    const isLogged = !!auth?.user;
    const getInitials = useInitials();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const contact = useContactInfo();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems = [
        { name: 'Início', path: '/', icon: 'Home' },
        { name: 'Sobre Nós', path: '/about-brand-story-credentials', icon: 'Users' },
        { name: 'FAQ', path: '/faq-comprehensive-buyer-education', icon: 'HelpCircle' },
    ];

    const items = isLogged
        ? [...navigationItems, { name: 'Painel', path: '/painel', icon: 'Image', external: true }]
        : navigationItems;

    const isActivePath = (path) => (typeof window !== 'undefined' ? window.location?.pathname === path : false);

    const openWhatsAppHeader = () => {
        const message = 'Olá! Gostaria de saber mais sobre os imóveis disponíveis.';
        openWhatsApp(message, { contact });
    };

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
                isScrolled ? 'shadow-subtle bg-white/95 backdrop-blur-sm' : 'bg-white'
            }`}
        >
            <div className="container-responsive">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
                        <img src="/logo.png" alt="Casa Conecta Imóveis" className="h-10 w-auto" />
                        <div className="hidden sm:block">
                            <h1 className="text-text-primary text-xl font-bold">Casa Conecta Imóveis</h1>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-8 lg:flex">
                        {items
                            ?.filter((i) => i?.name !== 'Painel' || isLogged)
                            .map((item) =>
                                item?.external ? (
                                    <a
                                        key={item?.path}
                                        href={item?.path}
                                        className={`text-text-secondary flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary`}
                                    >
                                        <Icon name={item?.icon} size={18} />
                                        <span>{item?.name}</span>
                                    </a>
                                ) : (
                                    <a
                                        key={item?.path}
                                        href={item?.path}
                                        className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                                            isActivePath(item?.path)
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                                        }`}
                                    >
                                        <Icon name={item?.icon} size={18} />
                                        <span>{item?.name}</span>
                                    </a>
                                ),
                            )}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden items-center space-x-4 lg:flex">
                        <Button
                            variant="outline"
                            size="sm"
                            iconName="Phone"
                            iconPosition="left"
                            onClick={() => openPhone({ contact })}
                            className="text-text-secondary border-border hover:border-primary hover:text-primary"
                        >
                            {formatPhoneDisplay(contact)}
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="MessageCircle"
                            iconPosition="left"
                            onClick={openWhatsAppHeader}
                            className="bg-accent hover:bg-accent/90"
                        >
                            WhatsApp
                        </Button>

                        {isLogged && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="size-10 rounded-full p-1 hover:opacity-90">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user?.avatar} alt={auth.user?.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user?.name || '')}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    {auth?.user && <UserMenuContent user={auth.user} onOpenSettings={() => setSettingsOpen(true)} />}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className="text-text-secondary rounded-md p-2 transition-colors hover:bg-primary/5 hover:text-primary lg:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="border-border bg-white lg:hidden">
                        <div className="container-responsive">
                            <div className="space-y-3 py-4">
                                {items
                                    ?.filter((i) => i?.name !== 'Painel' || isLogged)
                                    .map((item) =>
                                        item?.external ? (
                                            <a
                                                key={item?.path}
                                                href={item?.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`text-text-secondary flex items-center space-x-3 rounded-md px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary`}
                                            >
                                                <Icon name={item?.icon} size={20} />
                                                <span>{item?.name}</span>
                                            </a>
                                        ) : (
                                            <a
                                                key={item?.path}
                                                href={item?.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex items-center space-x-3 rounded-md px-3 py-3 text-sm font-medium transition-all duration-200 ${
                                                    isActivePath(item?.path)
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                                                }`}
                                            >
                                                <Icon name={item?.icon} size={20} />
                                                <span>{item?.name}</span>
                                            </a>
                                        ),
                                    )}

                                <div className="space-y-3 border-t border-border pt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        iconName="Phone"
                                        iconPosition="left"
                                        onClick={() => {
                                            openPhone({ contact });
                                            setIsMobileMenuOpen(false);
                                        }}
                                        fullWidth
                                        className="text-text-secondary justify-start border-border hover:border-primary hover:text-primary"
                                    >
                                        {formatPhoneDisplay(contact)}
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        iconName="MessageCircle"
                                        iconPosition="left"
                                        onClick={() => {
                                            openWhatsAppHeader();
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
                    </div>
                )}
            </div>
        </header>
    );
}
