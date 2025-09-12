import React, { useEffect,useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import appwriteauthorservice from "../appwrite/store"
import appwritestoreservice from "../appwrite/store"

function Tagpost() {
  const [tagpost, setTagPost] = useState()
  const [loading,setLoading]=useState(true)

    const { tag} = useParams()
  
  
  useEffect(()  =>
  {
   
      appwriteauthorservice.getTagPosts({ tag:tag }).then((response) =>
      (
        console.log("the tag post", response.documents),
        setTagPost(response.documents)
      )).finally(() =>
      {
        setLoading(false)
      })
       
    
   
   
  
    
  }, [])
  




  
  return (
    <>
      <div className="border-b border-b-yellow-700 ">
        <h1 className="text-2xl font-bold m-4">{tag.toUpperCase()}</h1>
      </div>
      {loading && (
        <div className="bg-green-200 justify-center items-center flex flex-col ">
          loading
        </div>
      )}

      {!loading && (
        <div className=" w-full py-10">
          <div className="bg-white w-[90%] mx-auto p-6 rounded-2xl shadow-md">
         
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tagpost?.map((post, index) => (
                <Link to={ `/post/${post.$id}`}>
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={appwritestoreservice.getFileUrl(
                          post.FeaturedImage
                        )}
                        alt={post.Title}
                        className="w-full h-full object-center hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Author row */}
                      <div className="flex items-center mb-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${post.Author}&background=random`}
                          alt={post.Author}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm font-medium text-gray-600">
                          {post.Author}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {post.Title}
                      </h3>

                      {/* Caption */}
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {post.Caption}
                      </p>
                    </div>
                  </div>
                </Link>
                ))}
              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Tagpost
