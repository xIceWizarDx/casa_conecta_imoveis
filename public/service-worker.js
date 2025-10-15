// Bump the cache name to ensure old, overly-aggressive caches are cleared
const CACHE_NAME = 'casa-conecta-cache-v2';
const PRECACHE_URLS = ['/', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name)),
            ),
        ),
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET' || request.headers.has('range')) {
        return;
    }

    const url = new URL(request.url);
    const isApi = url.pathname.startsWith('/api/');
    const isStorage = url.pathname.startsWith('/storage/');

    // Never serve stale data for API and dynamic storage assets
    if (isApi || isStorage) {
        event.respondWith(
            (async () => {
                try {
                    const fresh = await fetch(request);
                    // Optionally keep a copy for offline fallback
                    if (fresh && fresh.ok && fresh.type === 'basic') {
                        const cache = await caches.open(CACHE_NAME);
                        cache.put(request, fresh.clone());
                    }
                    return fresh;
                } catch (err) {
                    const cached = await caches.match(request);
                    if (cached) return cached;
                    throw err;
                }
            })(),
        );
        return;
    }

    // Static assets: cache-first with background refresh
    event.respondWith(
        caches.match(request).then((cached) => {
            const networkFetch = fetch(request)
                .then((response) => {
                    if (response && response.status === 200 && response.type === 'basic') {
                        const clonedResponse = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || networkFetch;
        }),
    );
});
