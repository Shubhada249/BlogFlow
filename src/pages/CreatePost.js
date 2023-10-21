import React,{useEffect, useState} from 'react';
import {addDoc, collection} from "firebase/firestore";
import {db,auth} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import "../styles/CreatePost.css"

function CreatePost(props) {
  const {isAuth}=props;
  const [title,setTitle]=useState("");
  const [postText,setPostText]=useState("");

  const postsCollectionRef= collection(db, "posts");  //postsCollectionRef pointer is pointing to posts collection in database
  let navigate=useNavigate();

  const createPost=async()=>{
    await addDoc(postsCollectionRef,{
      title:title,
      postText:postText,
      author:{name:auth.currentUser.displayName,id: auth.currentUser.uid} //id is unique for each user ,it can be different in different applications
    });
    navigate("/");
  };

  useEffect(()=>{   //if user is not logged in and accessing create post page using url "localhost:3000/createpost" then he will be redirected to login page
    if(!isAuth){
      navigate("/login");
    }
  },[]);

  return (
    <div className="createPostPage">
      <h3>Share your passion with the world!</h3>
      <div className='createPostContainer'>     
        <h2>Create a unique and beautiful post</h2>
        <div className='inputGp'>
          <label>Title:</label>
          <input placeholder='Title...' onChange={(e)=>{setTitle(e.target.value);}}/>
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea placeholder='Post...' onChange={(e)=>{setPostText(e.target.value);}}/>
        </div>
        <div className='buttonContainer'>
          <button onClick={createPost}>Publish <i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost;
