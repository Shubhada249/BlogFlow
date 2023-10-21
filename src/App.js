import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from "firebase/auth";
import React from 'react';
import {auth} from "./firebase-config";

import Cookies from "universal-cookie";
const cookies=new Cookies();    //cookies variable used to get,set an dremove cookies from your browser //cookies is reference to the instance of class Cookies provided by Cookies library


function App() {
  const [isAuth,setIsAuth]=useState(false);   //to determine user is authenticated or not
  
  const signUserOut = async () => {
    await signOut(auth); //will signout the user
    cookies.remove("auth-token");   //will remove cookie with name auth-token name
    setIsAuth(false);
    window.location.pathname="/login";  //redirected to login page
  }

  
  return (
    //To render between different components
    <Router>  
      <nav>
      <div className='left'>
        <i class="fa-brands fa-blogger-b"></i>
      </div> 
      <div className='right'>

      {/* In http://localhost:3000/createPost, "current route" is /createPost   the current route matches the link's to prop), it should receive the CSS class "active."*/}
        <NavLink to="/" activeClassName="active"> <i class="fa-solid fa-house"></i> Home </NavLink>  
        <NavLink to="/createpost" activeClassName="active"> <i class="fa-solid fa-square-plus"></i> Create Post </NavLink> {/* When user clicks on "Create Post" "localhost:3000" will be replaced by "localhost:3000/createpost" */}  
        
        {/*if user is NOT authenticated then only show Login option */}
        {!isAuth ? <NavLink to="/login" activeClassName="active"> <i class="fa-regular fa-circle-user"></i> Login </NavLink>:<button onClick={signUserOut} activeClassName="active"><i class="fa-solid fa-right-from-bracket"></i> Log Out</button>  }  
      </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}/>   {/* When url contains "/createpost" at end then Create Post component is rendered */}  
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
