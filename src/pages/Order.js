import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { motion } from 'framer-motion';

const Order = () => {
  const form = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isVerified, setIsVerified] = useState(false);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const exampleItems = [];
    setItems(exampleItems);
    setTotal(exampleItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, []);

  const sendEmail = (templateParams) => {
    emailjs.send(
      'service_dg9hnna',
      'template_xh9ii0e',
      templateParams,
      'ocArEmLdARHctw7vX'
    ).then(
      () => {
        console.log('Email sent successfully');
      },
      (error) => {
        console.error('Error sending email:', error.text);
      }
    );
  };

  const onSubmit = (data) => {
    if (isVerified) {
      const templateParams = {
        fullName: data.fullName,
        address: data.address,
        paymentMethod: data.paymentMethod,
        items: Order.map(item => `${item.name}: ${item.price} x ${item.quantity}`).join('\n'),
        total: total,
      };
      sendEmail(templateParams);
    } else {
      alert('Please verify the reCAPTCHA.');
    }
  };

  const onRecaptchaChange = (value) => {
    setIsVerified(!!value);
  };

  const formVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="order-page container mt-5"
    >
      <form id="idform" ref={form} onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: true })}
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            placeholder="ФИО"
          />
          {errors.fullName && <div className="invalid-feedback">ФИО обязательно для заполнения</div>}
        </div>

        <div className="col-md-6">
          <input
            type="text"
            id="address"
            {...register("address", { required: true })}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            placeholder="Почта"
          />
          {errors.address && <div className="invalid-feedback">Почта обязательна для заполнения</div>}
        </div>

        <div className="col-md-6">
          <select
            id="paymentMethod"
            {...register("paymentMethod", { required: true })}
            className={`form-control ${errors.paymentMethod ? 'is-invalid' : ''}`}
          >
            <option value="">Выбрать метод оплаты</option>
            <option value="creditCard">Карта</option>
            <option value="cash">Наличные</option>
          </select>
          {errors.paymentMethod && <div className="invalid-feedback">Выбор метода оплаты обязателен</div>}
        </div>

        <div className="col-md-12 my-3">
          <ReCAPTCHA
            sitekey="6Levtv4pAAAAAF7P_7_2e28KBmbU5YoUW0IO_4W7"
            onChange={onRecaptchaChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={!isVerified}>Подтвердить</button>
        </div>
      </form>
    </motion.div>
  );
};

export default Order;