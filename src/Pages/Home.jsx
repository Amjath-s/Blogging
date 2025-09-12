import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/store";
import { Container, Button, Logo, PostCard } from "../component";
import AllPost from "./AllPost";
import SideSection from "../component/SideSection";
import Landingpage from "./Landingpage";
import Authlayout from "../component/AuthLayout"

// function Home() {
//   const [posts, setPosts] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     setLoading(true);
//     appwriteService.getPosts().then((response) => {
//       if (response) {
//         setPosts(response.documents);
//       }
//       setLoading(false);
//     });
//   }, []);

//   // Improved loading state with shimmer effect and more inviting text
//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-100 to-blue-100">
//   //       <div className="text-center">
//   //         <div className="w-16 h-16 mx-auto mb-4 relative">
//   //           <div className="absolute inset-0 rounded-full border-b-4 border-blue-600 animate-spin blur-[2px]" />
//   //           <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-blue-200 via-purple-200 to-slate-200 animate-pulse" />
//   //         </div>
//   //         <div className="text-2xl font-bold text-blue-700 mb-2">
//   //           Loading awesome content...
//   //         </div>
//   //         <div className="text-gray-500">
//   //           <span className="opacity-75">Please log in to see posts.</span>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // Improved "no posts" UI: Glassy card, bolder illustration, softer gradients, animated cta
//   if (posts.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:py-16">
//         <div className="max-w-5xl mx-auto">
//           <div className="rounded-3xl overflow-hidden shadow-lg bg-white/75 backdrop-blur-2xl ring-1 ring-blue-200/40">
//             <div className="grid grid-cols-1 lg:grid-cols-2">
//               {/* Illustration Side */}
//               <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-10">
//                 <div className="text-center">
//                   <div className="w-72 h-72 mx-auto mb-8 bg-gradient-to-br from-blue-200/40 via-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg shadow-purple-100/30">
//                     <svg
//                       className="w-40 h-40 text-blue-500/80 drop-shadow-xl animate-bounce"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.2}
//                         d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">
//                     Start Your Journey
//                   </h3>
//                   <p className="text-gray-600 font-medium">
//                     Create your first post to share your voice with the world.
//                   </p>
//                 </div>
//               </div>

//               {/* Content Side */}
//               <div className="flex flex-col justify-center px-6 py-10 md:px-12">
//                 <div className="text-center lg:text-left">
//                   <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
//                     Welcome to{" "}
//                     <span className="bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
//                       Insightful Voices
//                     </span>
//                   </h1>
//                   <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
//                     Discover, share and connect with unique stories
//                     <br />
//                     <span className="text-blue-700/90 font-semibold">
//                       Join us!
//                     </span>
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
//                     <Button
//                       className="px-8 py-4 text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 transform transition-all duration-200"
//                       onClick={() => navigate("/login")}
//                     >
//                       Start Reading
//                     </Button>
//                     <Button
//                       className="px-8 py-4 text-lg rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100/70 hover:border-blue-300 hover:scale-105 transition-all duration-200"
//                       onClick={() => navigate("/signup")}
//                     >
//                       Join Community
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main Home UI: gradient headers, improved post grid, better cta block
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100/60 via-blue-50 to-purple-50 py-14 px-3 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section - animated gradient underline */}
//         <div className="text-center mb-12 py-20">
//           <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
//             Latest{" "}
//             <span className="bg-gradient-to-r from-blue-700 via-blue-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
//               Stories
//             </span>
//           </h1>
//           <div className="mx-auto mb-3 w-32 h-1 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 rounded-full animate-pulse" />
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Explore the latest thoughts, blogs and stories from our vibrant
//             community.
//           </p>
//         </div>

//         {/* Posts Grid: card shadow, lift effect on hover, extra padding */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
//           {posts.map((post) => (
//             <div
//               key={post.$id}
//               className="h-full group transition-all duration-200"
//             >
//               <div className="rounded-2xl shadow-lg shadow-blue-100 border border-blue-100 hover:border-purple-300 hover:shadow-2xl bg-white/85 group-hover:scale-[1.025] transform transition-all duration-300 overflow-hidden">
//                 <PostCard {...post} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Block: glassy card, strong color, icon, animation */}
//         <div className="text-center mt-20">
//           <div className="bg-white/90 backdrop-blur-md shadow-2xl ring-1 ring-blue-200/30 rounded-3xl p-10 max-w-2xl mx-auto flex flex-col items-center animate-fade-in-up">
//             <div className="mb-3 text-blue-600 text-4xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="inline-block w-10 h-10"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.2}
//                   d="M12 19V6m8 13H4"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
//               Ready to Share Your Story?
//             </h2>
//             <p className="text-gray-600 mb-6 text-lg font-medium">
//               Join us today and start inspiring others!
//             </p>
//             <Button
//               className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transform transition-all duration-200"
//               onClick={() => navigate("/add-post")}
//             >
//               Create Your First Post
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
            {/* <div className="space-y-8 ">
              {posts.map((post) => (
                <div key={post.$id}>
                  <div>
                    <PostCard {...post} />
                  </div>
                </div>
              ))} */}
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
