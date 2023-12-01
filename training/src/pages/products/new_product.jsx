import React, { useState } from 'react'
import DefaultPage from '../default'

function ProductNew() {

    const [product, setProduct] = useState({
        name:'',
        price:''
    })

    const CreateNew = async (e) => {
        e.preventDefault();


        await fetch('http://192.168.100.190:5001/products/new', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            
            body:JSON.stringify({
                name: product?.name,
                price: product?.price
            })
        })

    }

  return (
    <DefaultPage>
        <form onSubmit={CreateNew} method='post'>

            <label htmlFor="">Name</label>
            <input onChange={(e) =>{setProduct({...product, name: e.target.value})}} type="text" name='name' id='name' />

            <label htmlFor="">Price</label>
            <input onChange={(e) =>{setProduct({...product, price: e.target.value})}} type="text" name='price' id='price' />
            
            <br></br>

            <button type='submit'>Send</button>

        </form>
    </DefaultPage>
  )
}

export default ProductNew