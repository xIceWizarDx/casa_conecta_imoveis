import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  let location;
  
  // Safely get location, handle cases where router might not be ready
  try {
    location = useLocation();
  } catch (error) {
    // If useLocation fails (router not ready), set location to null
    location = null;
  }

  useEffect(() => {
    // Skip initialization if no measurement ID is provided or in development
    const measurementId = import.meta.env?.VITE_GA_MEASUREMENT_ID;
    if (!measurementId || measurementId === 'your_vite_ga_measurement_id') return;

    // Initialize gtag.js if not already done
    if (!window.dataLayer) {
      // Load gtag.js script dynamically
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head?.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location?.href,
        debug_mode: import.meta.env?.MODE === 'development'
      });
    }

    // Send page_view event on initial load and route changes
    // Only if location is available and gtag is ready
    if (window.gtag && location) {
      window.gtag('event', 'page_view', {
        page_path: location?.pathname + (location?.search || ''),
        page_title: document.title,
        page_location: window.location?.href,
      });
    }
  }, [location]);

  return {
    trackEvent: (eventName, eventParams = {}) => {
      if (window.gtag && import.meta.env?.VITE_GA_MEASUREMENT_ID !== 'your_vite_ga_measurement_id') {
        window.gtag('event', eventName, eventParams);
      }
    }
  };
}

export default useGoogleAnalytics;