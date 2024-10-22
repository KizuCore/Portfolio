import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './Assets/style/index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import './i18n'; 

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
