import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogInUser } from '../hooks'
import { Posts, RecentlyViewed } from '../cmps'

export const Home = () => {
   const { login, logout } = useLogInUser()
   const navigate = useNavigate()
   const tok = localStorage.getItem('authToken')

   useEffect(() => {
      if (!tok || tok === 'undefined') navigate('/login')
      else login(tok)
   }, [tok, navigate, login])

   return (
      <div className="page home">
         <section className="home-hero">
            <div className="hero-copy">
               <span className="eyebrow">ALTIZACHEN MARKETPLACE</span>
               <h1>Find it. Sell it. <span>Move on.</span></h1>
               <p>Buy and sell second-hand items from people in your community.</p>
            </div>
            <button className="primary-action" onClick={() => navigate('/create_post')}>
               Sell an item
            </button>
         </section>
         <Posts />
         <RecentlyViewed />
      </div>
   )
}
