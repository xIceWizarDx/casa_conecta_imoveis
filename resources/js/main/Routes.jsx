import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ErrorBoundary from "@/main/components/ErrorBoundary";
import ScrollToTop from "@/main/components/ScrollToTop";
import NotFound from "@/main/pages/NotFound";
import FAQPage from './pages/FAQ-comprehensive-buyer-education';
import AboutBrandStoryCredentials from './pages/about-brand-story-credentials';
import HomepagePremiumRealEstateConsultancy from './pages/homepage-premium-real-estate-consultancy';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import Painel from '@/pages/painel';

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
            <Route path="/FAQ-comprehensive-buyer-education" element={<FAQPage />} />
            <Route path="/about-brand-story-credentials" element={<AboutBrandStoryCredentials />} />
            <Route path="/homepage-premium-real-estate-consultancy" element={<HomepagePremiumRealEstateConsultancy />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AnalyticsWrapper>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
