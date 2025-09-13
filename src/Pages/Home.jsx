import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/store";
import { Container, Button, Logo, PostCard } from "../component";
import AllPost from "./AllPost";
import SideSection from "../component/SideSection";
import Landingpage from "./Landingpage";
import Authlayout from "../component/AuthLayout"



function Home() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const [lastdoc, setLastDoc] = useState()
  const [hasMore, setHasMore] = useState(true);

  const posttag = [
    "Ai",
    "Technology",
    "psychology",
    "Health",
    "Fitness",
    "Food",
    "Travel",
    "Lifestyle",
    "Education",
    "Finance",
    "Business",
    "Entertainment",
    "Fashion",
    "Sports",
    "Gaming",
    "Art",
    "Photography",
    "Music",
    "Books",
    "Movies",
    "Environment",
  ];

  React.useEffect(() => {
    fetchPosts();
    
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    appwriteService.getPosts(5, lastdoc?.$id || null).then((response) => {
      if (response) {
        setPosts((prev) => [...prev, ...response.documents]);
        setLastDoc(response.documents[response.documents.length - 1]);
      }
      setHasMore(response.documents.length === 5);
    });
    setLoading(false);
  
  }

  





  if (posts.length === 0) {
    return (
      <>
    

        <Landingpage/>
    
        
        
      </>
    );
  }
  return (
    <>
      {/* Sidebar for trending blogs and tags (desktop only) */}
      <div className="w-full min-h-screen flex ">
        <div className="flex justify-center bg-white  w-full ">
          <main className=" max-w-4xl mt-8">
           
              <PostCard Posts={posts} />
{/*               
            </div> */}
            {hasMore && (
              <div className="flex justify-center my-8">
                <button
                  onClick={fetchPosts}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-all"
                >
                  {loading ? "Loading..." : "Load More"}
                
                </button>
              </div>
            )}
          </main>
        </div>

        <div className=" hidden w-[35%]  lg:block  md:hidden box-contain  border-l-2 border-blue-100">
          <aside className=" sticky top-16 ">
            <SideSection />
          </aside>
        </div>
      </div>
    </>
  );

}

export default Home;
