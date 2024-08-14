import React from 'react'
import basket from "../assets/images/basket.png";
import logo from "../assets/images/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div className="header">
                <div className="header__wrap container">
                    <div className="header__wrap-logo">
                        <Link to={'/'}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <ul className="header__wrap-nav">
                        <li className="header__wrap-nav-item">
                            <a href="">Новинки</a>
                        </li>
                        <li className="header__wrap-nav-item">
                            <a href="">Категории</a>
                        </li>
                        <li className="header__wrap-nav-item">
                            <a href="">Скидки</a>
                        </li>
                        <li className="header__wrap-nav-item">
                            <a href="">Контакты</a>
                        </li>
                        <li className="header__wrap-nav-item">
                            <a href="">О нас</a>
                        </li>
                    </ul>
                    <img src={basket} alt="" />
                </div>
            </div>
        </>
    )
}

export default Navbar