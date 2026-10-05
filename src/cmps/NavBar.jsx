import { Link, NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { svgs } from '../assets/svgs'
import { useGlobalState } from '../hooks'
import ImageDisplay from './ImageDisplay'
import { UserProfile } from './UserProfile'

const HomeIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-5v-6h-5v6h-5A1.5 1.5 0 0 1 3 19.5v-9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
const PlusIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>

export const NavBar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
   const { loggedInUser } = useGlobalState()

   const closeMenu = () => setIsMenuOpen(false)
   const profileLetter = (loggedInUser?.email || loggedInUser?.username || '?').charAt(0).toUpperCase()

   return (
      <>
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
                     {loggedInUser.avatar
                        ? <ImageDisplay publicId={loggedInUser.avatar} isAvatar />
                        : <span className="user-initial">{profileLetter}</span>}
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

         <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
            <NavLink to="/" end className="mobile-nav-item">
               <HomeIcon />
               <span>Home</span>
            </NavLink>

            <NavLink to={loggedInUser ? '/create_post' : '/login'} className="mobile-nav-item mobile-add">
               <PlusIcon />
               <span>Add item</span>
            </NavLink>

            {loggedInUser ? (
               <button
                  type="button"
                  className={'mobile-nav-item ' + (isUserProfileOpen ? 'active' : '')}
                  onClick={() => setIsUserProfileOpen(prev => !prev)}
                  aria-expanded={isUserProfileOpen}
               >
                  <span className="mobile-avatar">
                     {loggedInUser.avatar
                        ? <ImageDisplay publicId={loggedInUser.avatar} isAvatar />
                        : profileLetter}
                  </span>
                  <span>Profile</span>
               </button>
            ) : (
               <NavLink to="/login" className="mobile-nav-item">
                  <span className="mobile-avatar guest-avatar">{svgs.person}</span>
                  <span>Profile</span>
               </NavLink>
            )}
         </nav>
      </>
   )
}
