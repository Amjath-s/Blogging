import React, { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import authorService from "../appwrite/authorService";
import appWriteService from "../appwrite/store"

function AuthorInfo() {
    const { userid } = useParams();
    const [authinfo,setAuthInfo]=useState([])
    const userId= userid
     //for passing as paramter for fetch

  console.log("AuthorInfo page is working, userid:", userid);

    useEffect(() =>
    {
        async  function fetchAuthorInfo()
        {

          await authorService.getAuthorInfo({ USERID:userId }).then(data => {
                console.log(data.documents),
                setAuthInfo(data.documents)
            })
        }
        fetchAuthorInfo()

    }, [])
  
  useEffect(() =>
  {
    console.log("authrorinfo",authinfo)
  })
return (
  <main className="max-w-6xl mx-auto my-16 p-8 bg-gray-50 rounded-xl shadow-lg">
    <h1 className="text-3xl font-extrabold mb-10 text-gray-900 text-center">
      Author Information
    </h1>

    {authinfo.map((author) => (
      <div
        key={author.$id}
        className="bg-white rounded-lg shadow-md p-8 mb-12 flex flex-col md:flex-row gap-8"
      >
        {/* Left: Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <img
            src={appWriteService.getFileUrl(author.AVATAR)}
            alt={author.AUTHORNAME}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <h3 className="text-2xl font-semibold text-gray-900 mt-4">
            {author.AUTHORNAME}
          </h3>
          {author.PROFESSION && (
            <p className="text-sm text-gray-600">{author.PROFESSION}</p>
          )}
          {author.TAGLINE && (
            <p className="text-sm italic text-gray-500">{author.TAGLINE}</p>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-4">
          {author.ABOUT && (
            <p className="text-gray-700 leading-relaxed">{author.ABOUT}</p>
          )}
          {author.INTEREST && (
            <p className="text-blue-700 font-medium">
              Interests: {author.INTEREST}
            </p>
          )}

          {/* Contact Links */}
          <div className="flex flex-wrap gap-4 text-sm mt-4">
            {author.EMAIL && (
              <a
                href={`mailto:${author.EMAIL}`}
                className="text-blue-600 hover:underline"
              >
                📧 {author.EMAIL}
              </a>
            )}
            {author.PROFILEURL && (
              <a
                href={author.PROFILEURL}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                🌐 Profile
              </a>
            )}
            {author.TWITTERURL && (
              <a
                href={author.TWITTERURL}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                🐦 Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    ))}

    {/* Articles Section */}
    {authinfo[0]?.articles?.length > 0 && (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Articles by {authinfo[0].AUTHORNAME}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {authinfo[0].articles.map((article, idx) => (
        <Link to={`/post/${article.$id}`}> 
            <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={appWriteService.getFileUrl(article.FeaturedImage)}
                alt={article.Title}
                className="w-full h-48 object-cover"
                />
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900 line-clamp-2">
                  {article.Title}
                </h3>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
    )}
  </main>
);
}

export default AuthorInfo;
