import { Link, NavLink } from 'react-router-dom'
import { svgs } from '../assets/svgs'
import React, { useState } from 'react'
import { useGlobalState } from '../hooks'
import ImageDisplay from './ImageDisplay'
import { UserProfile } from './UserProfile'

export const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
   const { loggedInUser } = useGlobalState()

   const closeMenu = () => setIsMenuOpen(false)

   return (
      <header className="nav-bar">
         <section className="logo-section">
            <Link to="/" aria-label="Altizachen home" onClick={closeMenu}>{svgs.screen}</Link>
         </section>

         <nav className={isMenuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to={loggedInUser ? '/create_post' : '/login'} onClick={closeMenu}>Sell an item</NavLink>
            {!loggedInUser && <NavLink to="/login" onClick={closeMenu}>Log in</NavLink>}
            {!loggedInUser && <NavLink to="/register" onClick={closeMenu}>Register</NavLink>}
         </nav>

         {loggedInUser && (
            <section className="user-section">
               <button
                  type="button"
                  aria-label="Open your profile"
                  aria-expanded={isUserProfileOpen}
                  onClick={() => setIsUserProfileOpen(prev => !prev)}
               >
                  <ImageDisplay publicId={loggedInUser.avatar} isAvatar />
               </button>
               <div className={'user-profile-container ' + (isUserProfileOpen ? 'open' : '')}>
                  <UserProfile onClose={() => setIsUserProfileOpen(false)} />
               </div>
            </section>
         )}

         <section className="hamburger-section">
            <button type="button" aria-label="Toggle navigation" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(prev => !prev)}>
               {svgs.hamburger}
            </button>
         </section>
      </header>
   )
}
