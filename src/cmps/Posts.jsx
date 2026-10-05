import { useEffect, useState } from 'react'
import axios from 'axios'
import { ACTIONS } from '../state'
import { useGlobalState } from '../hooks'
import { Post } from './Post'
import { OPTIONS } from '../data'
import API_URL from '../config/api'

export const Posts = () => {
   const { dispatch, posts } = useGlobalState()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState('')
   const [search, setSearch] = useState('')
   const [category, setCategory] = useState('')
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

   useEffect(() => {
      const timer = setTimeout(() => {
         loadPosts({
            search: search.trim() || undefined,
            sort,
            category: category || undefined
         })
      }, 350)

      return () => clearTimeout(timer)
   }, [search, sort, category]) // eslint-disable-line react-hooks/exhaustive-deps

   const clearFilters = () => {
      setSearch('')
      setCategory('')
      setSort('newest')
   }

   if (loading) return <section className="marketplace-listings"><div className="loading-state"><span className="spinner" /> Loading listings…</div></section>
   if (error) return <section className="marketplace-listings"><div className="empty-state"><h2>Something went wrong</h2><p>{error}</p><button className="primary-action" onClick={() => loadPosts({ sort, category: category || undefined })}>Try again</button></div></section>

   return (
      <section className="marketplace-listings">
         <div className="section-heading">
            <div><h2>Latest listings</h2></div>
            <span className="result-count">{posts.length} {posts.length === 1 ? 'listing' : 'listings'}</span>
         </div>

         <div className="listing-filters">
            <div className="search-field">
               <span aria-hidden="true">⌕</span>
               <input aria-label="Search listings" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings…" />
               {search && <button type="button" className="search-clear" onClick={() => setSearch('')} aria-label="Clear search">×</button>}
            </div>
            <select aria-label="Category" value={category} onChange={e => setCategory(e.target.value)}>
               <option value="">All categories</option>
               {OPTIONS.categories.map(categoryOption => <option key={categoryOption.name} value={categoryOption.name}>{categoryOption.name}</option>)}
            </select>
            <select aria-label="Sort listings" value={sort} onChange={e => setSort(e.target.value)}>
               <option value="newest">Newest</option>
               <option value="oldest">Oldest</option>
               <option value="priceLow">Price: low to high</option>
               <option value="priceHigh">Price: high to low</option>
            </select>
            {(search || category || sort !== 'newest') && <button className="clear-btn" type="button" onClick={clearFilters}>Clear</button>}
         </div>

         <div className="posts">
            {posts.length ? posts.map(post => <Post key={post._id} post={post} />) : (
               <div className="empty-state no-results"><h2>No listings found</h2><p>Try a different search or clear your filters.</p><button className="primary-action" onClick={clearFilters}>Clear filters</button></div>
            )}
         </div>
      </section>
   )
}
