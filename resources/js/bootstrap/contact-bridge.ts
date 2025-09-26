// Global bridge to ensure legacy hard-coded contact links
// point to the values configured in SettingsModal.
import { fetchContact, getWhatsAppUrl, getPhoneHref } from '@/lib/contact';

declare global {
  interface Window {
    _openPatched?: boolean;
  }
}

if (typeof window !== 'undefined' && !window._openPatched) {
  const originalOpen = window.open.bind(window);

  window.open = ((url: any, target?: string, features?: string, replace?: boolean) => {
    try {
      if (typeof url === 'string') {
        // Normalize
        const lower = url.toLowerCase();
        const isLegacyWa = lower.startsWith('https://wa.me/5562999999999');
        const isLegacyTel = lower.startsWith('tel:+5562999999999');

        if (isLegacyWa) {
          // Preserve message if present
          let text = '';
          try {
            const u = new URL(url, window.location.origin);
            text = u.searchParams.get('text') || '';
          } catch {}
          fetchContact().then((c) => {
            const finalUrl = getWhatsAppUrl(c || undefined, text || undefined);
            originalOpen(finalUrl, target || '_blank', features, replace as any);
          });
          return null as any;
        }

        if (isLegacyTel) {
          fetchContact().then((c) => {
            const tel = getPhoneHref(c || undefined);
            originalOpen(tel, target, features, replace as any);
          });
          return null as any;
        }
      }
    } catch {}
    return originalOpen(url as any, target as any, features as any, replace as any);
  }) as any;

  window._openPatched = true;
}

