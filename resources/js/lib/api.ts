const getCookie = (name: string): string => {
    if (typeof document === 'undefined') return '';

    const target = `${name}=`;
    const raw = document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith(target));

    if (!raw) return '';

    const value = raw.slice(target.length);
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
};

export const getCsrf = () => {
    if (typeof document === 'undefined') return '';

    const metaToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content;
    if (metaToken) return metaToken;

    return getCookie('XSRF-TOKEN');
};

export async function apiFetch<T = unknown>(def: { url: string; method?: string }, init?: RequestInit): Promise<T> {
    const method = (def.method ?? 'get').toUpperCase();
    const headers = new Headers(init?.headers);
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        // Send CSRF token for Laravel (supports both header styles)
        const csrfToken = getCsrf();
        if (csrfToken && !headers.has('X-CSRF-TOKEN')) headers.set('X-CSRF-TOKEN', csrfToken);
        const xsrfCookie = getCookie('XSRF-TOKEN');
        if (xsrfCookie && !headers.has('X-XSRF-TOKEN')) headers.set('X-XSRF-TOKEN', xsrfCookie);
    }
    const res = await fetch(def.url, {
        method,
        // include cookies even when hitting a different subdomain or absolute URL
        credentials: 'include',
        ...init,
        headers,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }
    const ct = res.headers.get('content-type') || '';
    return (ct.includes('application/json') ? res.json() : (null as unknown)) as T;
}
