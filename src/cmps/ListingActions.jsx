import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ListingActions = ({ post }) => {
   const [favorites, setFavorites] = useLocalStorage('altizachen-favorites', [])
   const [copied, setCopied] = useState(false)
   const saved = favorites.includes(post._id)

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

   return (
      <div className="listing-actions">
         <button type="button" className={saved ? 'action-btn saved' : 'action-btn'} onClick={toggleFavorite} aria-pressed={saved}>
            {saved ? '♥ Saved' : '♡ Save'}
         </button>
         <button type="button" className="action-btn" onClick={share}>
            {copied ? '✓ Link copied' : '↗ Share'}
         </button>
      </div>
   )
}
