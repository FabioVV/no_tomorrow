import { useEffect, useState } from 'react'
import DefaultPage from '../default'
import { Link } from 'react-router-dom'

export const Home = () => {

    const [user, setUser] = useState({
      id:'',
      email:''
    })
  
    useEffect(()=>{
      const getUser = async()=>{
        const response = await fetch('http://192.168.1.37:5001/@me',{
          method:'GET',
          headers:{'Content-type':'application/json'},
        })  

        if(response.ok){
          const data = await response.json()

          setUser({
            id:data?.id,
            email:data?.email
          })
        }
      }
      getUser()
    },[])

 

  return (
    <DefaultPage>
        <div>Hello, world!</div>



        {user?.id != '' ? 
          <div>Welcome, {user?.id}!</div>
        :
        <>
          <div>You are not logged in</div>

          <Link to='/login'>Login</Link>
          <br></br>
          <Link to='/register'>Register</Link>
        </>
        }
        




    </DefaultPage>
  )
}
