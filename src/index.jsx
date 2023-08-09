import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CountriesContextProvider from './CountriesContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountriesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CountriesContextProvider>
  </React.StrictMode>,
);
