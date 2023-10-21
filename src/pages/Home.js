import React,{useState,useEffect} from 'react';
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import {db,auth} from "../firebase-config";
import "../styles/Home.css";


function Home(props) {
  const {isAuth} =props;
  const [postLists,setPostList]=useState([]);
  const [updatedPostList,setUpdatedPostList]=useState(false);

  const postsCollectionRef= collection(db, "posts");  //postsCollectionRef pointer is pointing to posts collection in database

  const getPosts =async () => {
    const data = await getDocs(postsCollectionRef)  //getDocs : retrieves all the docs from specific collection 
    setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));   //this will form array of data from docs using map function & assign that array to postLists //doc.data() returns an object containing all the fields and their corresponding values for the Firestore document represented by the doc   
  }

  useEffect(()=>{ 
    getPosts();
  },[])   

  const deletePost =async (id) => {
    const postDocRef = doc(db,"posts",id);  //postDocRef: reference to document which want to delete
    await deleteDoc(postDocRef);
    getPosts();
  }


  return (
    <div className='homePage'>
      {postLists.map((post) => 
        (
          <div className="post">
              <div className='title-trash'>
              <div className="post-title"><h1>{post.title}</h1></div>
              <div className='deletePost'>
              {isAuth && post.author.id===auth.currentUser.uid && (<button onClick={()=>{deletePost(post.id)}}><i class="fa-solid fa-trash"></i></button>)}
              </div>
              </div>
              <div className="post-txt">{post.postText}</div>
              <div className='post-author'><h4>@{post.author.name}</h4></div>
          </div>
        ))}
    </div>
  )
}

export default Home;
