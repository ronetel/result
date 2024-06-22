import React from 'react';
import { Link } from 'react-router-dom';
import myImage from "./logo3.svg";


const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={myImage} alt="Genshin Impact" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/catalog">Каталог</Link>
            </li>
            <li>
              <Link to="/favorites">Избранное</Link>
            </li>
            <li>
              <Link to="/cart">Корзина</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
