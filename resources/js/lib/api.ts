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

// Upload helper with progress (for FormData uploads)
export function apiUploadWithProgress<T = unknown>(
    def: { url: string; method?: string },
    body: FormData,
    onProgress?: (percent: number) => void,
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const method = (def.method ?? 'post').toUpperCase();
        const xhr = new XMLHttpRequest();
        xhr.open(method, def.url, true);
        // include cookies
        xhr.withCredentials = true;

        // CSRF headers for Laravel
        try {
            const csrfToken = getCsrf();
            if (csrfToken) xhr.setRequestHeader('X-CSRF-TOKEN', csrfToken);
            const xsrfCookie = getCookie('XSRF-TOKEN');
            if (xsrfCookie) xhr.setRequestHeader('X-XSRF-TOKEN', xsrfCookie);
        } catch {}

        xhr.setRequestHeader('Accept', 'application/json');

        if (onProgress && xhr.upload) {
            xhr.upload.onprogress = (evt) => {
                if (!evt.lengthComputable) return;
                const percent = Math.min(100, Math.round((evt.loaded / evt.total) * 100));
                onProgress(percent);
            };
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            const ok = xhr.status >= 200 && xhr.status < 300;
            if (!ok) {
                reject(new Error(xhr.responseText || `HTTP ${xhr.status}`));
                return;
            }
            const ct = xhr.getResponseHeader('content-type') || '';
            try {
                const data = (ct.includes('application/json') ? JSON.parse(xhr.responseText || 'null') : null) as T;
                resolve(data);
            } catch (e) {
                reject(e instanceof Error ? e : new Error(String(e)));
            }
        };

        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(body);
    });
}
