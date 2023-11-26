import axios from 'axios'
import { useEffect } from 'react'
import { ACTIONS } from '../state'
import { useGlobalState } from '../hooks'
import { Post } from './Post'


export const Posts = () => {
   const tok = localStorage.getItem('authToken')
   const { dispatch, posts } = useGlobalState()
   useEffect(() => {
      getPosts()
   }, [])

   const getPosts = async () => {
      try {
         const { data } = await axios.get('http://localhost:5000/api/posts', {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${tok}`
            }
         })
         dispatch({ type: ACTIONS.SET, entity: 'posts', payload: data })
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className='posts'>
         {
            posts.map(post =>
               <Post key={post._id} post={post} />
            )
         }
      </div>
   )
}
