const CACHE_NAME = 'casa-conecta-cache-v1';
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

    event.respondWith(
        caches.match(request).then((cached) => {
            const networkFetch = fetch(request)
                .then((response) => {
                    if (
                        response &&
                        response.status === 200 &&
                        response.type === 'basic'
                    ) {
                        const clonedResponse = response.clone();
                        caches
                            .open(CACHE_NAME)
                            .then((cache) => cache.put(request, clonedResponse));
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || networkFetch;
        }),
    );
});
