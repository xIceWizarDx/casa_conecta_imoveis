import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "@/main/components/ScrollToTop";
import ErrorBoundary from "@/main/components/ErrorBoundary";
import NotFound from "@/main/pages/NotFound";
import FAQPage from './pages/faq-comprehensive-buyer-education';
import AboutBrandStoryCredentials from './pages/about-brand-story-credentials';
import HomepagePremiumRealEstateConsultancy from './pages/homepage-premium-real-estate-consultancy';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';

// Component to handle Google Analytics inside Router context
const AnalyticsWrapper = ({ children }) => {
  // Initialize Google Analytics tracking (now safely inside Router context)
  useGoogleAnalytics();
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AnalyticsWrapper>
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<HomepagePremiumRealEstateConsultancy />} />
            <Route path="/faq-comprehensive-buyer-education" element={<FAQPage />} />
            <Route path="/about-brand-story-credentials" element={<AboutBrandStoryCredentials />} />
            <Route path="/homepage-premium-real-estate-consultancy" element={<HomepagePremiumRealEstateConsultancy />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AnalyticsWrapper>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
