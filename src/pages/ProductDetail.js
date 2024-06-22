import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => {
        setProduct(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error(`Error fetching the product with id ${id}`, error); 
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!product) {
    return <div>Product not found</div>; 
  }

  return (
    <div className='product-page'>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price} руб.</p>
      <button onClick={addToFavorites}>Добавить в избранное</button>
      <button onClick={addToCart}>Добавить в корзину</button>
    </div>
  );

  function addToFavorites() {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    localStorage.setItem('favorites', JSON.stringify([...existingFavorites, product]));
  }

  function addToCart() {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('cart', JSON.stringify([...existingCart, product]));
  }
};

export default ProductDetail;