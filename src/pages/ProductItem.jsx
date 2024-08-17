import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import axios from 'axios';
import star from '../assets/images/star.png';
import plus from '../assets/images/plus.png';
import minus from '../assets/images/minus.png';
import Comments from '../components/Comments';
import vectorLeft from '../assets/images/vectorLeft.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ProductItem = () => {
  const [counter, setCounter] = useState(1);
  const [productDetails, setProductDetails] = useState({});
  const [prodInBasket, setProdInBasket] = useState(JSON.parse(localStorage.getItem('prodInBasket')) || []);

  const { id } = useParams();
  const { setCurrentPage, setSortedProducts } = useContext(Context);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      setProductDetails(data);
    } catch (error) {
      console.error("Ошибка при получении данных продукта:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleBack = () => {
    setCurrentPage(JSON.parse(localStorage.getItem('currentPage')));
    setSortedProducts(JSON.parse(localStorage.getItem('sortedProducts')));
  };

  const handleCounter = (order) => {
    if (order === "+") {
      if (counter < productDetails.stock) {
        setCounter(counter + 1);
      }
    } else if (order === "-") {
      if (counter > 1) {
        setCounter(counter - 1);
      }
    }
  };

  if (!productDetails.title) {
    return <div className='loading container'>Загрузка...</div>;
  }

  const addToBasket = () => {
    if (productDetails) {
      const product = {
        id: productDetails.id,
        title: productDetails.title,
        img: productDetails.thumbnail,
        amount: counter,
        price: productDetails.price,
        saler: productDetails.brand || "Unknown",
        stock: productDetails.stock
      };

      let basket = JSON.parse(localStorage.getItem('prodInBasket')) || [];
      const existingProductIndex = basket.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        basket[existingProductIndex].amount += counter;
      } else {
        basket.push(product);
      }

      setProdInBasket(basket);
      localStorage.setItem('prodInBasket', JSON.stringify(basket));
      toast.success('Товар добавлен в корзину');
    }
  };


    return (
        <div className="productItem container">
            <div className='productItem-img'>
                <Link to={"/Diplom"} className="btnBack" onClick={handleBack}>
                    <img src={vectorLeft} alt="Назад" /> Вернуться назад
                </Link>
                {productDetails?.images?.map((img, i) => (
                    <img className='item' src={img} alt="" key={i} />
                ))}
            </div>
            <div className="productItem-desc">
                <div className="productItem-desc-top">
                    <p className='productItem-desc-top-rating'>
                        <img src={star} alt="" />{productDetails?.rating?.toFixed(1)} (Продано {productDetails?.minimumOrderQuantity}шт)
                    </p>
                    <h2 className="productItem-desc-top-title">
                        {productDetails?.title}
                    </h2>
                    <p className='productItem-desc-top-descr'>{productDetails?.description}</p>
                    <p className='productItem-desc-top-saler'>Продавец: <a href=''>{productDetails?.brand ? productDetails.brand : "Unknown"}</a></p>
                </div>
                <div className="productItem-desc-bottom">
                    <div className="productItem-desc-bottom-amount">
                        <p className='productItem-desc-bottom-amount-text'>Количество: </p>
                        <div className="productItem-desc-bottom-amount-bottom">
                            <div className="counter">
                                <button onClick={() => handleCounter("-")}>
                                    <img src={minus} alt="" />
                                </button>
                                <p>{counter}</p>
                                <button onClick={() => handleCounter("+")}>
                                    <img src={plus} alt="" />
                                </button >
                            </div>
                            <p className='productItem-desc-bottom-amount-quantity'>В наличии {productDetails?.stock}</p>
                        </div>
                    </div>
                    <div className="productItem-desc-bottom-dime">
                        <p className='productItem-desc-bottom-dime-text'>Цена: </p>
                        <div className="productItem-desc-bottom-dime-bottom">
                            <h3 className='productItem-desc-bottom-dime-price'>{(productDetails?.price * counter).toFixed(2)}$</h3>
                            <p className='productItem-desc-bottom-dime-discount'>
                                {(productDetails?.price + (productDetails?.price * productDetails?.discountPercentage / 100)).toFixed(2)}$
                            </p>
                        </div>
                    </div>
                    <button onClick={() => addToBasket()} className='productItem-desc-bottom-basket'>Добавить в корзину</button>
                    <div className="productItem-desc-bottom-comments">
                        {productDetails?.reviews?.map((comm, i) => (
                            <Comments key={i} comm={comm} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;