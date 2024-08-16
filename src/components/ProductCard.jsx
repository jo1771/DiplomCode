import React, { useContext } from 'react'
import ContentLoader from "react-content-loader"
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'

const ProductCard = ({ prod, isLoading }) => {
    
    const {sortedProducts, currentPage} = useContext(Context)

    const openCardItem = ()=>{
        localStorage.setItem('currentPage', JSON.stringify(currentPage));
        localStorage.setItem('sortedProducts', JSON.stringify(sortedProducts));
    }

    return (
        <>
            <Link to={`/productItem/${prod?.id}`} onClick={()=>openCardItem()} className="products__wrap-cards-card">
                {
                    isLoading ? (
                        <ContentLoader 
                            speed={1}
                            width={280}
                            height={363}
                            viewBox="0 0 280 363"
                            backgroundColor="#dddada"
                            foregroundColor="#ffffff">
                            <rect x="0" y="0" rx="10" ry="10" width="278" height="278" /> 
                            <rect x="0" y="288" rx="5" ry="5" width="278" height="20" /> 
                            <rect x="0" y="315" rx="5" ry="5" width="110" height="20" /> 
                            <rect x="0" y="340" rx="5" ry="5" width="150" height="20" /> 
                            <rect x="170" y="340" rx="5" ry="5" width="110" height="20" />
                        </ContentLoader>
                    ) : (
                        <>
                        <img src = {prod.thumbnail} alt="" />
                        <p className='products__wrap-cards-card-title'>{prod.title}</p>
                        <p className='products__wrap-cards-card-price'>{prod.price} $</p>
                        <p className='products__wrap-cards-card-quantity'>В наличии: {prod.stock}</p>
                        <p className='products__wrap-cards-card-btn'>Купить</p>
                    </>
                )
                }
            </Link>
        </>
    )
}

export default ProductCard