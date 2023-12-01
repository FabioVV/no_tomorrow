
import DefaultPage from "../default"
import { useState } from "react"

function Login_user() {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const [teste, setTest] = useState({
        id:'',
        email:''
    })


    const LoginUser = async (e) =>{
        e.preventDefault()


        const response = await fetch('http://192.168.1.37:5001/login',{
            method:'POST',

            headers:{'Content-type':'application/json'},

            body:JSON.stringify({
                email: user?.email,
                password: user?.password
            })
        })



        if(response.ok){
            alert('Logged in!')
            const data = await response.json()
            setTest({id:data?.id, email:data?.email})
        } else {
            alert('Error!')
        }
    }





  return (
    <DefaultPage>
        <form onSubmit={LoginUser} method='post'>

            <label htmlFor="">Email</label>
            <input onChange={(e) =>{setUser({...user, email: e.target.value})}} type="email" name='namemaile' id='email' />

            <label htmlFor="">Password</label>
            <input onChange={(e) =>{setUser({...user, password: e.target.value})}} type="password" name='password' id='password' />

            <br />

            <button type='submit'>Login</button>
            
            <br />
            <br />
            <br />
            {teste?.id ? <span style={{color:'green'}}>ID sqlite - Flask: {teste?.id}</span> : ""}
            <br />
            {teste?.email ? <span style={{color:'green'}}>Email: {teste?.email}</span> : ""}

        </form>
    </DefaultPage>
  )
}

export default Login_user