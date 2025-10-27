import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Notice } from '@/types/notice';

const variantStyles: Record<Notice['type'], string> = {
    success: 'border border-emerald-500/70 bg-emerald-600 text-white dark:border-emerald-400/70 dark:bg-emerald-500 dark:text-emerald-50',
    error: 'border border-destructive/70 bg-destructive text-destructive-foreground dark:border-destructive/70 dark:bg-destructive dark:text-destructive-foreground',
};

const descriptionStyles: Record<Notice['type'], string> = {
    success: 'text-white/80 dark:text-emerald-50/80',
    error: 'text-destructive-foreground/80 dark:text-destructive-foreground/80',
};

const icons = {
    success: CheckCircle2,
    error: AlertCircle,
};

interface NoticeToasterProps {
    notice: Notice | null;
    onDismiss: () => void;
    duration?: number;
}

export default function NoticeToaster({ notice, onDismiss, duration = 5000 }: NoticeToasterProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!notice) return;

        setIsVisible(true);

        const hideTimeout = window.setTimeout(() => {
            setIsVisible(false);
        }, duration);

        const dismissTimeout = window.setTimeout(() => {
            onDismiss();
        }, duration + 300);

        return () => {
            window.clearTimeout(hideTimeout);
            window.clearTimeout(dismissTimeout);
        };
    }, [notice, duration, onDismiss]);

    if (!notice) {
        return null;
    }

    const Icon = icons[notice.type];

    const handleClose = () => {
        setIsVisible(false);
        window.setTimeout(() => {
            onDismiss();
        }, 200);
    };

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:justify-end sm:px-8">
            <div
                className={cn(
                    'pointer-events-auto relative flex w-full max-w-sm overflow-hidden rounded-xl shadow-xl transition-all duration-200 ease-out',
                    isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
                    variantStyles[notice.type],
                )}
                role="status"
                aria-live="polite"
            >
                <div className="flex flex-1 items-start gap-3 p-4">
                    <Icon className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold leading-5">{notice.title}</p>
                        {notice.message ? (
                            <p className={cn('mt-1 text-sm leading-5', descriptionStyles[notice.type])}>{notice.message}</p>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        className="mt-0.5 rounded-full p-1 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        onClick={handleClose}
                        aria-label="Fechar aviso"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
                <div
                    className={cn(
                        'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-current transition-transform duration-200 ease-out',
                        isVisible ? 'scale-x-100' : 'scale-x-0',
                    )}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}
