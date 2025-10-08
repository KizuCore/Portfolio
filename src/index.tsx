import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals.tsx';
import './i18n.tsx';
import Preloader from './utils/Preloader.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Suspense fallback={<Preloader />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
}

reportWebVitals();
