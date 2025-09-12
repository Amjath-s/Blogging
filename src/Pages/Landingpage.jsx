import React from 'react'
import { useNavigate,Link } from 'react-router-dom';

function Landingpage() {
  const navigate=useNavigate()
  return (
    <div className="bg-white- text-dark  h-screen flex items-center justify-center p-8">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-7xl">
        {/* Left-side content (text and buttons) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-dark leading-tight">
            Welcome to{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              NexaBlog
            </span>
          </h1>
          <p className="max-w-xl text-lg sm:text-xl text-dark font-light">
            Discover a world of stories, insights, and ideas. Dive into our
            collection of articles, connect with a vibrant community, and start
            your reading journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
 
            <button onClick={()=>navigate("/login")} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              Read Now
            </button>
           
            <button onClick={()=>navigate("/signup")} className="px-8 py-3 bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              Sign Up
            </button>
          </div>
        </div>

        {/* Right-side content (animated illustration) */}
        <div className="flex-shrink-0 w-full max-w-md">
          {/* Animated Reading SVG */}
          <style jsx>{`
            @keyframes bounce-book {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }
            @keyframes float-star {
              0%,
              100% {
                transform: translate(0, 0) rotate(0);
              }
              50% {
                transform: translate(10px, -15px) rotate(15deg);
              }
            }
            .book-cover {
              transform-origin: 50% 100%;
              transform: rotateX(0deg);
              animation: open-book 2s ease-in-out infinite alternate;
            }
            @keyframes open-book {
              from {
                transform: rotateX(0deg);
              }
              to {
                transform: rotateX(20deg);
              }
            }
          `}</style>
          <svg
            className="w-full h-auto"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Person sitting and reading */}
            <rect
              x="180"
              y="250"
              width="100"
              height="150"
              fill="#374151"
              rx="10"
            />{" "}
            {/* Body */}
            <circle cx="230" cy="220" r="30" fill="#E5E7EB" /> {/* Head */}
            <rect
              x="230"
              y="270"
              width="20"
              height="50"
              fill="#4B5563"
              rx="5"
            />{" "}
            {/* Leg 1 */}
            <rect
              x="250"
              y="270"
              width="20"
              height="50"
              fill="#4B5563"
              rx="5"
            />{" "}
            {/* Leg 2 */}
            {/* Book */}
            <g className="book-cover origin-[250px_350px] animate-[open-book_2s_ease-in-out_infinite_alternate]">
              <rect
                x="200"
                y="320"
                width="100"
                height="150"
                fill="#4B5563"
                rx="8"
              />
              <rect x="195" y="325" width="5" height="140" fill="#9CA3AF" />
              <rect x="200" y="325" width="95" height="140" fill="#F3F4F6" />
            </g>
            {/* Floating books animation */}
            <g className="animate-[bounce-book_2s_ease-in-out_infinite] origin-center">
              <rect
                x="80"
                y="100"
                width="80"
                height="120"
                fill="#D1D5DB"
                rx="8"
              />
              <rect x="75" y="105" width="5" height="110" fill="#6B7280" />
            </g>
            <g className="animate-[bounce-book_2s_ease-in-out_infinite] delay-500 origin-center">
              <rect
                x="350"
                y="150"
                width="90"
                height="130"
                fill="#E5E7EB"
                rx="8"
              />
              <rect x="345" y="155" width="5" height="120" fill="#6B7280" />
            </g>
            {/* Stars */}
            <g className="animate-[float-star_2s_ease-in-out_infinite] opacity-70">
              <polygon
                points="100,50 110,70 130,75 110,80 100,100 90,80 70,75 90,70"
                fill="#FCD34D"
              />
            </g>
            <g className="animate-[float-star_2s_ease-in-out_infinite] delay-300 opacity-70">
              <polygon
                points="400,100 410,120 430,125 410,130 400,150 390,130 370,125 390,120"
                fill="#FCD34D"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );

}

export default Landingpage
