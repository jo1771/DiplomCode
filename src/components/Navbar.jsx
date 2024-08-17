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
                        <Link to={'/Diplom'}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <ul className="header__wrap-nav">
                        <li className="header__wrap-nav-item">
                            <Link to={'/novelties'}>Новинки</Link>
                        </li>
                        <li className="header__wrap-nav-item">
                            <Link to={'/categories'}>Категории</Link>
                        </li>
                        <li className="header__wrap-nav-item">
                            <Link to={'/discounts'}>Скидки</Link>
                        </li>
                        <li className="header__wrap-nav-item">
                            <Link to={'/contacts'}>Контакты</Link>
                        </li>
                        <li className="header__wrap-nav-item">
                            <Link to={'/aboutUs'}>О нас</Link>
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