import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/store";
import { Container, PostCard } from "../component";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   async  function getpost()
    {

      await appwriteService
        .getPosts()
        .then((response) => {
          console.log("response", response); //will get the only active post based on query
          if (response && response.documents) {
            setPosts(response.documents);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
   }
    getpost()
  }, []);


  return (
    <div className="py-8 w-full">
      <Container>

        {/* <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <PostCard {...post} />
            </div>
          ))}
        </div> */}
        <div className="flex flex-wrap">
          {/* {posts.map((post) => (
            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3 p-4"> */}
          {posts.length>0 && (
            
              <PostCard Posts={posts} />
          )}
            {/* </div>
          ))} */}
        </div>

      </Container>
    </div>
  );
}

export default AllPost;
