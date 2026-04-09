import React, { Suspense, lazy } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

// ⚡ Bolt: Route-level code splitting
// Using React.lazy() to split the bundle by route.
// This reduces the initial JavaScript payload by ~40kB
// as users only download code for the page they're visiting.
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
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#C4D600] border-t-transparent rounded-full animate-spin"></div>
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
