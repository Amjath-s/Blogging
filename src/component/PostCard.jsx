
import React,{useState,useEffect} from "react";
import appWriteService from "../appwrite/store";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import edjsHTML from "editorjs-html";

function PostCard({
  // $id,
  // Title,
  // FeaturedImage,
  // Content,
  // Author,
  // UserId,
  // Caption,
   Posts


}) {


  // console.log($id, Title, FeaturedImage, Content, Author, UserId);
  const navigate = useNavigate();
  const [likes, setLikes] = useState({});

  // return (
  //   <>
  //     <div className="flex flex-col sm:flex-row bg-white border border-amber-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm transition-all duration-200 mb-4">
  //       {/* Image Section */}
  //       <div className="w-full sm:w-48 md:w-56 flex-shrink-0 h-40 sm:h-32 md:h-40 rounded-2xl overflow-hidden bg-green-600 flex items-center justify-center mb-4 sm:mb-0">
  //         {FeaturedImage && (
  //           <img
  //             src={appWriteService.getFileUrl(FeaturedImage)}
  //             alt={Title}
  //             className="object-cover w-full h-full rounded-2xl"
  //           />
  //         )}
  //       </div>

  //       {/* Content Section */}
  //       <div className="flex flex-col flex-1 sm:ml-6">
  //         <div className="mb-2">
  //           <p className="text-xs text-gray-500">{`Written by : ${Author}`}</p>
  //         </div>
  //         <div className="mb-2">
  //           <h1 className="font-extrabold text-lg md:text-2xl mb-1 line-clamp-2">
  //             {Title}
  //           </h1>
  //           <p className="text-gray-700 text-sm md:text-base line-clamp-3">
  //             {Caption}
  //           </p>
  //         </div>
  //         <div className="flex items-center gap-4 mt-2">
  //           <p className="text-xs text-gray-400">likes</p>
  //           <p className="text-xs text-gray-400">comment</p>
  //         </div>
  //         <button
  //           onClick={() => navigate(`/post/${$id}`)}
  //           className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm w-max"
  //         >
  //           Click here
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // );
  useEffect(() => {
    async function fetchLikes() {
      const likesData = {};

      for (let post of Posts) {
        const res = await appWriteService.getLikes({ postId: post.$id });
        likesData[post.$id] = res.total; // or res.length depending on your backend
      }

      setLikes(likesData);
    }

    if (Array.isArray(Posts) && Posts.length > 0) {
      fetchLikes();
    }
  }, [Posts]);
 
  return (
    <>
      {Posts.map((post) => (
        <div
          key={post.$id}
          className="flex flex-col sm:flex-row bg-white border border-amber-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm transition-all duration-200 mb-4"
        >
          {/* Image Section */}
          <div className="w-full sm:w-48 md:w-56 flex-shrink-0 h-40 sm:h-32 md:h-40 rounded-2xl overflow-hidden bg-green-600 flex items-center justify-center mb-4 sm:mb-0">
            {post?.FeaturedImage && (
              <img
                src={appWriteService.getFileUrl(post?.FeaturedImage)}
                alt={post?.Title}
                className="object-cover w-full h-full rounded-2xl"
              />
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 sm:ml-6">
            <div className="mb-2">
              <p className="text-xs text-gray-500">{`Written by : ${post?.Author}`}</p>
            </div>
            <div className="mb-2">
              <h1 className="font-extrabold text-lg md:text-2xl mb-1 line-clamp-2">
                {post?.Title}
              </h1>
              <p className="text-gray-700 text-sm md:text-base line-clamp-3">
                {post?.Caption}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-xs text-gray-400">likes</p>
              <p className="text-sm text-gray-500">
                ❤️ {likes[post.$id] || 0} Likes
              </p>
              <p className="text-xs text-gray-400">comment</p>
            </div>
            <button
              onClick={() => navigate(`/post/${post?.$id}`)}
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm w-max"
            >
              Click here
            </button>
          </div>
        </div>
      ))}
    </>
  );

}

export default PostCard;
