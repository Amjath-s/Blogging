import React, { useEffect, useState } from 'react'
import appwriteService from "../../appwrite/store"



function Likes({ postId, userId }) {
    const [islike, setIsLiked] = useState([])
    const [userlikedornot,setUserLikedOrNot]=useState(null)
    const [likelength, setLikeLength] = useState("")
    const [isclick, setIsClicked] = useState(false)
    const [likedheart,setLikedHeart]=useState(false)
    


    
    
    
    const handlelikework = () =>
    {
        handleLikes()
        setIsClicked(prev=>!prev)
    
    }


    
    useEffect(() =>
    {
        async function  getLikes()
        {  

          await   appwriteService.getLikes({ postId }).then(response =>
            {    console.log(response)
                setLikeLength(response.documents.length)
                    const userLiked = response.documents.some(
                      (like) =>
                        like.USERID.toString() === userId.toString() &&
                        like.POSTID.toString() === postId.toString()
              );
              if (userLiked)
              {
                  
                  setUserLikedOrNot(userLiked);
                  setLikedHeart(true   ); 
              }
              else {
                  setLikedHeart(false)
              }

                console.log("respne from like collection", response.documents)
                
            }
            )
        }
        getLikes()

    }, [userlikedornot,isclick])
    
    useEffect(() =>
    {  console.log("islike data", islike);  
        console.log("the like ", userlikedornot)
        // if (userlikedornot)
        // {
        //     setLikedHeart(true)
        // }
        console.log("heart",likedheart)
       
},[islike,isclick])


    const handleLikes = async () =>
        {
          console.log(userId,postId)
        if (!likedheart)
        {
            console.log("the like in side if  ", userlikedornot);
            await appwriteService.postLike({ postId, userId }).then(response =>
            {
                // setLikeLength(response.documents.length)
                console.log("lengh of lke", response);
                // setLikedHeart((prev)=>!prev)
            }
            )
        }
        else {
            await appwriteService
              .deleteLike({ postId, userId })
              .then(console.log("likes get deleted"))
            //   .then(setLikedHeart((prev) => !prev));

            
        }
         setIsClicked((prev) => !prev);

    }



    return (
      <div>
        {/* {likedheart ? "&#10084": "k"} */}
        <span
          onClick={handlelikework}
          className={`
    text-2xl cursor-pointer select-none
    transition-colors duration-200 ease-in-out
    ${
      likedheart
        ? "text-red-500 drop-shadow-md"
        : "text-gray-400 hover:text-red-400"
    }
  `}
          title={likedheart ? "Unlike" : "Like"}
        >
          {likedheart ? "❤️" : "🤍"}
          {likelength}
        </span>
      </div>
    );
}

export default Likes
