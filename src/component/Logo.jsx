import React from 'react'

function Logo(width='70px') {
  return (
      <div>
         <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
 
  <circle cx="20" cy="20" r="16" fill="#4F8EF7"/>
  <rect x="10" y="10" width="20" height="20" rx="7" fill="#7ED957" opacity="0.8"/>
  <ellipse cx="20" cy="20" rx="10" ry="4" fill="#FFB347" opacity="0.7"/>
  <polygon points="30,10 40,20 30,30" fill="#EF476F" opacity="0.9"/>

  <text x="52" y="27" fontFamily= "Geneva, sans-serif" fontSize="24" fontWeight="bold" fill="#222">
    Nexa
  </text>
</svg>

      
    </div>
  )
}

export default Logo
