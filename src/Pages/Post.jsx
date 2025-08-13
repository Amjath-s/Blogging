// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import appwriteService from "../appwrite/store";
// import { Container, Button, FollowBtn } from "../component";
// import { Link } from "react-router-dom";
// import parse from "html-react-parser";
// import { useParams, useNavigate } from "react-router-dom";
// import CommentInput from "../component/comment/CommentInput";
// import CommentView from "../component/comment/CommentView";
// import appwriteComment from "../appwrite/comment"
// import BlockRender from "../component/BlockRender";
// function Post() {
//   // console.log("Post component is rendering");
//   const [post, setPost] = useState(null);
//   const [comment, setComment] = useState([])
//   const [content,setContent]=useState([])
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   // console.log("Slug from useParams:", slug);

//   const userData = useSelector((state) => state.auth.userData);
//   const isAuthor = post && userData ? post.UserId === userData.$id : false;
//   // console.log("followerid",userData.$id)
//   // console.log("followeeId", post?.UserId)

//  useEffect(() => {
//    if (!post?.$id) return;

//    const fetchingComment = async () => {
//      console.log("fetchcomment running")
//      try {
//        const response = await appwriteComment.fetchComment({
//          postId: post?.$id,
//        });
//        setComment(response.documents); // Assuming Appwrite returns { documents: [...] }
//       //  console.log("comments", response.documents);
//      } catch (error) {
//        console.error("Failed to fetch comments", error);
//      }
//    };

//    fetchingComment();
//  }, [post]);

//   // appwriteComment.realTimecomment({ postId: post?.$id, setComment: setComment }).then(response =>
//   //   console.log(response)
//   // )

//    useEffect(() => {
//      if (!post?.$id) return;
//      console.log("the use eeffect of realtime ")
//      // This returns the unsubscribe function!
//      const unsubscribe = appwriteComment.realTimeComment({ postId: post.$id, setComment: setComment });
//      console.log("unsubsribe",unsubscribe)
//      // Cleanup subscription on unmount or post change
//      return () => unsubscribe();
//    }, [post?.$id]);

//   useEffect(() => {
//     console.log("Updated comments:", comment);
//       //  .then((response) => console.log(response));
//   }, [comment]);

//   useEffect(() => {
//     console.log("useEffect is running");
//     if (slug) {
//       // console.log("Fetching post with slug:", slug);
//       appwriteService
//         .getPost(slug)
//         .then((postData) => {
//           // console.log("Fetched post data:", postData);
//           if (postData) {
//             setPost(postData);
//             setContent(JSON.parse(postData.Content))

//           }
//         })

//         .catch((error) => {
//           console.error("Error fetching post:", error);
//           navigate("/");
//         });
//     }
//   }, [slug, navigate]);

