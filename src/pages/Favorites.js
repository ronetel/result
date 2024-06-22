import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = (product) => {
    axios.post('http://localhost:3001/cart', product)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  const removeFromFavorites = (id) => {
    axios.delete(`http://localhost:3001/favorites/${id}`)
      .then(() => setFavorites(favorites.filter(product => product.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="product-list-container">
      {favorites.length > 0 ? (
        <div className="product-list">
          {favorites.map(product => (
            <div key={product.id} className="product-cards">
              <Link to={`/product/${product.id}`} className='desc'>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price} руб.</p>
              </Link>
              <button className="favorite-button" onClick={() => removeFromFavorites(product.id)}>
                Удалить из избранного
              </button>
              <button className="cart-button" onClick={() => addToCart(product)}>
                Добавить в корзину
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">Нет избранного</p>
      )}
    </div>
  );
};

export default Favorites;
