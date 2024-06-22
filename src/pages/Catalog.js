import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const addToFavorites = (product) => {
    axios.post('http://localhost:3001/favorites', product)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  const addToCart = (product) => {
    axios.post('http://localhost:3001/cart', product)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || product.category === category)
  );

  return (
    <div>
      <div className='search'>
        <input type="text" placeholder="Поиск товаров..." value={search} onChange={handleSearch} />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Все категории</option>
          <option value="Блогословления полой луны">Блогословления полой луны</option>
          <option value="Боевой пропуск">Боевой пропуск</option>
          <option value="Скины">Скины</option>
          <option value="Кристалы сотворения">Кристалы сотворения</option>
          <option value="Крутки">Крутки</option>
        </select>
      </div>
      <div className="product-list-container">
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-cards">
              <Link to={`/product/${product.id}`} className='desc'>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price} руб.</p>
              </Link>
                <button className="favorite-button" onClick={() => addToFavorites(product)}>
                  Лайкнуть
                </button>
                <button className="cart-button" onClick={() => addToCart(product)}>
                  Добавить в корзину
                </button>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
