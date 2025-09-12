

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
  const [commentlength, setCommentLength] = useState();
  const { slug } = useParams();
  const commentRef = useRef(null);
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
        setCommentLength(response.documents.length);
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
      <div className="flex justify-center items-center h-screen w-full">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const commentScroll = () => {
    console.log("comment section clicked");

    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

 
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
              {authorinfo?.AVATAR ? (
                <>
                  <img
                    src={appwriteService.getFileUrl(fileId)}
                    className="w-[40px] h-[40px] rounded-full border-2"
                  />
                  {/* <p> {authorinfo.AUTHOR}</p> */}
                </>
              ) : (
                <div className="bg-blue rounded-full">👤</div>
              )}
              <Link to={`/author/${post.UserId}`}>
                <p className="px-5"> {post.Author} </p>
              </Link>
              {!isAuthor && userData?.$id && post?.UserId && (
                <div className=" flex justify-start">
                  <FollowBtn FollowerId={userData.$id} FolloweeId={post.UserId}>
                    Follow
                  </FollowBtn>
                </div>
              )}

              
            </div>

            <div className=" border-b-1 border-teal border-t-1 p-2 mb-5">
              <div className="flex flex-row gap-3">
                <Likes postId={post?.$id} userId={userData?.$id} />
                <span
                  className="font-normal text-2xl cursor-pointer"
                  onClick={commentScroll}
                >
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
