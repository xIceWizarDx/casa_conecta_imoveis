export type CacheEntry<T> = { value: T; expiresAt: number };

const defaultTTL = 60 * 5; // 5 minutes

export function setCache<T>(key: string, value: T, ttlSeconds: number = defaultTTL) {
  try {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    const entry: CacheEntry<T> = { value, expiresAt };
    localStorage.setItem(key, JSON.stringify(entry));
    const expireDate = new Date(expiresAt);
    document.cookie = `${encodeURIComponent(key)}=1; path=/; expires=${expireDate.toUTCString()}`;
  } catch {}
}

export function getCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (!entry || typeof entry.expiresAt !== 'number') return null;
    if (Date.now() > entry.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

export function removeCache(key: string) {
  try {
    localStorage.removeItem(key);
    document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch {}
}

