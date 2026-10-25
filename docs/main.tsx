import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../src/styles/index.css';
import './docs.css';

const stored = localStorage.getItem('cesium-theme');
if (stored === 'light' || stored === 'dark') {
  document.documentElement.dataset.theme = stored;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
