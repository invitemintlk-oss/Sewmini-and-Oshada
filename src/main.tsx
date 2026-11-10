import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AdminPage } from './AdminPage.tsx';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/admin' ? <AdminPage /> : <App />}
  </StrictMode>,
);
