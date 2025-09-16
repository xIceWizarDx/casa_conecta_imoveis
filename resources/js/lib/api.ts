export const getCsrf = () =>
    typeof document !== 'undefined'
        ? ((document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content ?? '')
        : '';

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
    return (ct.includes('application/json') ? res.json() : (null as unknown)) as T;
}
