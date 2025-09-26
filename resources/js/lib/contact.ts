export type Contact = {
  email?: string | null;
  phone?: string | null; // can contain non-digits formatting
  whatsapp?: string | null; // numbers only with country + area
  whatsapp_link?: string | null; // optional full wa.me link
};

let cachedContact: Contact | null = null;
let fetching: Promise<Contact | null> | null = null;

export async function fetchContact(): Promise<Contact | null> {
  if (cachedContact) return cachedContact;
  if (fetching) return fetching;
  fetching = fetch('/api/settings/contact')
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      cachedContact = (d && d.contact) || null;
      return cachedContact;
    })
    .catch(() => null)
    .finally(() => {
      fetching = null;
    });
  return fetching;
}

export function setContactCache(c: Contact | null) {
  cachedContact = c;
  try {
    const evt = new CustomEvent('contact:updated', { detail: c } as any);
    window.dispatchEvent(evt);
  } catch {}
}

export function digitsOnly(input?: string | null): string {
  return (input || '').replace(/\D+/g, '');
}

export function formatBrazilPhoneFromDigits(digits: string): string {
  if (!digits) return '';
  // Remove leading plus if present
  digits = digits.replace(/^\+/, '');
  // Normalize to include country 55 when missing
  let country = '';
  let area = '';
  let local = '';
  if (digits.startsWith('55')) {
    country = '55';
    digits = digits.slice(2);
  }
  if (digits.length >= 10) {
    area = digits.slice(0, 2);
    local = digits.slice(2);
  } else if (digits.length >= 2) {
    area = digits.slice(0, 2);
    local = digits.slice(2);
  } else {
    local = digits;
  }
  if (!area || !local) return digits;
  // 9-digit mobile or 8-digit landline
  if (local.length >= 9) {
    return `(${area}) ${local.slice(0, 5)}-${local.slice(5, 9)}`;
  }
  if (local.length >= 8) {
    return `(${area}) ${local.slice(0, 4)}-${local.slice(4, 8)}`;
  }
  return `(${area}) ${local}`;
}

export function formatPhoneDisplay(contact?: Contact | null, fallback: string = '(62) 99999-9999'): string {
  const raw = contact?.phone ?? '';
  const d = digitsOnly(raw);
  if (!d) return fallback;
  return formatBrazilPhoneFromDigits(d);
}

export function getPhoneHref(contact?: Contact | null, fallbackDigits = '5562999999999'): string {
  const d = digitsOnly(contact?.phone);
  const withCountry = d
    ? (d.startsWith('55') ? d : `55${d}`)
    : fallbackDigits;
  return `tel:+${withCountry}`;
}

export function getWhatsAppUrl(contact?: Contact | null, message?: string, fallbackDigits = '5562999999999'): string {
  const base = contact?.whatsapp_link || (contact?.whatsapp ? `https://wa.me/${digitsOnly(contact.whatsapp)}` : `https://wa.me/${fallbackDigits}`);
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export async function openWhatsApp(message?: string, opts?: { contact?: Contact }): Promise<void> {
  try {
    const contact = opts?.contact ?? (await fetchContact());
    const url = getWhatsAppUrl(contact || undefined, message);
    window.open(url, '_blank');
  } catch {
    const url = getWhatsAppUrl(undefined, message);
    window.open(url, '_blank');
  }
}

export async function openPhone(opts?: { contact?: Contact }): Promise<void> {
  try {
    const contact = opts?.contact ?? (await fetchContact());
    window.open(getPhoneHref(contact || undefined), '_self');
  } catch {
    window.open(getPhoneHref(undefined), '_self');
  }
}

// Simple React hook for convenience in components written in JS/TSX
// Kept here to avoid adding new providers.
import { useEffect, useState } from 'react';
export function useContactInfo(): Contact | null {
  const [contact, setContact] = useState<Contact | null>(cachedContact);
  useEffect(() => {
    let ignore = false;
    if (!cachedContact) {
      fetchContact().then((c) => {
        if (!ignore) setContact(c);
      });
    }
    const handler = (e: any) => {
      if (!ignore) setContact(e?.detail ?? null);
    };
    window.addEventListener('contact:updated', handler);
    return () => {
      ignore = true;
      window.removeEventListener('contact:updated', handler);
    };
  }, []);
  return contact;
}
