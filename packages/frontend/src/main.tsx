import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/index.css';

// Создаём клиент React Query
const queryClient = new QueryClient();

// Получаем root элемент из DOM
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure your index.html has <div id="root"></div>.');
}

// Создаём root и рендерим приложение
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
