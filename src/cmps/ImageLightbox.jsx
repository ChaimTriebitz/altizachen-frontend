import { useEffect, useState } from 'react'
import { ImageDisplay } from './'

export const ImageLightbox = ({ images = [], initialIndex = 0, onClose }) => {
   const [index, setIndex] = useState(initialIndex)
   const [zoomed, setZoomed] = useState(false)

   useEffect(() => {
      const onKeyDown = e => {
         if (e.key === 'Escape') onClose()
         if (e.key === 'ArrowRight') setIndex(value => (value + 1) % images.length)
         if (e.key === 'ArrowLeft') setIndex(value => (value - 1 + images.length) % images.length)
         if (e.key === '+' || e.key === '=') setZoomed(true)
         if (e.key === '-') setZoomed(false)
      }
      document.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
         document.removeEventListener('keydown', onKeyDown)
         document.body.style.overflow = ''
      }
   }, [images.length, onClose])

   if (!images.length) return null

   return (
      <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
         <div className="lightbox-toolbar" onClick={e => e.stopPropagation()}>
            <span>{index + 1} / {images.length}</span>
            <button type="button" onClick={() => setZoomed(value => !value)}>{zoomed ? 'Zoom out' : 'Zoom in'}</button>
            <button type="button" onClick={onClose} aria-label="Close photo viewer">×</button>
         </div>
         <div className={'lightbox-stage ' + (zoomed ? 'zoomed' : '')} onClick={e => e.stopPropagation()}>
            <ImageDisplay publicId={images[index]} />
         </div>
         {images.length > 1 && (
            <>
               <button type="button" className="lightbox-arrow prev" onClick={e => { e.stopPropagation(); setIndex(value => (value - 1 + images.length) % images.length); setZoomed(false) }} aria-label="Previous photo">‹</button>
               <button type="button" className="lightbox-arrow next" onClick={e => { e.stopPropagation(); setIndex(value => (value + 1) % images.length); setZoomed(false) }} aria-label="Next photo">›</button>
            </>
         )}
      </div>
   )
}
