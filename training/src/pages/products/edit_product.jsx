
import { useState } from "react"
import DefaultPage from "../default"
import { useParams } from "react-router-dom"


function Edit_product() {

    const {id} = useParams()

    const [product, setProduct] = useState({
        name:'',
        phone:''
    })

    const [result, setResult] = useState({
        message:'',
        error:false
    })

    useState(()=>{
        const get_product = async (id) => {


            if(product?.name.length > 20){
                setResult({message:`Error creating product. Name length exceeds 20 characters.`, error:true})
                return false
            }
    
            if(product?.phone.length > 20){
                setResult({message:`Error creating product. Phone length exceeds 20 characters.`, error:true})
                return false
            }
    
            const response = await fetch(`http://172.18.20.10:5001/products/${id}`, {
              method: 'GET',
              headers:{'Content-Type': 'application/json'},
            }) 
        
        
            if(response.ok){
        
                const data = await response.json()
                setProduct({
                    name:data?.name,
                    phone:data?.phone,
                })

            }
        
        }

        if(id)
            get_product(id)
    },[id])

    
    const handleEdit = async (e) => {
        e.preventDefault()

        const response = await fetch(`http://172.18.20.10:5001/products/${id}`,{
            
            method:'PATCH',
            headers:{'Content-type':'application/json'},

            body:JSON.stringify({
                name:product?.name,
                phone:product?.phone,

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

            <label htmlFor="">Phone</label>
            <input value={product?.phone} onChange={(e) =>{setProduct({...product, phone: e.target.value})}} type="text" name='phone' id='phone' />

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