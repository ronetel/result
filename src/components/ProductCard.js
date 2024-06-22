import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Импортируем CSS файл с нашими стилями

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h4>{product.name}</h4>
      <p>{product.price} руб.</p>
      <Link to={`/product/${product.id}`} className="product-link">Подробнее</Link>
    </div>
  );
};

export default ProductCard;