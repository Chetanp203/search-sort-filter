import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import api from './ApiConfig';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [userData,setUserData]= useState({ email:"", password:""})
    const {state,dispatch} = useContext(AuthContext);
    const router = useNavigate();


    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }
    // console.log(userData,"-userdata")

    const handleSubmit =async (event)=>{
        event.preventDefault();
        if( userData.email && userData.password ) {
              const response = await api.post("/login",{userData});
              if(response.data.success){
                dispatch({
                  type:'LOGIN',
                  payload : response.data.user
                })
                localStorage.setItem("token",JSON.stringify(response.data.token))
                setUserData({email:"",password:""})
                router("/")
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }
        }else{
            toast.error("All fields are mandatory")
        }
}

useEffect(()=>{
if(state?.user?.name){
  router("/")
}
},[state])
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email ID:</label><br />
            <input type="email" name='email' value={userData.email} onChange={handleChange} /><br />
            <label>Password:</label><br />
            <input type="password" name='password' value={userData.password} onChange={handleChange}/><br />
            <input type="submit" value="Login" /><br />
            <button onClick={()=>router('/register')}>Register</button>
            
        </form>
    </div>
  )
}

export default Login