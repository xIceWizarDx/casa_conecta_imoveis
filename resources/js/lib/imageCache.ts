const CACHE_NAME = "app-image-cache-v1";
const IDB_NAME = "app-image-cache";
const IDB_STORE_NAME = "images";
const META_PREFIX = "image-cache-meta:";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type ImageCacheConsent = "granted" | "denied" | "unknown";
export const IMAGE_CACHE_CONSENT_KEY = "image-cache-consent";
export const IMAGE_CACHE_CONSENT_EVENT = "image-cache-consent-change";

const CONSENT_COOKIE_TTL_DAYS = 365; // 1 year

export type ImageCacheMetadata = {
  expiresAt: number;
};

/**
 * DevTools verification checklist for future maintainers:
 * 1. Open the "Application" tab and watch the Cache Storage + IndexedDB entries.
 * 2. Accept the banner to grant consent, reload a hero/gallery page, then
 *    revisit it to confirm responses are served from cache (status `(disk cache)`
 *    or fetched blob URLs).
 * 3. Decline consent and reload to ensure cached entries disappear and network
 *    fetches resume.
 */

function supportsWindow(): boolean {
  return typeof window !== "undefined";
}

function supportsCacheStorage(): boolean {
  return supportsWindow() && typeof caches !== "undefined";
}

function supportsIndexedDB(): boolean {
  return supportsWindow() && typeof indexedDB !== "undefined";
}

function getMetaKey(url: string): string {
  return `${META_PREFIX}${encodeURIComponent(url)}`;
}

function persistMetadata(url: string, ttlSeconds: number): void {
  if (!supportsWindow()) return;
  try {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    const entry: ImageCacheMetadata = { expiresAt };
    window.localStorage?.setItem(getMetaKey(url), JSON.stringify(entry));
    const expireDate = new Date(expiresAt);
    document.cookie = `${encodeURIComponent(getMetaKey(url))}=1; path=/; expires=${expireDate.toUTCString()}`;
  } catch {
    // Swallow storage errors: cache will behave as non-persistent.
  }
}

