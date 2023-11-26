import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState, useLogInUser } from '../hooks';
import { CreatePost, Posts } from '../cmps'
import axios from 'axios';

export const Home = () => {
   const { loggedInUser } = useGlobalState()
   const { login, logout } = useLogInUser()
   const navigate = useNavigate()

   const tok = localStorage.getItem('authToken')

   useEffect(() => {
      if (!tok || tok === 'undefined') navigate('/login')
      else login(tok)
   }, [])

   // const ai = async () => {
   //    axios.post('http://localhost:5000/api/ai', { question: 'who was the first president of the united states of America' })
   // }


   return (
      <div className='page home'>
         <button onClick={() => logout()}>Logout</button>
         {/* <button onClick={ai}>ai</button> */}
         <Posts />
         {/* <CreatePost /> */}
      </div>
   )
}
