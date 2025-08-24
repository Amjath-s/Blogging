import React from 'react'
import { useSelector } from 'react-redux'

function UserPost() {
    const userdata = useSelector((state) => state.auth.userData)

    console.log("userData in userpost", userdata);

  return (
      <div>
          
          
      
    </div>
  )
}

export default UserPost
