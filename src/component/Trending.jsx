import React, { useEffect } from "react";
import appwriteService from "../appwrite/store";
import { useState } from "react";
import { Link } from "react-router-dom";

function Trending() {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    // Fetch trending data from an API or use static data
    // For now, we'll just log to the console
    console.log("Fetching trending data...");
    appwriteService.tredingpost().then((posts) => {
      console.log("Trending posts:", posts);
      setTrendingData(posts.documents || []);
    });
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
      <ul className="space-y-2">
        {trendingData?.length === 0 ? (
          <li>No trending posts available.</li>
        ) : (
          trendingData?.map((post, index) => (
            <Link to={`/post/${post.$id}`} key={index} className="block">
              <div className="flex flex-co justify-center">
                <div className="flex flex-row items-center w-full max-w-xs border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-300 h-fit p-2 bg-blue-100">
                  <div className="flex items-center justify-center w-20 h-20 mr-4 bg-white rounded-lg overflow-hidden">
                    <img
                      src={appwriteService.getFileUrl(post.FeaturedImage)}
                      className="object-cover w-full h-full"
                      alt={post.Title}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h2 className="font-bold text-base break-words mb-1">
                      {post.Title}
                    </h2>
                    {post.Caption && (
                      <p className="text-xs text-gray-700 truncate mb-1">
                        {post.Caption}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        ❤️ {post.LikedCount ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
}

export default Trending;
