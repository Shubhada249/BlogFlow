//This code is used to access firebase services in our react app

import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {    //This is an object that contains the configuration settings for your Firebase project.
  apiKey: "AIzaSyBFm4BPOb-kosQLz7gO5unmvKJrlVDC6B0",
  authDomain: "blog-website-61f47.firebaseapp.com",
  projectId: "blog-website-61f47",
  storageBucket: "blog-website-61f47.appspot.com",
  messagingSenderId: "885491660408",
  appId: "1:885491660408:web:ce8348f825a94ef6461f8d",
  measurementId: "G-HHLY2T32G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  //It takes the firebaseConfig object as an argument and initializes a Firebase app instance with the provided configuration.//app constant is used to store the reference to the Firebase app instance
export const auth=getAuth(app); //auth is a specific Firebase Authentication instance that allows you to interact with Firebase Authentication features like user sign-in, sign-out, and account management.
export const provider=new GoogleAuthProvider();//provider will tell firebase that we want to handle authentication using google account of user
export const db=getFirestore(app);  //db that holds a reference to the Firestore database. This variable allows you to interact with the Firestore database and perform operations like reading, writing, and querying data.
