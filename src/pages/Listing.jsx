import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config/api'

export const Listing = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const [post, setPost] = useState(null)
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      axios.get(API_URL + '/posts/' + id)
         .then(res => setPost(res.data))
         .catch(err => setError(err?.response?.data?.message || 'Listing not found'))
         .finally(() => setLoading(false))
   }, [id])

   if (loading) return <p>Loading listing...</p>
   if (error) return <p className='error'>{error}</p>

   return (
      <main className='page listing-page'>
         <button onClick={() => navigate(-1)}>Back</button>
         <h1>{post.title}</h1>
         <p>{post.category}</p>
         <h2>{post.price} {post.currency}</h2>
         <p>{post.description}</p>
         {post.user && <p>Seller: {post.user.username}</p>}
         <button onClick={() => navigate('/messages')}>Contact seller</button>
      </main>
   )
}
