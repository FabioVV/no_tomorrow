import React, { useEffect, useState } from 'react'
import DefaultPage from '../default'



function Products_listing({data, action_delete}){

  
  
  return (
    <tbody>
      {data?.map((product) => (
        <tr>
          <td>
            {product?.id}
          </td>

          <td>
            {product?.name}
          </td>

          <td>
            {product?.price}
          </td>

          <td>
            <span onClick={()=>action_delete({id:product?.id})} style={{color:'red', cursor:'pointer'}}>X</span>
          </td>
        </tr>
      ))}
    </tbody>
  )
}


function Products() {

  const [products, setProducts] = useState([])

  const get_products = async () => {
    
    const response = await fetch(`http://192.168.100.190:5001/products`, {
      method: 'GET',
      headers:{'Content-Type': 'application/json'},
    }) 


    if(response.ok){

      const data = await response.json()

      setProducts(data)
    }

  }

  const delete_products = async ({id}) => {
    
    const response = await fetch(`http://192.168.100.190:5001/products/${id}`, {
      method: 'DELETE',
      headers:{'Content-Type': 'application/json'},
    }) 

    if(response.ok){
      get_products()
    }
  
  }
  

  useEffect(()=>{
    get_products()
  },[])


  return (
    <DefaultPage>
      <table>
        <thead>
          <tr>
            <td>ID do produto</td>
            <td>Nome do produto</td>
            <td>Preço do produto</td>
          </tr>
        </thead>

        <Products_listing action_delete={delete_products} data={products}/>

        {/* AJAX */}
      </table>
        
    </DefaultPage>
  )
}



export default Products