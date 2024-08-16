import React, { useState, useEffect } from 'react'
import BasketProduct from '../components/BasketProduct';
import { Link } from 'react-router-dom';

const Basket = () => {
    const [product, setProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = (products) => {
        const total = products.reduce((sum, item) => sum + item.price * item.amount, 0);
        setTotalPrice(total.toFixed(2));
    };

    useEffect(() => {
        let stored = JSON.parse(localStorage.getItem('prodInBasket'));
        if (stored) {
            setProduct(stored);
            calculateTotalPrice(stored);
        }
    }, []);

    return (
        <div className="basket">
            <div className="basket__wrap container">
                {
                    product.length ? (
                        <>    
                        <h2 className='basket__wrap-title'>Ваша корзина, <span>{product.length} товар</span></h2>
                        <div className="basket__wrap-order">
                            <div className="basket__wrap-order-left">
                                {product?.map((item) => (
                                    <BasketProduct
                                        item={item}
                                        key={item.id}
                                        setProduct={setProduct}
                                        calculateTotalPrice={calculateTotalPrice}
                                    />
                                ))}
                            </div>
                            <div className="basket__wrap-order-right">
                                <h4 className='title'>Ваш заказ</h4>
                                <p>Итого ({product.length}): <span>{totalPrice}$</span></p>
                                <button onClick={()=>{
                                    setProduct([]), localStorage.removeItem('prodInBasket')
                                }}>Заказать</button>
                            </div>
                        </div>
                    </>
                    ) : (
                        <>
                            <div className="basket__wrap-title2">
                                <h1 className='basket__wrap-title-item'>Корзина пока пуста😔</h1>
                                <Link to={"/"}>
                                    <button className='btn'>Вернуться на главную</button>
                                </Link>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Basket;