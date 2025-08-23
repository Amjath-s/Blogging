// import React from "react";
// import appWriteService from "../appwrite/store";
// import { Link } from "react-router-dom";

// function PostCard({ $id, Title, FeaturedImage }) {
//   return (
//     <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
//       {FeaturedImage && (
//         <div className=" overflow-hidden">
//           <img
//             src={appWriteService.getFileUrl(FeaturedImage)}
//             alt={Title}
//             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//           <div className="relative inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         </div>
//       )}
//       <div className="p-6">
//         <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
//           {Title}
//         </h2>
//         <Link to={`/post/${$id}`} className="inline-block">
//           <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
//             <span>Read More</span>
//             <svg
//               className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default PostCard;
import React from "react";
import appWriteService from "../appwrite/store";
import { Link, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import edjsHTML from "editorjs-html";

function PostCard({
  $id,
  Title,
  FeaturedImage,
  Content,
  Author,
  UserId,
  Caption,
}) {
  // return (
  //   <div className="group flex bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden min-h-[150px]">
  //     {/* Image Thumbnail, side-by-side */}
  //     {FeaturedImage && (
  //       <div className="flex-shrink-0 w-40 h-40 bg-gray-100 overflow-hidden ">
  //         <img
  //           src={appWriteService.getFileUrl(FeaturedImage)}
  //           alt={Title}
  //           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  //         />
  //         {/* very subtle overlay on hover */}
  //         <div className="inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
  //       </div>
  //     )}

  //     {/* Right side, details */}
  //     <div className="flex flex-col justify-between flex-1 p-6">
  //       <div>
  //         <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
  //           {Title}
  //         </h2>
  //         {/* optional snippet/description - add if you have it */}
  //         <div className="text-base text-gray-600 mb-3 line-clamp-2">
  //           {" "}
  //           {console.log(Content)}

  //           {/* edjsParser.parse(data.blocks) */}
  //         </div>
  //         <p className=" font">
  //           written by <Link to={`/author/${UserId}`}>{Author}</Link>
  //         </p>
  //       </div>

  //       <div className="flex items-center justify-between mt-3">
  //         {/* Optional: Replace with your own stats/metadata if you have it */}
  //         {/* <div className="flex gap-6 text-gray-400 text-sm font-medium">
  //           <span className="flex items-center gap-1">
  //             <svg className="w-4 h-4" /> 5.4K
  //           </span>
  //           <span className="flex items-center gap-1"> ... </span>
  //         </div> */}

  //         <Link to={`/post/${$id}`} className="inline-block ml-auto">
  //           <button className="inline-flex items-center px-5 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all duration-200">
  //             <span>Read More</span>
  //             <svg
  //               className="w-4 h-4 ml-2"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M9 5l7 7-7 7"
  //               />
  //             </svg>
  //           </button>
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );

  console.log($id, Title, FeaturedImage, Content, Author, UserId);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col sm:flex-row bg-white border border-amber-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm transition-all duration-200 mb-4">
        {/* Image Section */}
        <div className="w-full sm:w-48 md:w-56 flex-shrink-0 h-40 sm:h-32 md:h-40 rounded-2xl overflow-hidden bg-green-600 flex items-center justify-center mb-4 sm:mb-0">
          {FeaturedImage && (
            <img
              src={appWriteService.getFileUrl(FeaturedImage)}
              alt={Title}
              className="object-cover w-full h-full rounded-2xl"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 sm:ml-6">
          <div className="mb-2">
            <p className="text-xs text-gray-500">{`Written by : ${Author}`}</p>
          </div>
          <div className="mb-2">
            <h1 className="font-extrabold text-lg md:text-2xl mb-1 line-clamp-2">
              {Title}
            </h1>
            <p className="text-gray-700 text-sm md:text-base line-clamp-3">
              {Caption}
            </p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-xs text-gray-400">likes</p>
            <p className="text-xs text-gray-400">comment</p>
          </div>
          <button
            onClick={() => navigate(`/post/${$id}`)}
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm w-max"
          >
            Click here
          </button>
        </div>
      </div>
    </>
  );
}

export default PostCard;
