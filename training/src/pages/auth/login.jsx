
import DefaultPage from "../default"
import { useState } from "react"

function Login_user() {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const [currentUser, setCurrentUser] = useState({
        id:'',
        email:''
    })

    const [result, setResult] = useState({
        message:'',
        error:false
    })


    const LoginUser = async (e) =>{
        e.preventDefault()

        if(user?.email.trim() == ""){
            setResult({error:true , message:'Email field is empty.'})
            return false;
        }

        if(user?.password.trim() == ""){
            setResult({error:true , message:'Password field is empty.'})
            return false;

        }


        const response = await fetch('http://172.18.20.10:5001/login',{
            method:'POST',

            headers:{'Content-type':'application/json'},

            body:JSON.stringify({
                email: user?.email,
                password: user?.password
            })
        })



        if(response.ok){
            window.location.href = '/products'
            const data = await response.json()
            setCurrentUser({id:data?.id, email:data?.email})

        } else {
            setResult({error:true , message:'Email or password incorrect.'})
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

            <p>
            {result?.error ? <span style={{color:'salmon'}}>{result?.message}</span> 
            : 
            <span style={{color:'green'}}>{result?.message}</span>}
            </p>
    
            <br />

            {currentUser?.id ? <span style={{color:'green'}}>ID sqlite - Flask: {currentUser?.id}</span> : ""}
            <br />
            {currentUser?.email ? <span style={{color:'green'}}>Email: {currentUser?.email}</span> : ""}

        </form>
    </DefaultPage>
  )
}

export default Login_user