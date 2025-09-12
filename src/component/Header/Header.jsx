import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Logo, LogoutBtn, Search, } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location= useLocation()
  const navItems = [
    // { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    // { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "write", slug: "/add-post", active: authStatus },
    { name: "Profile", slug: "/profile", active: authStatus },
  ];
  const Component = [
    { component: <Search />,active:authStatus }
  ]
  const handleNavigate = (slug) => {
    navigate(slug);
     // Collapse menu on navigation (mobile)
  };
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
            {Component.map((search) =>
              (
                search.active &&(search.component)
              
              ))}
          {/* <Search/> */}
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
