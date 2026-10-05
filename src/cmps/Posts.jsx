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
   const [search, setSearch] = useState('')
   const [sort, setSort] = useState('newest')

   const loadPosts = async (params = {}) => {
      setLoading(true)
      setError('')
      try {
         const response = await axios.get(API_URL + '/posts', {
            params,
            headers: localStorage.getItem('authToken') ? { Authorization: 'Bearer ' + localStorage.getItem('authToken') } : {}
         })
         dispatch({ type: ACTIONS.SET, entity: 'posts', payload: response.data })
      } catch (err) {
         setError(err?.response?.data?.message || 'Could not load listings')
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => { loadPosts({ sort }) }, [sort])

   const submitSearch = e => {
      e.preventDefault()
      loadPosts({ search, sort })
   }

   if (loading) return <p className='loading'>Loading listings...</p>
   if (error) return <p className='error'>{error}</p>

   return (
      <section className='marketplace-listings'>
         <form className='listing-filters' onSubmit={submitSearch}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search listings...' />
            <select value={sort} onChange={e => setSort(e.target.value)}>
               <option value='newest'>Newest</option>
               <option value='oldest'>Oldest</option>
               <option value='priceLow'>Price: low to high</option>
               <option value='priceHigh'>Price: high to low</option>
            </select>
            <button type='submit'>Search</button>
         </form>
         <div className='posts'>
            {posts.length ? posts.map(post => <Post key={post._id} post={post} />) : <p>No listings found.</p>}
         </div>
      </section>
   )
}
