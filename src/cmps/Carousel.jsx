import { useMemo, useState } from 'react'
import { svgs } from '../assets/svgs'
import { cloneElement } from 'react'

export function Carousel({ children }) {
   const items = Array.isArray(children) ? children : [children]
   const [imageIndex, setImageIndex] = useState(0)
   const [invalidIndexes, setInvalidIndexes] = useState([])

   const visibleItems = useMemo(
      () => items.filter((_, index) => !invalidIndexes.includes(index)),
      [items, invalidIndexes]
   )

   if (!visibleItems.length) return null

   const stopClick = (event) => {
      event.preventDefault()
      event.stopPropagation()
   }

   const removeImage = (originalIndex) => {
      setInvalidIndexes(current => current.includes(originalIndex) ? current : [...current, originalIndex])
      setImageIndex(0)
   }

   const showNextImage = (event) => {
      stopClick(event)
      setImageIndex(index => index === visibleItems.length - 1 ? 0 : index + 1)
   }

   const showPrevImage = (event) => {
      stopClick(event)
      setImageIndex(index => index === 0 ? visibleItems.length - 1 : index - 1)
   }

   return (
      <div className="carousel" aria-label="Listing photos">
         <div className="slides">
            {visibleItems.map((child, index) => {
               const originalIndex = items.indexOf(child)
               return (
                  <div key={originalIndex} className="slide" style={{ transform: 'translateX(' + (-100 * imageIndex) + '%)' }}>
                     {cloneElement(child, { onImageError: () => removeImage(originalIndex) })}
                  </div>
               )
            })}
         </div>
         {visibleItems.length > 1 && <>
            <button type="button" className="btn left" onClick={showPrevImage} aria-label="Previous photo">{svgs.arrowLeft}</button>
            <button type="button" className="btn right" onClick={showNextImage} aria-label="Next photo">{svgs.arrowRight}</button>
            <div className="indicators" aria-label="Choose photo">
               {visibleItems.map((_, index) => (
                  <button type="button" className={index === imageIndex ? 'indicator active' : 'indicator'} key={index} onClick={(event) => { stopClick(event); setImageIndex(index) }} aria-label={'Show photo ' + (index + 1)} aria-current={index === imageIndex ? 'true' : undefined} />
               ))}
            </div>
         </>}
      </div>
   )
}
