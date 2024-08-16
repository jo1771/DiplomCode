import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory, getCategories, setCategory } from '../store/categories/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const { data, prodByCategory } = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const openCardItem = ()=>{
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        localStorage.setItem('sortedProducts', JSON.stringify(sortedProducts));
    }

    return (
        <>
            <div className="catigories">
                <div className="catigories__wrap container">
                    <div className="catigories__wrap-title">
                        Категории
                    </div>
                    <div className="catigories__wrap-desc">
                        <div className="catigories__wrap-desc-items">
                            {categories?.map((item, i) => (
                                <h2
                                    onClick={() => {
                                        dispatch(setCategory(item.slug));
                                        dispatch(fetchProductsByCategory(item.slug));
                                    }}
                                    key={i}
                                >
                                    {item.name}
                                </h2>
                            ))}
                        </div>
                        <div className="products">
                            {prodByCategory?.map((item, i) => (
                                <Link key={i} to={`/productItem/${item?.id}`} onClick={()=>openCardItem()} className="products__wrap-cards-card">
                                    <img src={item.thumbnail} alt="" />
                                    <p className='products__wrap-cards-card-title'>{item.title}</p>
                                    <p className='products__wrap-cards-card-price'>{item.price} $</p>
                                    <p className='products__wrap-cards-card-quantity'>В наличии: {item.stock}</p>
                                    <p className='products__wrap-cards-card-btn'>Купить</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categories;