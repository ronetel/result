import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/cart')
      .then(response => {
        setCart(response.data);
        setTotal(response.data.reduce((acc, item) => acc + item.price, 0));
      })
      .catch(error => console.error(error));
  }, []);

  const handleRemoveFromCart = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`)
      .then(response => {
        setCart(cart.filter(product => product.id !== id));
        setTotal(total - response.data.price);
      })
      .catch(error => console.error(error));
  };

  const handleOrder = () => {
    const orderData = {
      items: cart,
      total: total
    };

    axios.post('http://localhost:3001/order', orderData)
      .then(response => {
        console.log('Order submitted successfully:', response.data);
        setCart([]);
        setTotal(0);
        navigate('/order', { state: { cart: response.data.items } });
      })
      .catch(error => {
        console.error('Error submitting order:', error);
      });
  };

  return (
    <div className='z'>
      <div className="product-list-container">
        {cart.map(product => (
          <div key={product.id} className='product-cards'>
            <Link to={`/product/${product.id}`} className='desc'>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.price} руб.</p>
            </Link>
            <button className="cart-button" onClick={() => handleRemoveFromCart(product.id)}>
              Удалить из корзины
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="total-price">
            <p>Итоговая стоимость: {total} руб.</p>
          </div>
          <div className="cart-buttons">
            <button className="cart-button" onClick={handleOrder}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <p className="empty-message">Ваша корзина пуста</p>
      )}
    </div>
  );
};

export default Cart;