//   const deletePost = () => {
//     appwriteService.deletePost(post.$id).then((status) => {
//       if (status) {
//         appwriteService.deleteFile(post.FeaturedImage);
//         navigate("/");
//       }
//     });
//   };

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-[#faf6f1] pt-24 pb-12">
//         {/* <Container> */}
//           <div className="w-full flex flex-col items-center mb-6">
//             {/* Follow button outside the postcard */}
//             {!isAuthor && userData?.$id && post?.UserId && (
//               <div className="mb-5 w-full flex justify-end max-w-2xl">
//                 <FollowBtn FollowerId={userData.$id} FolloweeId={post.UserId}>
//                   Follow
//                 </FollowBtn>
//               </div>
//             )}

//             {/* Post Card */}
//             <div className="w-full max-w-2xl border rounded-2xl p-4 bg-white shadow-md">
//               {/* Edit/Delete buttons if author */}
//               {isAuthor && (
//                 <div className="flex-end top-4 right-4 flex gap-3 ">
//                   <Link to={`/edit-post/${post.$id}`}>
//                     <Button
//                       bgColor="bg-green-500 hover:bg-green-600"
//                       className="rounded-full px-4 py-2 text-white font-semibold shadow"
//                     >
//                       Edit
//                     </Button>
//                   </Link>
//                   <Button
//                     bgColor="bg-red-500 hover:bg-red-600"
//                     className="rounded-full px-4 py-2 text-white font-semibold shadow"
//                     onClick={deletePost}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               )}

//               {/* Featured Image */}
//               {post.FeaturedImage && (
//                 <img
//                   src={appwriteService.getFileUrl(post.FeaturedImage)}
//                   alt={post.Title}
//                   className="rounded-2xl max-h-96 object-cover w-full"
//                 />
//               )}
//             </div>

//             {/* Post Title and Content */}
//             <div className="w-full max-w-2xl mt-6 bg-white/90 rounded-2xl p-8 shadow-lg text-gray-800 flex flex-col items-center">
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center w-full">
//                 {post.Title}
//               </h1>
//               <div
//                 className="w-full prose prose-sm max-w-none break-words overflow-auto"
//                 style={{ maxHeight: "40rem" }}
//               >
//                 {/* {parse(post.Content)} */}
//                 {console.log(content.blocks)}

//                 {content.blocks.map((block) => {
//                   return (
//                     <div key={block.id}>
//                       <BlockRender block={block} />

//                     </div>
//                   );
//               })}

//                 {console.log(content.blocks)}
//               </div>
//             </div>
//           </div>
//         {/* </Container> */}
//         <Container>
//           <CommentInput
//             postId={post?.$id}
//             parentcommentId={null}
//             userdata={userData}
//           />
//           <CommentView
//             comments={comment}
//             postId={post?.$id}
//             setComment={setComment}
//             userdata={userData}
//           />
//         </Container>
//       </div>
//     </>
//   );

// }

// export default Post;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/store";
import { Button, FollowBtn } from "../component";
import { Link, useParams, useNavigate } from "react-router-dom";
import CommentInput from "../component/comment/CommentInput";
import CommentView from "../component/comment/CommentView";
import appwriteComment from "../appwrite/comment";
import appwriteauthorService from "../appwrite/authorService";
import BlockRender from "../component/BlockRender";
import Likes from "../component/likes/Likes";

function Post() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState([]);
  const [authorinfo, setAuthorInfo] = useState();
  const [commentlength,setCommentLength]=useState()
  const { slug } = useParams();
  const commentRef=useRef(null)
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.UserId === userData.$id : false;

  useEffect(() => {
    if (!post?.$id) return;
    const fetchingComment = async () => {
      try {
        const response = await appwriteComment.fetchComment({
          postId: post.$id,
        });
        setComment(response.documents);
        setCommentLength(response.documents.length)
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchingComment();
  }, [post]);

  useEffect(() => {
    if (!post?.$id) return;
    const unsubscribe = appwriteComment.realTimeComment({
      postId: post.$id,
      setComment,
    });
    return () => unsubscribe();
  }, [post?.$id]);

  useEffect(() => {
    if (slug) {
      appwriteService
        .getPost(slug)
        .then((postData) => {
          if (postData) {
            setPost(postData);
            setContent(JSON.parse(postData.Content));
          }
        })
        .catch(() => navigate("/"));
    }
  }, [slug, navigate]);

  useEffect(() => {
    if (post) {
      appwriteauthorService
        .getAuthorInfo({ USERID: post?.UserId })
        .then((response) => {
          setAuthorInfo(response.documents[0]);
          console.log("response", response.documents[0]);
        });
    }
  }, [post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.FeaturedImage);
        navigate("/");
      }
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-start pt-20 px-4 text-gray-700 text-xl">
        Loading...
      </div>
    );
  }


  const commentScroll = () =>
  {
    console.log("comment section clicked")
  
    if (commentRef.current)
    {
      commentRef.current.scrollIntoView({ behavior: "smooth" });

    }
  }

  // useEffect(() =>
  // {
  //   console.log("the authorino",authorinfo)

  // },[setAuthorInfo])
  // return (
  //   <main className="max-w-3xl mx-0 px-4 py-16 text-gray-900 ju">
  //     {/* Featured Image */}
  //     {post.FeaturedImage && (
  //       <img
  //         src={appwriteService.getFileUrl(post.FeaturedImage)}
  //         alt={post.Title}
  //         className="rounded-2xl w-full max-h-96 object-cover mb-10 shadow-lg"
  //         loading="lazy"
  //       />
  //     )}

  //     {/* Title */}
  //     <h1 className="text-4xl font-extrabold mb-8 leading-tight">
  //       {post.Title}
  //     </h1>

  //     {/* Follow button (if not author) */}
  //     {!isAuthor && userData?.$id && post?.UserId && (
  //       <div className="mb-6 flex justify-start">
  //         <FollowBtn FollowerId={userData.$id} FolloweeId={post.UserId}>
  //           Follow
  //         </FollowBtn>
  //       </div>
  //     )}

  //     {/* Author & Controls */}
  //     <div className="flex items-center justify-between mb-10">
  //       <p className="text-gray-600 text-sm">
  //         By <span className="font-semibold">{post.UserName || "Author"}</span>
  //       </p>
  //       {isAuthor && (
  //         <div className="flex gap-3">
  //           <Link to={`/edit-post/${post.$id}`}>
  //             <Button
  //               bgColor="bg-green-600 hover:bg-green-700"
  //               className="text-white px-4 py-2 rounded-md"
  //             >
  //               Edit
  //             </Button>
  //           </Link>
  //           <Button
  //             bgColor="bg-red-600 hover:bg-red-700"
  //             className="text-white px-4 py-2 rounded-md"
  //             onClick={deletePost}
  //           >
  //             Delete
  //           </Button>
  //         </div>
  //       )}
  //     </div>

  //     {/* Post Content */}
  //     <article className="prose max-w-none mb-12">
  //       {content.blocks.map((block) => (
  //         <BlockRender key={block.id} block={block} />
  //       ))}
  //     </article>

  //     {/* Comments Section */}
  //     <section className="border-t pt-8">
  //       <CommentInput
  //         postId={post.$id}
  //         parentcommentId={null}
  //         userdata={userData}
  //       />
  //       <CommentView
  //         comments={comment}
  //         postId={post.$id}
  //         setComment={setComment}
  //         userdata={userData}
  //       />
  //     </section>
  //   </main>
  // );
  console.log(post);
  console.log("avatar", authorinfo?.AVATAR);
  const fileId = authorinfo?.AVATAR;
  console.log("filethihng", fileId);
  return (
    <>
      <div className="py-3 flex justify-center  flex-col w-full max-w-10xl min-w-1xl md:flex-wrap md:flex-grow md:shrink-0 ">
        <div className="mx-6">
          <h3 className="font-extrabold text-2xl"> {post.Tag} </h3>
        </div>
        <div className="border-t-1 flex flex-col justify-center mx-auto  w-full items-center my-4 ">
          <main className="   justify-center flex-10/12 flex-col  w-[50%] my-8 ">
            <h2 className="font-bold text-4xl min-w-10xl"> {post.Title}</h2>
            <p className="my-5 text-neutral-400"> {post.Caption}</p>
            <div className="flex flex-row m-4 items-center">
              {authorinfo ? (
                <>
                  <img
                    src={appwriteService.getFileUrl(fileId)}
                    className="w-[40px] h-[40px] rounded-full border-2"
                  />
                  <p> {authorinfo.AUTHOR}</p>
                </>
              ) : (
                <div className="bg-blue rounded-full"> </div>
              )}

              <p className="px-5"> {post.Author} </p>

              <FollowBtn
                FollowerId={userData.$id}
                FolloweeId={post.UserId}
              ></FollowBtn>
            </div>

            <div className=" border-b-1 border-teal border-t-1 p-2 mb-5">
              <div className="flex flex-row gap-3">
                <Likes postId={post?.$id} userId={userData?.$id} />
                <span className="font-normal text-2xl cursor-pointer" onClick={commentScroll}>
                  <span>&#128172;</span> {commentlength}
                </span>
              </div>
            </div>
            {post.FeaturedImage && (
              <img
                src={appwriteService.getFileUrl(post.FeaturedImage)}
                alt={post.Title}
                className="rounded-2xl max-h-96 object-cover w-full"
              />
            )}

            {content.blocks.map((block) => (
              <BlockRender key={block.id} block={block} />
            ))}
          </main>
        </div>
      </div>
      <section className="border-t pt-10 flex  flex-col  mx-auto  w-full">
        <div className=" w-[80%] justify-center mx-auto " ref={commentRef}>
          <CommentInput
            postId={post.$id}
            parentcommentId={null}
            userdata={userData}
          />
          <CommentView
            comments={comment}
            postId={post.$id}
            setComment={setComment}
            userdata={userData}
          />
        </div>
      </section>
    </>
  );
}

export default Post;
