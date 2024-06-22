import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { motion, useAnimation } from 'framer-motion';

const Home = () => {
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    axios.get('http://localhost:3001/products?_limit=10')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const onSubmit = async (data) => {
    try {
      const templateParams = {
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
      };

      await emailjs.send(
        'service_dg9hnna',
        'template_mjb5ibh',
        templateParams,
        'ocArEmLdARHctw7vX'
      );

      console.log('Email успешно отправлен');
      setFeedbackMessage('Супер');
      reset();
    } catch (error) {
      console.error('Ошибка при отправке email:', error);
      setFeedbackMessage('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.');
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100vw',
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      x: '100vw',
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <h1>Добро пожаловать в магазин Genshin Impact</h1>
      <p className="description">Здесь вы можете найти лучшие предметы для вашего персонажа в Genshin Impact. У нас есть широкий выбор оружия, артефактов, материалов и многих других предметов, которые помогут вам стать сильнее и пройти игру легче.</p>
      <div className="product-list-container">
        <motion.div className="product-list">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
      <div className="contact-form">
        <h2>Свяжитесь с нами</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Имя</label>
            <input type="text" {...register('user_name', { required: true })} />
            {errors.user_name && <p>Поле "Имя" обязательно для заполнения</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="email" {...register('user_email', { required: true })} />
            {errors.user_email && <p>Поле "Email" обязательно для заполнения</p>}
          </div>
          <div>
            <label>Сообщение</label>
            <textarea {...register('message', { required: true })} />
            {errors.message && <p>Поле "Сообщение" обязательно для заполнения</p>}
          </div>
          <input type="submit" value="Отправить" />
        </form>
      </div>
    </motion.div>
  );
};

export default Home;
