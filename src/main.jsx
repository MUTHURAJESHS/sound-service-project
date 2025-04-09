import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import logoImage from './assets/logorm.png';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,  
)
const link = document.querySelector("link[rel~='icon']");
if (!link) {
  const newLink = document.createElement('link');
  newLink.rel = 'icon';
  newLink.href = logoImage;
  document.head.appendChild(newLink);
} else {
  link.href = logoImage;
}

