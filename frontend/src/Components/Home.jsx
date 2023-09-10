import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext';
import { useNavigate } from 'react-router';
import api from './ApiConfig';

const Home = () => {
  const {state}= useContext(AuthContext);
  const[page,setPage]=useState(1);
  const[order,setOrder]=useState("1")
  const[name,setName]=useState("")
  // console.log(state?.user,"user here");
  const [allEvents, setAllEvents] = useState([]);

  console.log(allEvents);

  const router = useNavigate();

  useEffect(() => {
    async function totalEvents() {
      try {
        const response = await api.post("/all-events",{page,order,name})
        console.log(response)
        if (response?.data?.success) {
          setAllEvents(response?.data?.events);
        }
      } catch (error) {
        console.log(error);
      }
    }
    totalEvents();
  }, [page,order,name]);
  return (
    <>
    <div style={{width:"100%",textAlign:"center"}}>
      <div>
        <h1>Hello : {state?.user?.name}</h1>

        {/* {state?.user ? (
          <button onClick={() => logout()}>LOGOUT</button>
        ) : (
          <button onClick={() => router("/login")}>Login</button>
        )} */}
      </div>

        <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Search Event' style={{padding:"5px 10px",marginTop:"10px",width:"300px"}}/>
      {allEvents?.length ? (
        <div
          style={{
            display: "flex",
            marginTop: "2%",
            flexWrap: "wrap",
            gap: "40px 0",
            justifyContent:"space-around"
          }}
        >
          {allEvents.map((event) => (
            <div  key={event._id} style={{width:"18%",border:"1px solid #ccc",margin:"10px",borderRadius:"10px",cursor:"pointer",padding:"20px"}}>
              <h2>Title :-{event.name}</h2>
              <h4>Date -:{event.date}</h4>
            </div>
          ))}
        </div>
      ) : (
        <div>No Events</div>
      )}
      <button onClick={()=>setPage(page+1)}>Next page</button>
      <br />
      <br />
      <select onChange={(e)=>setOrder(e.target.value)} style={{padding:"3px 10px"}}>
     <option value="1">Ascending </option>
     <option value="-1">Descending</option>
      </select>
      <br />
    </div>
  </>
);
};

export default Home