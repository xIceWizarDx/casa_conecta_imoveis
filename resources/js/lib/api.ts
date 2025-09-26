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
        if (!headers.has('X-CSRF-TOKEN')) headers.set('X-CSRF-TOKEN', getCsrf());
    }
    const res = await fetch(def.url, {
        method,
        credentials: 'same-origin',
        ...init,
        headers,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }

    const ct = res.headers.get('content-type') || '';
    if (!ct.toLowerCase().includes('application/json')) {
        const bodyText = (await res.text()).trim();
        throw new Error(bodyText || 'Resposta inesperada do servidor');
    }

    return (await res.json()) as T;
}
