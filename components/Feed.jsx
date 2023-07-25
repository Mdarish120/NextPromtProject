"use client";
import React ,{useState,useEffect} from 'react';
import PromptCard from './PromptCard';



const PromptList =({data,handleTagClick})=>{

  return (
    <div className='mt-16 prompt_layout'>
     {data.map((post)=>(
      <PromptCard  
      
      key={post.id}
      post={post}
      handleTagClick={handleTagClick}
      />
     ))}
    </div>
  )

}

const Feed = () => {

  const [searchText, setsearchText] = useState("");
  const [searchTimeout,setSearchTimeout]=useState(null);
  const [searchResults,setSearchResults]=useState([]);
  const [posts, setposts] = useState([]);


  const filterPrompts=(searchtext)=>{
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  
  
   const handleSearchChange =(e)=>{
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    //debounce methods 

    setSearchTimeout(
      setTimeout(()=>{
        const searchResult=filterPrompts(e.target.value);
        setSearchResults(searchResult);
      },5000)
    )


   }

  
    const handleTagClick = (tagName) => {
      setsearchText(tagName);
  
      const searchResult = filterPrompts(tagName);
      setSearchResults(searchResult);
    };

   

   useEffect(() => {
   const fetchPosts=async ()=>{
    const res=await fetch("/api/prompt");
    const data=await res.json();
    setposts(data);
   }

   fetchPosts();

   },[]);

  return (
   <section className='feed'>
   <form className='relative w-full flex-center'>
    <input 
    type="text"
    placeholder='Search for a tag or username'
    value={searchText}
    onChange={handleSearchChange}
    required
    className='search_input peer'
    />
   </form>

  {searchText ? 
  
  <PromptList  
   data={searchResults} 
   handleTagClick={handleTagClick}  /> : 
   
   <PromptList  
   data={posts} 
   handleTagClick={handleTagClick}  /> 
   
   }
  



   </section>
  )
}

export default Feed