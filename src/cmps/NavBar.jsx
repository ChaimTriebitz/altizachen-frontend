import { Link, NavLink } from 'react-router-dom'
import React from 'react'
import { svgs } from '../assets/svgs'
import { useGlobalState } from '../hooks'
import ImageDisplay from './ImageDisplay'

const HomeIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-5v-6h-5v6h-5A1.5 1.5 0 0 1 3 19.5v-9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
const PlusIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>

export const NavBar = () => {
   const { loggedInUser } = useGlobalState()
   const profileLetter = (loggedInUser?.email || loggedInUser?.username || '?').charAt(0).toUpperCase()

   return (
      <>
         <header className="nav-bar">
            <section className="logo-section">
               <Link to="/" aria-label="Altizachen home">{svgs.screen}</Link>
            </section>

            <nav className="nav" aria-label="Main navigation">
               <NavLink to="/" end>Home</NavLink>
               <NavLink to={loggedInUser ? '/create_post' : '/login'}>List</NavLink>
               {!loggedInUser && <NavLink to="/login">Log in</NavLink>}
               {!loggedInUser && <NavLink to="/register">Register</NavLink>}
            </nav>

            {loggedInUser && (
               <section className="user-section">
                  <Link to="/profile" className="profile-trigger" aria-label="Open your profile">
                     {loggedInUser.avatar
                        ? <ImageDisplay publicId={loggedInUser.avatar} isAvatar />
                        : <span className="user-initial">{profileLetter}</span>}
                  </Link>
               </section>
            )}
         </header>

         <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-left">
               <NavLink to="/" end className="mobile-nav-item">
                  <HomeIcon />
                  <span>Home</span>
               </NavLink>

               <NavLink to={loggedInUser ? '/create_post' : '/login'} className="mobile-nav-item mobile-add">
                  <PlusIcon />
                  <span>List</span>
               </NavLink>
            </div>

            <NavLink to={loggedInUser ? '/profile' : '/login'} className="mobile-nav-item mobile-profile-link">
               <span className="mobile-avatar">
                  {loggedInUser?.avatar
                     ? <ImageDisplay publicId={loggedInUser.avatar} isAvatar />
                     : loggedInUser ? profileLetter : svgs.person}
               </span>
               <span>Profile</span>
            </NavLink>
         </nav>
      </>
   )
}
