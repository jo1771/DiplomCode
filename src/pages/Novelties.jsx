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
            const sortedProducts = [...data].sort((a, b) => {
                const dateA = a.meta?.createdAt ? new Date(a.meta.createdAt) : new Date(0);
                const dateB = b.meta?.createdAt ? new Date(b.meta.createdAt) : new Date(0);
                return dateB - dateA;
            });
            setProducts(sortedProducts);
        }
    }, [data]);

    return (
        <>
            <div className="novelties">
                <div className="novelties__wrap container">
                    <h1 className='novelties__wrap-title'>Новинки</h1>
                    <div className="novelties__wrap-cards">
                        {products.map((product) => (
                            <Link className="products__wrap-cards-card" key={product.id} to={`/productItem/${product?.id}`}>
                                <img src={product.thumbnail} alt="" />
                                <p className='products__wrap-cards-card-title'>{product.title}</p>
                                <p className='products__wrap-cards-card-price'>{product.price} $</p>
                                <p className='products__wrap-cards-card-quantity'>В наличии: {product.stock}</p>
                                <p className='products__wrap-cards-card-btn'>Купить</p>
                                <p className='products__wrap-cards-card-date'>{product.meta.createdAt.slice(0, 10)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Novelties;