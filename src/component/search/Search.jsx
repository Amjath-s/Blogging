import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Search({className}) {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate=useNavigate()
    

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await appwriteService.fetchpost();
        setPosts(data.documents);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []); // ✅ fetch only once on mount

  const handleSearchChange = (value) => {
    setInput(value);

    if (!value.trim()) {
      setFilteredPosts([]); // no input, no results
      return;
    }

    const searchValue = value.toLowerCase();

    const results = posts.filter((post) => {
      const title = post.Title?.toLowerCase() || "";
      const author =
        post.Author?.toLowerCase() || post?.UserId?.toLowerCase() || "";
      return title.includes(searchValue) || author.includes(searchValue);
    });

      setFilteredPosts(results);
    
    };
    

   
  return (
    <div className="mx-20  rounded-lg bg-white" >
      <input
        type="text"
        className="outline-1 p-2 rounded-md bg-white"
        placeholder="Search by title or author..."
        value={input}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      {input && filteredPosts.length > 0 && (
        <ul className="space-y-2">
          {filteredPosts.map((post) => (
            <Link to={`/post/${post.$id}`} key={post.$id} onClick={()=>setInput("")}>
              <li className="border p-2 rounded shadow-sm hover:bg-gray-100" key={post.$id} >
                <h2 className="font-semibold">{post.Title}</h2>
                <p className="text-sm text-gray-600">
                  Author: {post.Author || post.UserId}
                </p>
              </li>
              </Link>
            
          ))}
              </ul>
            
          )}
       

      {input && filteredPosts.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
}

export default Search;
