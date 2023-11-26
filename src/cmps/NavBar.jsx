import { Link, NavLink, useLocation } from "react-router-dom";
import { svgs } from '../assets/svgs';
import React, { useRef, useState } from 'react';
import { useBlur, useGlobalState } from '../hooks';
import { Profile } from './Profile';
import ImageDisplay from './ImageDisplay';
import { UserProfile } from './UserProfile';

const pages = [
   { name: 'login', link: 'login' },
   { name: 'register', link: 'register' },
   { name: 'home', link: '/' },
   { name: 'about', link: 'about' },
   { name: 'create', link: 'create_post' },
];



export const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
   const { search, pathname } = useLocation()
   const { loggedInUser } = useGlobalState()
   const userProfileRef = useBlur(() => setIsUserProfileOpen(false))

   return (
      <div className='nav-bar'>


         <section className='logo-section' >
            <Link to='/'>{svgs.screen}</Link>
         </section>


         <section className={isMenuOpen ? 'nav open' : 'nav'}>
            {
               pages.map(page =>
                  <NavLink key={page.link} to={pathname === page.link ? page.link + search : page.link}>{page.name}</NavLink>
               )
            }
         </section>

         <section className='user-section' ref={userProfileRef}>
            {
               loggedInUser ?
                  <button onClick={() => setIsUserProfileOpen(!isUserProfileOpen)}>
                     <ImageDisplay publicId={loggedInUser?.avatar} isAvatar={true} />
                  </button>
                  : svgs.avatar
            }
            <div className={`user-profile-container ${isUserProfileOpen ? 'open' : ''}`}>
               {loggedInUser && <UserProfile />}
            </div>
         </section>

         <section className='hamburger-section'>
            <button onClick={() => setIsMenuOpen(prev => !prev)}>
               {svgs.hamburger}
            </button>
         </section>

      </div >
   )
}






