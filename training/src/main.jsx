import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/home';
import Products from './pages/products/products';
import Products_layout from './components/products_layout';
import ProductNew from './pages/products/new_product';
import Edit_product from './pages/products/edit_product';

import Register_user from './pages/auth/register_user';
import Login_user from './pages/auth/login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login_user/>}></Route>
        <Route path='/register' element={<Register_user/>}></Route>



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
