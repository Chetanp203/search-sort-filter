import React, { useContext, useState } from 'react'
import { AuthContext } from './Context/AuthContext';
import { useNavigate } from 'react-router';
import api from './ApiConfig';
import { toast } from 'react-hot-toast';

const AddEvent = () => {
    const [eventData,setEventData]= useState({name:""})
    const {state,dispatch} = useContext(AuthContext);
    const router = useNavigate();

    const handleChange = (event)=>{
        setEventData({...eventData,[event.target.name]:event.target.value})
    }


    const handleSubmit =async (event)=>{
        event.preventDefault();
        if(eventData?.name){
              const token = JSON.parse(localStorage.getItem("token"))
              try{
                const response = await api.post("/create-event",{token,eventData});
                if(response.data.success){
                  setEventData({name:""})
                  router("/")
                  toast.success(response.data.message)
                }
              }catch(error){

                  toast.error(error.response.data.message)
              }
        }else{
            toast.error("All fields are mandatory")
        }
    }
  return (
    <div style={{width:"30%",margin:"auto",textAlign:"center"}}>
<form onSubmit={handleSubmit}>
    <h1>Enter event</h1><br/>
    <input type="text" onChange={handleChange} name='name' value={eventData.name} style={{width:"100%"}}/>
    <br />
    <br />
    <input type="submit" value="Add Event" />
</form>
    </div>
  )
}

export default AddEvent