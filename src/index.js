import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './Assets/style/index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import './i18n';
import Pre from './components/Utils/Pre';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Pre />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
