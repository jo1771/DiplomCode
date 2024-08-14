import React, { useContext, useState } from 'react'
import star from "../assets/images/star.png";
import plus from "../assets/images/plus.png";
import minus from "../assets/images/minus.png";
import Comments from '../components/Comments';
import vectorLeft from "../assets/images/vectorLeft.png";
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const ProductItem = () => {
    const [counter, setCounter] = useState(1);

    const {setCurrentPage, setSortedProducts, sortedProducts} = useContext(Context)
    const prod = JSON.parse(localStorage.getItem('productItem'));

    const handleBack = () => {
        localStorage.removeItem('productItem');
        const storedCurrentPage = JSON.parse(localStorage.getItem('currentPage'));
        const storedSortedProducts = JSON.parse(localStorage.getItem('sortedProducts'));

        setCurrentPage(storedCurrentPage);
        setSortedProducts(storedSortedProducts);
    };

    const handleCounter = (order)=>{
        if (order === "+") {
            if (counter < prod.stock) {
                setCounter(counter + 1)
            }
        }
        if (order === "-") {
            if (counter > 1) {
                setCounter(counter - 1)
            }
        }
    }

    return (
        <>
            <div className="productItem container">
                <div className='productItem-img'>
                    <Link to={"/"} className="btnBack" onClick={()=>handleBack()}><img src={vectorLeft} alt="Назад" /> Вернуться назад</Link>
                    {
                        prod.images?.map((img, i)=>(
                            <img className='item' src={img} alt="" key={i} />
                        ))
                    }
                </div>
                <div className="productItem-desc">
                    <div className="productItem-desc-top">
                        <p className='productItem-desc-top-rating'><img src={star} alt="" />{(prod.rating).toFixed(1)} (Продано {prod.minimumOrderQuantity}шт)</p>
                        <h2 className="productItem-desc-top-title">
                            {prod.title}
                        </h2>
                        <p className='productItem-desc-top-saler'>Продавец: <a href=''>{prod.brand ? prod.brand : "Unknown"}</a></p>
                    </div>
                    <div className="productItem-desc-bottom">
                        <div className="productItem-desc-bottom-amount">
                            <p className='productItem-desc-bottom-amount-text'>Количество: </p>
                            <div className="productItem-desc-bottom-amount-bottom">
                                <div className="productItem-desc-bottom-amount-counter">
                                    <button  onClick={()=>handleCounter("-")}>
                                        <img src={minus} alt="" />
                                    </button>
                                    <p>{counter}</p>
                                    <button onClick={()=>handleCounter("+")}>
                                        <img src={plus} alt="" />
                                    </button >
                                </div>
                                <p className='productItem-desc-bottom-amount-quantity'>В наличии {prod.stock}</p>
                            </div>
                        </div>
                        <div className="productItem-desc-bottom-dime">
                            <p className='productItem-desc-bottom-dime-text'>Цена: </p>
                            <div className="productItem-desc-bottom-dime-bottom">
                                <h3 className='productItem-desc-bottom-dime-price'>{prod.price}$</h3>
                                <p className='productItem-desc-bottom-dime-discount'>{(prod.price + (prod.price * prod.discountPercentage / 100)).toFixed(2)}$</p>
                            </div>
                        </div>
                        <button className='productItem-desc-bottom-basket'>Добавить в корзину</button>
                        <div className="productItem-desc-bottom-comments">
                            {
                                prod.reviews.map((comm, i)=>(
                                    <Comments key={i} comm={comm}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem