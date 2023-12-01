
import { useState } from "react"
import DefaultPage from "../default"

function Register_user() {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const [result, setResult] = useState({
        message:'',
        error:false
    })


    const CreateUser = async (e) =>{
        e.preventDefault()

        


        const response = await fetch('http://172.18.20.10:5001/register',{
            method:'POST',

            headers:{'Content-type':'application/json'},

            body:JSON.stringify({
                email: user?.email,
                password: user?.password
            })
        })



        if(response.ok){
            setResult({message:`Account created.`})

        } else {
            const data = await response.json()
            setResult({error:true , message:`Error creating account. ${data?.message}`})
        }
    }


  return (

    <DefaultPage>
        <form onSubmit={CreateUser} method='post'>

            <label htmlFor="">Email</label>
            <input onChange={(e) =>{setUser({...user, email: e.target.value})}} type="email" name='namemaile' id='email' />

            <label htmlFor="">Password</label>
            <input onChange={(e) =>{setUser({...user, password: e.target.value})}} type="password" name='password' id='password' />

            <br></br>

            <button type='submit'>Create account</button>

            <br />

            <p>
            {result?.error ? <span style={{color:'salmon'}}>{result?.message}</span> 
            : 
            <span style={{color:'green'}}>{result?.message}</span>}
            </p>


        </form>


    </DefaultPage>
  )
}

export default Register_user