import React, { useState } from 'react';
import minus from "../assets/images/minus.png";
import plus from "../assets/images/plus.png";
import deleteIcon from "../assets/images/delete.png";

const BasketProduct = ({ item, setProduct, calculateTotalPrice }) => {
    const [counter, setCounter] = useState(item.amount || 1);

    function removeFromCart(productId) {
        let basket = JSON.parse(localStorage.getItem('prodInBasket'));
        basket = basket.filter(product => product.id !== productId);
        setProduct(basket);
        localStorage.setItem('prodInBasket', JSON.stringify(basket));
        calculateTotalPrice(basket);
    }

    const handleCounter = (order) => {
        if (order === "+") {
            if (counter < item.stock) {
                setCounter(prevCounter => prevCounter + 1);
                item.amount = counter + 1;
            }
        } else if (order === "-") {
            if (counter > 1) {
                setCounter(prevCounter => prevCounter - 1);
                item.amount = counter - 1;
            }
        }
        let basket = JSON.parse(localStorage.getItem('prodInBasket'));
        basket = basket.map(product => 
            product.id === item.id ? { ...product, amount: item.amount } : product
        );
        localStorage.setItem('prodInBasket', JSON.stringify(basket));
        calculateTotalPrice(basket);
    }

    return (
        <div className="basket__wrap-order-left-card">
            <img src={item.img} alt="" />
            <div className="basket__wrap-order-left-card-desc">
                <div className="top">
                    <h4 className='title'>{item.title}</h4>
                    <button onClick={() => removeFromCart(item.id)} className='btn'>
                        <img src={deleteIcon} alt="" /> Удалить
                    </button>
                </div>
                <div className="basket__wrap-order-left-card-desc-bottom">
                    <p className='saler'><span>Продавец: </span>{item.saler}</p>
                    <div className="counter">
                        <button onClick={() => handleCounter("-")}>
                            <img src={minus} alt="" />
                        </button>
                        <p>{counter}</p>
                        <button onClick={() => handleCounter("+")}>
                            <img src={plus} alt="" />
                        </button>
                    </div>
                    <h3 className='price'>{(item.price * counter).toFixed(2)}$</h3>
                </div>
            </div>
        </div>
    );
}

export default BasketProduct;