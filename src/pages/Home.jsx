import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogInUser } from '../hooks'
import { Posts } from '../cmps'

export const Home = () => {
   const { login, logout } = useLogInUser()
   const navigate = useNavigate()
   const tok = localStorage.getItem('authToken')

   useEffect(() => {
      if (!tok || tok === 'undefined') navigate('/login')
      else login(tok)
   }, [tok, navigate, login])

   return (
      <div className='page home'>
         <div className='home-header'>
            <div>
               <h1>Marketplace</h1>
               <p>Buy and sell with Altizachen.</p>
            </div>
            <div>
               <button onClick={() => navigate('/create_post')}>Sell an item</button>
               <button onClick={logout}>Logout</button>
            </div>
         </div>
         <Posts />
      </div>
   )
}
