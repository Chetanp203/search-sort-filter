import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import { useNavigate } from 'react-router';

const Navbar = () => {
  const router = useNavigate();
    const {state,dispatch} =useContext(AuthContext);
  return (
    <div style={{width:'100%',height:'50px',display:'flex',justifyContent:"space-around",borderBottom:"1px solid black",alignItems:"center"}}>
        <h1 onClick={()=>router('/')}>Awdiz</h1>
        <h4 onClick={()=>router('/add-event')}>Add Event</h4>
        <h4 onClick={()=>{dispatch({type:'LOGOUT',})}}>Logout</h4>

    </div>
  )
}

export default Navbar