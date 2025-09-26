import { useEffect, useMemo, useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import SettingsModal from '@/components/modals/SettingsModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { formatPhoneDisplay, openPhone, openWhatsApp, useContactInfo } from '@/lib/contact';

const DEFAULT_NAVIGATION = [
    { name: 'Início', path: '/', icon: 'Home' },
    { name: 'Sobre Nós', path: '/about-brand-story-credentials', icon: 'Users' },
    { name: 'FAQ', path: '/faq-comprehensive-buyer-education', icon: 'HelpCircle' },
];

const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de saber mais sobre os imóveis disponíveis.';

export default function HeaderBase({
    LinkComponent,
    isActivePath,
    isLogged,
    authUser,
    navigationItems = DEFAULT_NAVIGATION,
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const contact = useContactInfo();
    const getInitials = useInitials();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const items = useMemo(() => {
        if (!isLogged) return navigationItems;
        const hasPanel = navigationItems.some((item) => item.name === 'Painel');
        if (hasPanel) return navigationItems;
        return [...navigationItems, { name: 'Painel', path: '/painel', icon: 'Image', external: true }];
    }, [isLogged, navigationItems]);

    const handleOpenPhone = () => {
        void openPhone({ contact });
    };

    const handleOpenWhatsApp = () => {
        void openWhatsApp(DEFAULT_WHATSAPP_MESSAGE, { contact });
    };

    const InternalLink = LinkComponent;

    const renderNavItem = (item, onClick) => {
        if (item.external) {
            return (
                <a
                    key={item.path}
                    href={item.path}
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                        isActivePath(item.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                    }`}
                    onClick={onClick}
                >
                    <Icon name={item.icon} size={18} />
                    <span>{item.name}</span>
                </a>
            );
        }

        return (
            <InternalLink
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={onClick}
            >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
            </InternalLink>
        );
    };

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
                isScrolled ? 'shadow-subtle bg-white/95 backdrop-blur-sm' : 'bg-white'
            }`}
        >
            <div className="container-responsive">
                <div className="flex h-16 items-center justify-between">
                    <InternalLink href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
                        <img src="/logo.png" alt="Casa Conecta Imóveis" className="h-10 w-auto" />
                        <div className="hidden sm:block">
                            <h1 className="text-text-primary text-xl font-bold">Casa Conecta Imóveis</h1>
                        </div>
                    </InternalLink>

                    <nav className="hidden items-center space-x-8 lg:flex">
                        {items.filter((item) => item.name !== 'Painel' || isLogged).map((item) => renderNavItem(item))}
                    </nav>

                    <div className="hidden items-center space-x-4 lg:flex">
                        <Button
                            variant="outline"
                            size="sm"
                            iconName="Phone"
                            iconPosition="left"
                            onClick={handleOpenPhone}
                            className="text-text-secondary border-border hover:border-primary hover:text-primary"
                        >
                            {formatPhoneDisplay(contact)}
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="MessageCircle"
                            iconPosition="left"
                            onClick={handleOpenWhatsApp}
                            className="bg-accent hover:bg-accent/90"
                        >
                            WhatsApp
                        </Button>

                        {isLogged && authUser && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="size-10 rounded-full p-1 hover:opacity-90">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={authUser.avatar} alt={authUser.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(authUser.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={authUser} onOpenSettings={() => setSettingsOpen(true)} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />

                    <button
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className="text-text-secondary rounded-md p-2 transition-colors hover:bg-primary/5 hover:text-primary lg:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="border-t border-border bg-white lg:hidden">
                        <div className="container-responsive">
                            <div className="space-y-3 py-4">
                                {items
                                    .filter((item) => item.name !== 'Painel' || isLogged)
                                    .map((item) =>
                                        renderNavItem(item, () => {
                                            setIsMobileMenuOpen(false);
                                        }),
                                    )}

                                <div className="space-y-3 border-t border-border pt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        iconName="Phone"
                                        iconPosition="left"
                                        onClick={() => {
                                            handleOpenPhone();
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
                                            handleOpenWhatsApp();
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
