import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import AddEvent from './Components/AddEvent';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route exact path='/add-event' element={<AddEvent/>}/>
      <Route exact path='/register' element={<Register />}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
