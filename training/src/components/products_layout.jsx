import React from 'react'
import { Link, Outlet } from 'react-router-dom'




function Products_layout() {
  return (
    <>
        <Outlet/>

        <ul>
            <li><Link to='/products/new'>New product</Link></li>
        </ul>

    </>
  )
}

export default Products_layout