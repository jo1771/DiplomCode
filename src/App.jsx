import { useState } from 'react'
import React from 'react'
import Navbar from './components/Navbar.jsx'
import Products from './pages/Products.jsx'
import { Context } from './context/Context.jsx'
import { Route, Routes } from "react-router-dom";
import ProductItem from './pages/ProductItem.jsx'

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);

  return (
    <>
      <Context.Provider value={{
        currentPage,
        setCurrentPage,
        sortedProducts,
        setSortedProducts,
      }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/productItem' element={<ProductItem />} />
        </Routes>
      </Context.Provider>
    </>
  )
}

export default App
