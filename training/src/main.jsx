import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/home';
import Products from './pages/products/products';
import Products_layout from './components/products_layout';
import ProductNew from './pages/products/new_product';
import Edit_product from './pages/products/edit_product';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<Products_layout/>}>
          <Route index element={<Products/>}></Route>
          <Route path=':id' element={<h1>PRODUTO</h1>}></Route>
          <Route path='new' element={<ProductNew/>}></Route>
          <Route path='edit/:id' element={<Edit_product/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
