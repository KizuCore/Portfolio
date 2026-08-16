import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './assets/styles/index.css';
import App from './App';
import './i18n';
import Preloader from '@/components/Layout/Preloader/Preloader';

const CHUNK_RELOAD_KEY = 'vite-chunk-reload-once';

if (import.meta.env.PROD && typeof window !== 'undefined') {
  // Recover once from stale hashed chunks after a deployment without creating a reload loop.
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
  // A successful load means the current asset graph is fresh again.
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
