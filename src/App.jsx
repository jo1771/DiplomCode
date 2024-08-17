import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import { Context } from './context/Context';
import { Route, Routes } from 'react-router-dom';
import ProductItem from './pages/ProductItem';
import Basket from './pages/Basket';
import Categories from './pages/Categories';
import Novelties from './pages/Novelties';
import AboutUs from './pages/AboutUs';
import Contacts from './pages/Contacts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Discounts from "./pages/Discounts";

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
          <Route path='/Diplom' element={<Products />} />
          <Route path='/productItem/:id' element={<ProductItem />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/novelties' element={<Novelties />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/discounts' element={<Discounts/>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Context.Provider>
    </>
  );
};

export default App;