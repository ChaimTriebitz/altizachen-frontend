import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalState } from '../hooks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import API_URL from '../config/api'

export const ListingActions = ({ post }) => {
   const { loggedInUser } = useGlobalState()
   const navigate = useNavigate()
   const [favorites, setFavorites] = useLocalStorage('altizachen-favorites', [])
   const [copied, setCopied] = useState(false)
   const [deleting, setDeleting] = useState(false)
   const saved = favorites.includes(post._id)
   const isOwner = loggedInUser?._id && post.user?._id === loggedInUser._id

   const toggleFavorite = () => {
      setFavorites(current => saved ? current.filter(id => id !== post._id) : [...current, post._id])
   }

   const share = async () => {
      const url = window.location.href
      try {
         if (navigator.share) await navigator.share({ title: post.title, text: 'Check out this listing on Altizachen', url })
         else {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
         }
      } catch {}
   }

   const removeListing = async () => {
      if (!window.confirm('Delete this listing? This cannot be undone.')) return
      setDeleting(true)
      try {
         await axios.delete(API_URL + '/posts/' + post._id, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') }
         })
         navigate('/')
      } catch (error) {
         window.alert(error?.response?.data?.message || 'Could not delete listing.')
      } finally {
         setDeleting(false)
      }
   }

   return (
      <div className="listing-actions">
         <button type="button" className={saved ? 'action-btn saved' : 'action-btn'} onClick={toggleFavorite} aria-pressed={saved}>
            {saved ? '♥ Saved' : '♡ Save'}
         </button>
         <button type="button" className="action-btn" onClick={share}>
            {copied ? '✓ Link copied' : '↗ Share'}
         </button>
         {isOwner && (
            <>
               <button type="button" className="action-btn" onClick={() => navigate('/listing/' + post._id + '/edit')}>
                  Edit
               </button>
               <button type="button" className="action-btn danger" onClick={removeListing} disabled={deleting}>
                  {deleting ? 'Deleting…' : 'Delete'}
               </button>
            </>
         )}
      </div>
   )
}