import I from '@editorjs/link';
import React from 'react'
import { CiUser } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import LogoutBtn from './Header/LogoutBtn';
import { CiFileOn } from "react-icons/ci";


function ProfilesideMenu() {


    const profileMenu = [
      { name: "My Profile", link: "/profile", icon: <CiUser /> },
      { name: "My Articles", link: "/profile/posts", icon: <CiFileOn /> },
    
    
    ];
  return (
    <div className=" text-white p-5 flex flex-col gap-10  md:bg-slate-900 sm:w-60 lg:w-60 h-screen w-20 bg-stone-800 sticky top-0 ">
      {profileMenu.map((item, index) => (
        <NavLink
          to={item.link}
          end={item.link === "/profile"}
          key={index}
          title={item.name}
          className={({ isActive }) =>
            isActive
              ? "bg-white/20  p-3 rounded-lg flex flex-row items-center justify-center gap-3 text-blue-600 font-semibold"
              : "p-3 rounded-lg flex flex-row items-center gap-3 hover:bg-white/20 text-white font-semibold "
          }
        >
          <div className="text-2xl" title={item.name}>
            {item.icon}
          </div>

          <div className="hidden sm:block md:block lg:block">{item.name}</div>
        </NavLink>
      ))}
      <LogoutBtn />
    </div>
  );
}

export default ProfilesideMenu
