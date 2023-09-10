import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from './Context/AuthContext';
import api from './ApiConfig';  

const Register = () => {
    const [userData,setUserData]= useState({name:"", email:"", password:""})
    const {state,dispatch} = useContext(AuthContext);
    const router = useNavigate();

    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }

    const handleSelectChange =(event)=>{
        setUserData({...userData,"role": event.target.value})
    }

    console.log(userData,"-userdata")

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(userData.name && userData.email && userData.password){
          
            try {
              const response = await api.post("/register",{userData});
              if(response.data.success){
                setUserData({name:"", email:"", password:""})
                // router("/login")
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }
            } catch (error) {
              toast.error(error.response.data.message)
            }
        }else{
            toast.error("All fields are mandatory")
        }
    }

    // useEffect(()=>{
    //   if(state?.user?.name){
    //     router("/")
    //   }
    //   },[state])
  return (
    <div className='reg-con'>
        <form className='form-con' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <hr />
            <label>Name:</label><br />
            <input type="text" placeholder='Username' name='name' onChange={handleChange} value={userData.name} /><br />
            <label>Email:</label><br />
            <input type="email" placeholder='Email ID' name='email' onChange={handleChange} value={userData.email} /><br />
           <label>Password:</label><br />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} value={userData.password}/><br />
            <input className='sub' type="submit" value="Register"/>
            <span>Already have an account?<span onClick={()=>router("/login")}><b>Login Here!!</b></span></span>
        </form>
    </div>
  )
}

export default Register