function readMetadata(url: string): ImageCacheMetadata | null {
  if (!supportsWindow()) return null;
  try {
    const raw = window.localStorage?.getItem(getMetaKey(url));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ImageCacheMetadata | null;
    if (!parsed || typeof parsed.expiresAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function removeMetadata(url: string): void {
  if (!supportsWindow()) return;
  try {
    const key = getMetaKey(url);
    window.localStorage?.removeItem(key);
    document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch {
    // Ignore failures
  }
}

function getCookieValue(name: string): string | null {
  if (!supportsWindow()) return null;
  const decoded = decodeURIComponent(name);
  const cookies = document.cookie?.split(";") ?? [];
  for (const cookie of cookies) {
    const [rawKey, rawValue] = cookie.trim().split("=");
    if (rawKey === decoded) {
      return rawValue ?? "";
    }
  }
  return null;
}

function persistConsent(value: ImageCacheConsent): void {
  if (!supportsWindow()) return;
  try {
    window.localStorage?.setItem(IMAGE_CACHE_CONSENT_KEY, value);
  } catch {
    // Ignore storage errors
  }

  try {
    const expires = new Date(Date.now() + CONSENT_COOKIE_TTL_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(IMAGE_CACHE_CONSENT_KEY)}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}`;
  } catch {
    // Ignore cookie errors
  }
}

function dispatchConsentEvent(value: ImageCacheConsent): void {
  if (!supportsWindow()) return;
  try {
    window.dispatchEvent(new CustomEvent(IMAGE_CACHE_CONSENT_EVENT, { detail: { consent: value } }));
  } catch {
    // Older browsers without CustomEvent support can silently fail.
  }
}

function openImageDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!supportsIndexedDB()) {
      reject(new Error("IndexedDB not supported"));
      return;
    }

    const request = indexedDB.open(IDB_NAME, 1);
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
        db.createObjectStore(IDB_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
  });
}

async function storeBlobInIndexedDB(url: string, blob: Blob): Promise<void> {
  const db = await openImageDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(IDB_STORE_NAME);
    const request = store.put(blob, url);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error("Failed to store blob"));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
}

async function readBlobFromIndexedDB(url: string): Promise<Blob | null> {
  const db = await openImageDb();
  return new Promise<Blob | null>((resolve, reject) => {
    const transaction = db.transaction(IDB_STORE_NAME, "readonly");
    const store = transaction.objectStore(IDB_STORE_NAME);
    const request = store.get(url);
    request.onsuccess = () => {
      const result = request.result ?? null;
      resolve(result ?? null);
    };
    request.onerror = () => reject(request.error ?? new Error("Failed to read blob"));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
}

async function deleteBlobFromIndexedDB(url: string): Promise<void> {
  const db = await openImageDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(IDB_STORE_NAME, "readwrite");
    const store = transaction.objectStore(IDB_STORE_NAME);
    const request = store.delete(url);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error("Failed to delete blob"));
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
}

async function readBlobFromCacheStorage(url: string): Promise<Blob | null> {
  if (!supportsCacheStorage()) return null;
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(url);
  if (!response) return null;
  return response.blob();
}

async function storeBlobInCacheStorage(url: string, blob: Blob): Promise<void> {
  if (!supportsCacheStorage()) return;
  const cache = await caches.open(CACHE_NAME);
  const headers = new Headers();
  if (blob.type) {
    headers.set("Content-Type", blob.type);
  }
  const response = new Response(blob, { headers });
  await cache.put(url, response);
}

async function deleteBlobFromCacheStorage(url: string): Promise<void> {
  if (!supportsCacheStorage()) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(url);
}

async function storeBlob(url: string, blob: Blob, ttlSeconds: number): Promise<boolean> {
  try {
    if (supportsCacheStorage()) {
      await storeBlobInCacheStorage(url, blob);
      persistMetadata(url, ttlSeconds);
      return true;
    }
    if (supportsIndexedDB()) {
      await storeBlobInIndexedDB(url, blob);
      persistMetadata(url, ttlSeconds);
      return true;
    }
  } catch {
    // Fall through
  }
  return false;
}

async function readBlob(url: string): Promise<Blob | null> {
  try {
    if (supportsCacheStorage()) {
      const response = await readBlobFromCacheStorage(url);
      if (response) return response;
    }
    if (supportsIndexedDB()) {
      return await readBlobFromIndexedDB(url);
    }
  } catch {
    // Fall through to null
  }
  return null;
}

async function deleteBlob(url: string): Promise<void> {
  try {
    if (supportsCacheStorage()) {
      await deleteBlobFromCacheStorage(url);
    }
    if (supportsIndexedDB()) {
      await deleteBlobFromIndexedDB(url);
    }
  } catch {
    // Ignore failures
  }
}

export function getImageCacheConsent(): ImageCacheConsent {
  if (!supportsWindow()) return "unknown";
  try {
    const stored = window.localStorage?.getItem(IMAGE_CACHE_CONSENT_KEY);
    if (stored === "granted" || stored === "denied") {
      return stored;
    }
  } catch {
    // Ignore storage issues
  }

  const cookie = getCookieValue(IMAGE_CACHE_CONSENT_KEY);
  if (cookie === "granted" || cookie === "denied") {
    return cookie;
  }

  return "granted";
}

export function hasImageCacheConsent(): boolean {
  return getImageCacheConsent() === "granted";
}

export function setImageCacheConsent(consent: ImageCacheConsent): void {
  if (consent === "unknown") {
    removeConsent();
    dispatchConsentEvent("unknown");
    return;
  }

  persistConsent(consent);
  dispatchConsentEvent(consent);
}

function removeConsent(): void {
  if (!supportsWindow()) return;
  try {
    window.localStorage?.removeItem(IMAGE_CACHE_CONSENT_KEY);
    document.cookie = `${encodeURIComponent(IMAGE_CACHE_CONSENT_KEY)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch {
    // Ignore failures
  }
}

export async function getCachedImageUrl(url: string): Promise<string | null> {
  if (!supportsWindow() || !url) return null;
  const meta = readMetadata(url);
  if (!meta) return null;
  if (Date.now() > meta.expiresAt) {
    await removeImageCacheEntry(url);
    return null;
  }

  const blob = await readBlob(url);
  if (!blob || blob.size === 0) {
    await removeImageCacheEntry(url);
    return null;
  }

  if (typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    return null;
  }

  return URL.createObjectURL(blob);
}

export async function fetchAndCacheImage(url: string, ttlSeconds: number = DEFAULT_TTL_SECONDS): Promise<string> {
  if (!supportsWindow() || !url) {
    throw new Error("Image caching is only available in the browser");
  }

  if (!hasImageCacheConsent()) {
    throw new Error("Consent required for image caching");
  }

  const response = await fetch(url, { credentials: "same-origin" });
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`);
  }

  const blob = await response.clone().blob();
  if (!blob || blob.size === 0) {
    throw new Error("Received empty image payload");
  }

  await storeBlob(url, blob, ttlSeconds);

  if (typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    throw new Error("Object URLs are not supported in this environment");
  }

  return URL.createObjectURL(blob);
}

export async function removeImageCacheEntry(url: string): Promise<void> {
  if (!supportsWindow() || !url) return;
  await deleteBlob(url);
  removeMetadata(url);
}

export async function clearImageCache(): Promise<void> {
  if (!supportsWindow()) return;

  if (supportsCacheStorage()) {
    try {
      const names = await caches.keys();
      await Promise.all(names.filter((name) => name === CACHE_NAME).map((name) => caches.delete(name)));
    } catch {
      // Ignore failures
    }
  }

  if (supportsIndexedDB()) {
    try {
      await new Promise<void>((resolve) => {
        const request = indexedDB.deleteDatabase(IDB_NAME);
        request.onsuccess = () => resolve();
        request.onerror = () => resolve();
        request.onblocked = () => resolve();
      });
    } catch {
      // Ignore failures
    }
  }

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < (window.localStorage?.length ?? 0); i += 1) {
      const key = window.localStorage?.key(i) ?? "";
      if (key.startsWith(META_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => {
      window.localStorage?.removeItem(key);
      document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  } catch {
    // Ignore storage failures
  }
}

export { DEFAULT_TTL_SECONDS as IMAGE_CACHE_DEFAULT_TTL };
