//contain the trending blog and tags

import React, { useState } from 'react'
import { Link } from 'react-router-dom';  
import Trending from './Trending';



const posttag = [
  'Ai','Technology','psychology','Health','Fitness','Food','Travel','Lifestyle','Education','Finance','Business','Entertainment','Fashion','Sports','Gaming','Art','Photography','Music','Books','Movies','Environment'
]

function SideSection() {
  const intialcount = 5;
  const [visibleTags, setVisibleTags] = useState(intialcount) // Limit to 10 tags 
  const [expanded, setExpanded] = useState(false);


  const toggleTag = () => {
    if (expanded) {
      setVisibleTags(intialcount);
    } else {
      setVisibleTags(posttag.length);
    }
    setExpanded(!expanded);
  } 
  

  return (
    <>
      <div className='p-4 '>
        <div className='flex flex-wrap gap-2 m-2 flex-row  '>
        { 
          posttag.slice(0,visibleTags).map((tag, index) => (
            <div key={index} className=" bg-stone-200 rounded-full w-fit p-1">
              <Link to={`/tag/${tag}`} className="text-blue-600 ">  
                <span className="text-gray-700 font-semibold ">{tag}</span>
              </Link>
            </div>
          ))  
          }
          {
             posttag.length > intialcount && (
              <button 
                className="text-blue-600 font-semibold"
                onClick={toggleTag}
              >
               { expanded? "Show Less":"Show More"}
              </button>
            )
          }
        </div>

      </div>
      <Trending/>
    
      
      </>
  )
}

export default SideSection
