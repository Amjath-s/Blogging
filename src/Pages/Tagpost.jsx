import React from 'react'
import { useParams } from 'react-router-dom'

function Tagpost() {

    const { tag} = useParams()
  console.log("tagid", tag)
  


  
  return (
      
      
      <div>
        <h1 className="text-2xl font-bold mb-4">Posts tagged with: {tag}</h1>
      
    </div>
  )
}

export default Tagpost
