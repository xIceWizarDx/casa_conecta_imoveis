import React, { useCallback, useEffect, useState } from "react";
import {
  clearImageCache,
  getImageCacheConsent,
  IMAGE_CACHE_CONSENT_EVENT,
  setImageCacheConsent,
} from "@/lib/imageCache";

const CONSENT_COPY = {
  heading: "Permita armazenar imagens?",
  body: "Podemos salvar imagens para acelerar sua navegação?",
  accept: "Aceitar e armazenar",
  decline: "Recusar",
};

const CookieConsentBanner = () => {
  const [consent, setConsent] = useState(() => getImageCacheConsent());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleConsentChange = (event) => {
      const nextConsent = event?.detail?.consent;
      if (!nextConsent) return;
      setConsent(nextConsent);
    };

    window.addEventListener(IMAGE_CACHE_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(IMAGE_CACHE_CONSENT_EVENT, handleConsentChange);
  }, []);

  const persistConsent = useCallback((nextConsent) => {
    setImageCacheConsent(nextConsent);
    setConsent(nextConsent);
  }, []);

  const handleAccept = useCallback(() => {
    persistConsent("granted");
  }, [persistConsent]);

  const handleDecline = useCallback(() => {
    persistConsent("denied");
    clearImageCache().catch(() => {});
  }, [persistConsent]);

  if (!isHydrated || consent !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-[1200] w-full max-w-xl -translate-x-1/2 rounded-lg border border-neutral-200 bg-white p-6 shadow-xl">
      <h2 className="text-lg font-semibold text-neutral-900">{CONSENT_COPY.heading}</h2>
      <p className="mt-2 text-sm text-neutral-700">{CONSENT_COPY.body}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={handleDecline}
          className="order-2 inline-flex justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 sm:order-1"
        >
          {CONSENT_COPY.decline}
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="order-1 inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:order-2"
        >
          {CONSENT_COPY.accept}
        </button>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        Você pode revisar essa escolha depois nas configurações do seu navegador.
      </p>
    </div>
  );
};

export default CookieConsentBanner;
