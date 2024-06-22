import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/Header.css';
import './components/ProductCard.css';
import './pages/Catalog.css';
import './pages/Home.css';
import './pages/Favorites.css';
import './pages/Cart.css';
import './components/Footer.css';
import './pages/Order.css';
import './pages/ProductDetail.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
