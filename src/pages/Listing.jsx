import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import axios from 'axios'
import { Carousel, ImageDisplay, ImageLightbox, ListingActions } from '../cmps'
import API_URL from '../config/api'

export const Listing = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const [post, setPost] = useState(null)
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(true)
   const [viewerOpen, setViewerOpen] = useState(false)
   const [recentlyViewed, setRecentlyViewed] = useLocalStorage('altizachen-recently-viewed', [])

   useEffect(() => {
      let active = true
      axios.get(API_URL + '/posts/' + id)
         .then(res => { if (active) { setPost(res.data); setRecentlyViewed(current => [res.data, ...current.filter(item => item._id !== res.data._id)].slice(0, 8)) } })
         .catch(err => { if (active) setError(err?.response?.data?.message || 'Listing not found') })
         .finally(() => { if (active) setLoading(false) })
      return () => { active = false }
   }, [id])

   if (loading) return <main className="page listing-page"><div className="loading-card">Loading listing…</div></main>
   if (error) return <main className="page listing-page"><div className="empty-state"><h1>We couldn't find that listing</h1><p>{error}</p><button className="primary-action" onClick={() => navigate('/')}>Back to listings</button></div></main>

   const price = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(post.price)

   return (
      <main className="page listing-page">
         <div className="listing-topbar"><button className="back-btn" onClick={() => navigate(-1)}>← Back</button></div>
         <section className="listing-detail">
            <div className="listing-media-wrap">
               <button className="listing-media" type="button" onClick={() => setViewerOpen(true)} aria-label="Open photos in full screen">
                  {post.images?.length ? <Carousel>{post.images.map(img => <ImageDisplay publicId={img} key={img} />)}</Carousel> : <div className="listing-no-image">No photo available</div>}
                  {post.images?.length > 0 && <span className="zoom-hint">⌕ Click to inspect photos</span>}
               </button>
               {post.images?.length > 1 && <small className="photo-count">{post.images.length} photos · full-screen viewer</small>}
            </div>
            <div className="listing-info">
               <span className="category-pill">{post.category}</span>
               <h1>{post.title}</h1>
               <div className="listing-price">{price} <small>{post.currency}</small></div>
               <ListingActions post={post} />
               <p className="listing-description">{post.description}</p>
               <div className="seller-card">
                  <div className="seller-avatar">{post.user?.username?.charAt(0)?.toUpperCase() || '?'}</div>
                  <div><span>Seller</span><strong>{post.user?.username || 'Unknown seller'}</strong></div>
               </div>
               <button className="primary-action contact-btn" type="button" onClick={() => navigate('/messages')}>Contact seller</button>
            </div>
         </section>
         {viewerOpen && <ImageLightbox images={post.images || []} onClose={() => setViewerOpen(false)} />}
      </main>
   )
}
