import { useEffect, useState } from 'react'
import axios from 'axios'
import { ACTIONS } from '../state'
import { useGlobalState } from '../hooks'
import { Post } from './Post'
import API_URL from '../config/api'

export const Posts = () => {
   const { dispatch, posts } = useGlobalState()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState('')

   useEffect(() => {
      const getPosts = async () => {
         try {
            const token = localStorage.getItem('authToken')
            const response = await axios.get(API_URL + '/posts', {
               headers: token ? { Authorization: 'Bearer ' + token } : {}
            })
            dispatch({ type: ACTIONS.SET, entity: 'posts', payload: response.data })
         } catch (error) {
            setError(error?.response?.data?.error || 'Could not load listings')
         } finally {
            setLoading(false)
         }
      }
      getPosts()
   }, [dispatch])

   if (loading) return <p className='loading'>Loading listings...</p>
   if (error) return <p className='error'>{error}</p>

   return (
      <div className='posts'>
         {posts.length ? posts.map(post => <Post key={post._id} post={post} />) : <p>No listings yet.</p>}
      </div>
   )
}
