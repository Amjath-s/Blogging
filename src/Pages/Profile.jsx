import React from 'react'
import ProfileForm from '../component/ProfileForm'
import ProfilesideMenu from '../component/ProfilesideMenu'
import { Outlet } from 'react-router-dom'

function Profile() {
  return (
    <>
      <div className='flex flex-row  h-fit' >
        <ProfilesideMenu />
        <div className='flex flex-1    w-full bg-blue-200'>
          <Outlet/>
        </div>
      
      </div>
    
   

    
        
          {/* <ProfileForm/> */}
    </>
      

  )
}

export default Profile
