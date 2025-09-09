import React, { useEffect, useState } from 'react'
import appwriteservice from "../appwrite/store"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

function UserPost() {
    const [userPosts, setUserPosts] = useState([])
    const userdata = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (userdata) {
            appwriteservice.getUserPosts(userdata?.$id).then((res) => {
                setUserPosts(res?.documents || [])
            })
        }
    }, [userdata])

    // Handler stubs for edit/delete (implement as needed)
    const handleDelete = (postId) => {
        // Implement delete logic here
        // Example: appwriteservice.deletePost(postId).then(() => setUserPosts(posts => posts.filter(p => p.$id !== postId)))
        try {
            if (window.confirm("Are you sure you want to delete this post?")) {
                appwriteservice.deletePost(postId).then(() => {
                    setUserPosts((posts) => posts.filter((p) => p.$id !== postId));
                });
            
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
           
    }

    return (
        <div className="max-w-2xl mx-auto px-2 py-8 md:w-full">
            {userPosts?.length === 0 ? (
                <div className="text-center text-gray-500">No posts found</div>
            ) : (
                <div className="flex flex-col gap-6 ">
                    {userPosts.map((post) => (
                        <div
                            key={post.$id}
                            className="flex flex-col sm:flex-row items-center bg-green-800 rounded-xl shadow-md border border-gray-200 p-4 gap-4 transition hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                {post.FeaturedImage ? (
                                    <img
                                        src={appwriteservice.getFileUrl(post.FeaturedImage)}
                                        alt={post.Title}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-xs">No Image</span>
                                )}
                            </div>
                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between w-full">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{post.Title}</h2>
                                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                                        <span>❤️ {post.LikedCount ?? 0}</span>
                                        <span>💬 {post.CommentCount ?? 0}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Link
                                        to={`/edit-post/${post.$id}`}
                                        className="px-3 py-1 rounded-md bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.$id)}
                                        className="px-3 py-1 rounded-md bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default UserPost