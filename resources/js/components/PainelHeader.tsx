import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageCircle, Phone } from 'lucide-react';

const primaryLinks = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/about-brand-story-credentials' },
    { label: 'FAQ', href: '/faq-comprehensive-buyer-education' },
];

export default function PainelHeader() {
    return (
        <header className="sticky top-0 z-30 border-b border-black/5 bg-white/95 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
                <a href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                        <span className="text-lg font-semibold">CC</span>
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">Casa Conecta</span>
                        <span className="text-xs text-slate-500">Imóveis premium</span>
                    </div>
                </a>

                <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
                    {primaryLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'transition-colors hover:text-primary',
                                typeof window !== 'undefined' && window.location.pathname === link.href
                                    ? 'text-primary'
                                    : 'text-slate-600',
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="hidden items-center gap-2 text-slate-700 md:flex"
                        onClick={() => window.open('tel:+5562999999999')}
                    >
                        <Phone className="h-4 w-4" />
                        (62) 99999-9999
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600"
                        onClick={() => window.open('https://wa.me/5562999999999', '_blank')}
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </Button>
                </div>
            </div>
        </header>
    );
}
