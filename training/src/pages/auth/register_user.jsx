
import { useState } from "react"
import DefaultPage from "../default"

function Register_user() {

    const [user, setUser] = useState({
        email:'',
        password:''
    })


    const CreateUser = async (e) =>{
        e.preventDefault()


        const response = await fetch('http://192.168.1.37:5001/register',{
            method:'POST',

            headers:{'Content-type':'application/json'},

            body:JSON.stringify({
                email: user?.email,
                password: user?.password
            })
        })



        if(response.ok){
            alert('account created!')

        } else {
            alert('Error creating account!')
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

        </form>


    </DefaultPage>
  )
}

export default Register_user