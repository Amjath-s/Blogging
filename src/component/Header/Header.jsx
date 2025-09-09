import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Logo, LogoutBtn, Search } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const location= useLocation()

  const navItems = [
    // { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    // { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "write", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
  ];

  const handleNavigate = (slug) => {
    navigate(slug);
    setMenuOpen(false); // Collapse menu on navigation (mobile)
  };

  // return (
  //   <header className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white">
  //     <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
  //       <Link to="/">
  //         <Logo width="80px" />
  //       </Link>
  //       {authStatus && (
  //         <div className="hidden md:block">
  //           <Search />
  //         </div>
  //       )}
  //       {/* Hamburger */}
  //       <button
  //         className="md:hidden flex flex-col justify-center items-center w-8 h-8"
  //         onClick={() => setMenuOpen((v) => !v)}
  //         aria-label={menuOpen ? "Close menu" : "Open menu"}
  //       >
  //         <span
  //           className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-transform duration-200 ${
  //             menuOpen ? "rotate-45 translate-y-2" : ""
  //           }`}
  //         />
  //         <span
  //           className={`block w-6 h-0.5 bg-gray-700 mb-1 transition-opacity duration-200 ${
  //             menuOpen ? "opacity-0" : "opacity-100"
  //           }`}
  //         />
  //         <span
  //           className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${
  //             menuOpen ? "-rotate-45 -translate-y-2" : ""
  //           }`}
  //         />
  //       </button>

  //       {/* Main nav (Desktop) */}
  //       <nav className="hidden md:flex items-center space-x-6">
  //         {navItems.map(
  //           (item) =>
  //             item.active && (
  //               <button
  //                 key={item.name}
  //                 onClick={() => handleNavigate(item.slug)}
  //                 className="px-3 py-1 rounded hover:bg-gray-100 text-gray-700"
  //               >
  //                 {item.name}
  //               </button>
  //             )
  //         )}
  //         {authStatus && <LogoutBtn />}
  //       </nav>
  //     </div>

  //     {/* Mobile nav (slide down) */}
  //     {menuOpen && (
  //       <nav className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow animate-fade-down">
  //         <ul className="flex flex-col items-center">
  //           {navItems.map(
  //             (item) =>
  //               item.active && (
  //                 <li key={item.name} className="w-full border-b last:border-0">
  //                   <button
  //                     className="block w-full px-4 py-3 text-gray-700 text-lg hover:bg-gray-100 text-left"
  //                     onClick={() => handleNavigate(item.slug)}
  //                   >
  //                     {item.name}
  //                   </button>
  //                 </li>
  //               )
  //           )}
  //           {authStatus && (
  //             <li className="w-full">
  //               <LogoutBtn />
  //             </li>
  //           )}
  //         </ul>
  //       </nav>
  //     )}

  //     {/* Optional: Simple fade animation for mobile menu */}
  //     <style>
  //       {`
  //         @keyframes fadeDown {
  //           from { opacity: 0; transform: translateY(-10px);}
  //           to { opacity: 1; transform: translateY(0);}
  //         }
  //         .animate-fade-down {
  //           animation: fadeDown 0.2s ease;
  //         }
  //       `}
  //     </style>
  //   </header>
  // );

  return (
    <>
      <header className=" fixed left-0  bg-white w-full px-5 py-2  flex  flex-row  border-b-2 z-50 ">
        <div className="flex flex-row w-full  item-center  relative">
          <div className="absolute flex-row flex justify-between">
            
            <div className="">
              <Link to ="/">
              
          <Logo />
              </Link>
        </div>
        <div className="hidden md:block">
          <Search/>
       </div>
        </div>
        </div>

        <div className= {`flex flex-row w-full  justify-end  `}>
          {navItems.map(
            (item) =>
              item.active && (
                <button key={item.slug} className={`px-3 py-2 rounded-md ${location.pathname === item.slug
                    ? " text-blue-400 font-bold "
                    : "text-gray-700 hover:bg-gray-200"
                  }`
                
                
                }
            onClick={() => { handleNavigate(item.slug) }}>
                  {item.name}
                </button>
              )
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
