"use client";
import React ,{useState,useEffect}from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';


const MyProfile = () => {
  
  const router=useRouter();
    const [post, setPost] = useState([]);
    const {data:session}=useSession();
    useEffect(() => {
        const fetchPosts=async ()=>{
          console.log("fetchssss")
         const res=await fetch(`/api/users/${session?.user.id}/posts`);
         const data=await res.json();
         setPost(data);
        }
     
     if(session?.user.id)   fetchPosts();
     
        },[]);


        console.log(post);

const handleDelete= async(prom)=>{

  console.log(prom)
   const hasConfirmed=confirm("Are you want to delete the prompt");
   if(hasConfirmed){
    try {
      await fetch(`/api/prompt/${prom._id.toString()}`,{
       method:'DELETE'
      });

      const filteredPosts=post.filter((p)=>p._id !== prom._id);
      setPost(filteredPosts);
    } catch (error) {
      console.log(error)
    }
   }
}


const handleEdit=(post)=>{
  console.log("edit...profile");
router.push(`/update-prompt?id=${post._id}`);

}
    
  return (
   <Profile 
   name="My"
   desc="Welcome to your personalized profile page"
   data={post}
   handleEdit={handleEdit}
   handleDelete={handleDelete}

   
   
   />
  )
}

export default MyProfile;