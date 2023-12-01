import { useState } from 'react'
import DefaultPage from '../default'

function ProductNew() {

    const [product, setProduct] = useState({
        name:'',
        price:''
    })

    const [result, setResult] = useState({
        message:'',
        error:false
    })

    const CreateNew = async (e) => {
        e.preventDefault();


        const response = await fetch('http://192.168.1.37:5001/products/new', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            
            body:JSON.stringify({
                name: product?.name,
                price: product?.price
            })
        })

        if(response.ok){
            setResult({message:'Product created successfully!'})
        } else {
            const error_message = await response.json()
            setResult({message:`Error creating product. ${error_message['error']}`, error:true})
        }

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

        <p>
            {result?.error ? <span style={{color:'salmon'}}>{result?.message}</span> 
            : 
            <span style={{color:'green'}}>{result?.message}</span>}
        </p>
    </DefaultPage>
  )
}

export default ProductNew