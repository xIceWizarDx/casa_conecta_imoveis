// Analytics utility functions for Google Analytics
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag && import.meta.env?.VITE_GA_MEASUREMENT_ID !== 'your_vite_ga_measurement_id') {
    window.gtag('event', eventName, {
      ...eventParams,
      timestamp: new Date()?.toISOString(),
      page: window.location?.pathname,
    });
  }
};

// Common event tracking functions
export const trackButtonClick = (buttonId, additionalParams = {}) => {
  trackEvent('button_click', {
    button_id: buttonId,
    ...additionalParams,
  });
};

export const trackFormSubmit = (formId, additionalParams = {}) => {
  trackEvent('form_submit', {
    form_id: formId,
    ...additionalParams,
  });
};

export const trackContactInteraction = (interactionType, additionalParams = {}) => {
  trackEvent('contact_interaction', {
    interaction_type: interactionType,
    ...additionalParams,
  });
};

export const trackPropertyInteraction = (propertyId, interactionType, additionalParams = {}) => {
  trackEvent('property_interaction', {
    property_id: propertyId,
    interaction_type: interactionType,
    ...additionalParams,
  });
};

export const trackConsultationRequest = (consultationType, additionalParams = {}) => {
  trackEvent('consultation_request', {
    consultation_type: consultationType,
    ...additionalParams,
  });
};

export const trackFAQInteraction = (question, category, additionalParams = {}) => {
  trackEvent('faq_interaction', {
    faq_question: question,
    faq_category: category,
    ...additionalParams,
  });
};

// Track scroll depth for engagement analysis
export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    page: window.location?.pathname,
  });
};

// Track time spent on page
export const trackTimeOnPage = (timeSpent) => {
  trackEvent('time_on_page', {
    time_spent_seconds: timeSpent,
    page: window.location?.pathname,
  });
};

export default {
  trackEvent,
  trackButtonClick,
  trackFormSubmit,
  trackContactInteraction,
  trackPropertyInteraction,
  trackConsultationRequest,
  trackFAQInteraction,
  trackScrollDepth,
  trackTimeOnPage,
};