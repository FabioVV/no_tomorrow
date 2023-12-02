import { useState } from 'react'
import DefaultPage from '../default'

function ProductNew() {

    const [product, setProduct] = useState({
        name:'',
        phone:''
    })

    const [result, setResult] = useState({
        message:'',
        error:false
    })

    const CreateNew = async (e) => {
        e.preventDefault();

        if(product?.name.length > 20){
            setResult({message:`Error creating product. Name length exceeds 20 characters.`, error:true})
            return false
        }

        if(product?.phone.length > 20){
            setResult({message:`Error creating product. Phone length exceeds 20 characters.`, error:true})
            return false
        }


        const response = await fetch('http://172.18.20.10:5001/products/new', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            
            body:JSON.stringify({
                name: product?.name,
                phone: product?.phone
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

            <label htmlFor="">Phone</label>
            <input onChange={(e) =>{setProduct({...product, phone: e.target.value})}} type="text" name='phone' id='phone' />
            
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