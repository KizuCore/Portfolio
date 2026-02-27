import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals.tsx';
import './i18n.tsx';
import Preloader from './utils/Preloader.tsx';

const CHUNK_RELOAD_KEY = 'vite-chunk-reload-once';

if (import.meta.env.PROD && typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();

    if (sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1') {
      return;
    }

    sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
    window.location.reload();
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY);
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Suspense fallback={<Preloader />}>
          <App />
        </Suspense>
      </HelmetProvider>
    </React.StrictMode>
  );
}

reportWebVitals();
