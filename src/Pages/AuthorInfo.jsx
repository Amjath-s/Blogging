import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
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

            await authorService.getAuthorInfo(userId).then(data => {
                console.log(data.documents),
                setAuthInfo(data.documents)
            })
        }
        fetchAuthorInfo()

    },[])
  return (
    <main className="max-w-4xl mx-auto my-16 p-6 bg-white rounded-xl shadow-md flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
        Author Information
      </h1>

      <p className="text-lg text-gray-700 mb-4">
        Display details about author with Id:
        <span className="font-semibold text-blue-600 ml-2">{userid}</span>
      </p>

      {/* Placeholder content or additional author info */}
      <div className="text-center max-w-md mx-auto text-gray-500 italic space-y-8">
        <p>Author details and biography will appear here shortly.</p>

        {authinfo.map((author) => (
          <div
            key={author.$id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-3"
          >
            <img
              src={appWriteService.getFileUrl(author.AVATAR)}
              alt={author.AUTHORNAME}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {author.AUTHORNAME}
            </h3>

            {author.INTEREST && (
              <p className="text-sm text-blue-600 font-medium">
                Interests: {author.INTEREST}
              </p>
            )}

            {author.ABOUT && (
              <p className="text-gray-600 leading-relaxed max-w-xs">
                {author.ABOUT}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default AuthorInfo;
