import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../store/products/productsSlice';

const Novelties = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (data && data.length > 0) {
            const filteredProducts = data.filter(product => product.discountPercentage > 16);
            setProducts(filteredProducts);
        }
    }, [data]);

    return (
        <>
            <div className="novelties">
                <div className="novelties__wrap container">
                    <h1 className='novelties__wrap-title'>Скидки</h1>
                    <div className="novelties__wrap-cards">
                        {products?.map((product) => (
                            <Link className="products__wrap-cards-card" key={product?.id} to={`/productItem/${product?.id}`}>
                                <img src={product?.thumbnail} alt="" />
                                <p className='products__wrap-cards-card-title'>{product?.title}</p>
                                <p className='products__wrap-cards-card-price'>{product?.price} $</p>
                                <p className='products__wrap-cards-card-quantity'>В наличии: {product?.stock}</p>
                                <p className='products__wrap-cards-card-btn'>Купить</p>
                                <p className='products__wrap-cards-card-date'>{product?.discountPercentage}%</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Novelties;