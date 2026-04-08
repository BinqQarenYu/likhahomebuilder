import React, { Suspense, lazy } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { Loader2 } from 'lucide-react';

// Bolt Performance Optimization: Route-level code splitting
// Lazy load page components to minimize the initial JavaScript bundle payload size
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="sr-only">Loading...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </HashRouter>
    </div>
  );
}

export default App;
