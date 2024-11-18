import React from 'react';
import { createRoot } from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import './styles.css';

// Инициализация VK Bridge
bridge.send('VKWebAppInit');

// Создание корня для React 18
const root = createRoot(document.getElementById('root'));

// Рендеринг приложения
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);