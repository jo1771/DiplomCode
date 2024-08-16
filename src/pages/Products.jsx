import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import vector from "../assets/images/vector.png";
import vectorRight from "../assets/images/vectorRight.png";
import vectorLeft from "../assets/images/vectorLeft.png";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/products/productsSlice';
import { Context } from '../context/Context';

const Products = () => {
    const { currentPage, setCurrentPage, sortedProducts, setSortedProducts } = useContext(Context)

    const { data } = useSelector((state) => state.products);

    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true)
    const [modalSortOpen, setModalSortOpen] = useState(false);
    const dispatch = useDispatch();

    const skipPages = 12;

    useEffect(() => {
        setIsLoading(true)
        dispatch(getProducts());
        localStorage.removeItem("productItem")
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            setProducts(data);
            setSortedProducts(JSON.parse(localStorage.getItem('sortedProducts')) ? JSON.parse(localStorage.getItem('sortedProducts')) : products);
            setIsLoading(false);    
        }
    }, [data, products]);

    useEffect(() => {
        handleCurrentProds();
    }, [currentPage, sortedProducts])
    

    const sortProducts = (order) => {
        setIsLoading(true)
        let sorted = [...products];
        if (order === 'name') {
            sorted.sort((a, b) => a.title.localeCompare(b.title)); 
        } else if (order === 'price') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (order === 'quantity') {
            sorted.sort((a, b) => b.stock - a.stock);
        }
        setSortedProducts(sorted);
        setModalSortOpen(false);
        setCurrentPage(0);
        setTimeout(() => {
            setIsLoading(false)
        }, 600);
    };

    const handleCurrentProds = () => {
        const startSlice = skipPages * currentPage;
        const endSlice = startSlice + skipPages;
        setCurrentProducts(sortedProducts.slice(startSlice, endSlice));
    };

    const handlePages = (order) => {
        if (order === "+") {
            if (currentPage < Math.ceil(products.length / 13)) {
                setIsLoading(true)
                setCurrentPage(currentPage + 1);
            }
        } else if (order === "-") {
            if (currentPage > 0) {
                setIsLoading(true)
                setCurrentPage(currentPage - 1);
            }
        }
        setTimeout(() => {
            setIsLoading(false) 
        }, 600);
    };
    

    const renderProducts = () => {
        if (isLoading) {
            return [...Array(12)].map((_, index) => (
                <ProductCard key={index} isLoading={true} />
            ));
        }
        return currentProducts.map((prod, i) => (
            <ProductCard prod={prod} key={i} isLoading={false}/>
        ));
    };
    return (
        <>
            <div className="products">
                <div className="products__wrap container">
                    <div className="products__wrap-sort">
                        <div className="products__wrap-sort-left">
                            <div onClick={() => setModalSortOpen(!modalSortOpen)} className="products__wrap-sort-left-item">
                                <p className='products__wrap-sort-left-item-text'>Сортировать по: </p>
                                <img src={vector} alt="" />
                            </div>
                            {modalSortOpen && (
                                <div className={`modalsort ${modalSortOpen && "active" }`}>
                            <p onClick={() => sortProducts('price')} className='modalsort-text'>Цене</p>
                            <p onClick={() => sortProducts('name')} className='modalsort-text'>Названию</p>
                            <p onClick={() => sortProducts('quantity')} className='modalsort-text'>Кол-ву</p>
                        </div>
                            )}
                    </div>
                    <p onClick={()=>{setSortedProducts(products), setCurrentPage(0)}} className="products__wrap-sort-right">
                        Общее кол-во товаров-100
                    </p>
                </div>
                <div className="products__wrap-cards">
                    {
                        renderProducts()
                    }
                </div>
                <div className="skip">
                    <img onClick={() => handlePages('-')} className="skip-btn" src={vectorLeft} alt="" />
                    <p className='skip-counter'>Страница: {currentPage + 1}</p>
                    <img onClick={() => handlePages('+')} className="skip-btn" src={vectorRight} alt="" /> 
                </div>
            </div>
        </div >
        </>
    )
}

export default Products;