import { Link, NavLink, useLocation } from "react-router-dom";
import { svgs } from '../assets/svgs';
import React, { useState } from 'react';
import { useGlobalState } from '../hooks';
import { Profile } from './Profile';
import ImageDisplay from './ImageDisplay';

const pages = [
   { name: 'login', link: 'login' },
   { name: 'register', link: 'register' },
   { name: 'home', link: '/' },
   { name: 'about', link: 'about' },
];

const handleUserClick = () =>{

}

export const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const { search, pathname } = useLocation()
   const { loggedInUser } = useGlobalState()

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

         <section className='user-section'>
            {
               loggedInUser ?
                  <button onClick={handleUserClick}>
                     <ImageDisplay publicId={loggedInUser.avatar} isAvatar={true} />
                  </button>
                  : svgs.avatar
            }
            {/* <Profile /> */}
         </section>

         <section className='hamburger-section'>
            <button onClick={() => setIsMenuOpen(prev => !prev)}>
               {svgs.hamburger}
            </button>
         </section>

      </div >
   )
}






