import React, { useEffect } from 'react'
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
                            <Link to={'/categories'}>Категории</Link>
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
                    <Link to={'/basket'}> 
                        <img src={basket} alt="" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar