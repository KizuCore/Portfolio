import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './Assets/style/index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import './i18n';
import Pre from './components/Utils/Pre';
import { SpeedInsights } from '@vercel/speed-insights/react';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Pre />}>
      <App />
      <SpeedInsights/>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
