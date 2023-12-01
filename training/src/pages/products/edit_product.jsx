
import { useState } from "react"
import DefaultPage from "../default"
import { useParams } from "react-router-dom"


function Edit_product() {

    const {id} = useParams()

    const [product, setProduct] = useState({
        name:'',
        price:''
    })

    const [result, setResult] = useState({
        message:'',
        error:false
    })

    useState(()=>{
        const get_product = async (id) => {
    
            const response = await fetch(`http://192.168.1.37:5001/products/${id}`, {
              method: 'GET',
              headers:{'Content-Type': 'application/json'},
            }) 
        
        
            if(response.ok){
        
                const data = await response.json()
                setProduct({
                    name:data?.name,
                    price:data?.price,
                })

            }
        
        }

        if(id)
            get_product(id)
    },[id])

    
    const handleEdit = async (e) => {
        e.preventDefault()

        const response = await fetch(`http://192.168.1.37:5001/products/${id}`,{
            
            method:'PATCH',
            headers:{'Content-type':'application/json'},

            body:JSON.stringify({
                name:product?.name,
                price:product?.price,

            })
        })

        if(response.ok){
            setResult({message:'Product updated successfully!'})

        } else {
            const error_message = await response.json()
            setResult({message:`Error creating product. ${error_message['error']}`, error:true})
        }
    }


  return (
    <DefaultPage>
        <form onSubmit={handleEdit}>

            <label htmlFor="">Name</label>
            <input value={product?.name} onChange={(e) =>{setProduct({...product, name: e.target.value})}} type="text" name='name' id='name' />

            <label htmlFor="">Price</label>
            <input value={product?.price} onChange={(e) =>{setProduct({...product, price: e.target.value})}} type="text" name='price' id='price' />

            <br></br>

            <button type='submit'>Save</button>

        </form>

        <p>
        {result?.error ? <span style={{color:'salmon'}}>{result?.message}</span> 
        : 
        <span style={{color:'green'}}>{result?.message}</span>}
        </p>
    </DefaultPage>
  )

}

export default Edit_product