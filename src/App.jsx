import { useState } from 'react'
import React from 'react'
import Navbar from './components/Navbar.jsx'
import Products from './pages/Products.jsx'
import { Context } from './context/Context.jsx'
import { Route, Routes } from "react-router-dom";
import ProductItem from './pages/ProductItem.jsx'
import Basket from './pages/Basket.jsx'
import Categories from './pages/Categories.jsx'

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);

  return (
    <>
      <Context.Provider value={{
        currentPage,
        setCurrentPage,
        sortedProducts,
        setSortedProducts
      }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/productItem/:id' element={<ProductItem />} />
          <Route path='/basket' element={<Basket/>} />
          <Route path='/categories' element={<Categories/>} />
        </Routes>
      </Context.Provider>
    </>
  )
}

export default App