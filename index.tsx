
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker for full offline support and instant WebAPK generation
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Koolraves update ready');
  },
  onOfflineReady() {
    console.log('Koolraves ready to work offline');
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

