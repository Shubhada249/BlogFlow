import React from 'react';
import {auth,provider} from "../firebase-config";
import { signInWithPopup } from "firebase/auth"; 
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css"

import Cookies from "universal-cookie";
const cookies=new Cookies();    //cookies variable used to get,set and remove cookies from your browser //cookies is reference to the instance of class Cookies provided by Cookies library


function Login(props) {
  const {setIsAuth}=props;
  let navigate=useNavigate();   //useNavigate:hook

    const signInWithGoogle=async()=>{//asynchronous function do its task without stopping execution of other parts of a program
      try{
      const result=await signInWithPopup(auth,provider);   //signInWithPopup:allows a user to sign in to your application using a pop-up window with a specified authentication provider //await: to pause the execution of the code in asynchronous fun until the asynchronous operation signInWithPopup(auth,provider); is complete
      cookies.set("auth-token",result.user.refreshToken);    //refereshToken: user can access the website without re-entering credentials everytime....unique for each user within a specific app//auth-token:name of cookie set by app...this name is same for all users of this app
      setIsAuth(true);
      navigate("/");    //After login user will be navigated to home page   //navigate('/') will change the URL to "/" and render the Home component specified in your route configuration.
      } catch(err){   
        console.error(err);//if any error that will be printed on console
      }
  };




  return (
    <div className='loginPage'>
      <button className='signin-btn' onClick={signInWithGoogle}><i class="fa-brands fa-google"></i> Sign In With Google</button>
    </div>
  )
}

export default Login;
