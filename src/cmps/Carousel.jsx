import { useState } from 'react'
import { svgs } from '../assets/svgs'

export function Carousel({ children }) {
   const items = Array.isArray(children) ? children : [children]
   const [imageIndex, setImageIndex] = useState(0)

   if (!items.length) return null

   const stopClick = (event) => event.stopPropagation()
   const showNextImage = (event) => {
      stopClick(event)
      setImageIndex(index => index === items.length - 1 ? 0 : index + 1)
   }
   const showPrevImage = (event) => {
      stopClick(event)
      setImageIndex(index => index === 0 ? items.length - 1 : index - 1)
   }

   return (
      <div className="carousel" aria-label="Listing photos">
         <div className="slides">
            {items.map((child, index) => (
               <div key={index} className="slide" style={{ transform: 'translateX(' + (-100 * imageIndex) + '%)' }}>
                  {child}
               </div>
            ))}
         </div>
         {items.length > 1 && <>
            <button type="button" className="btn left" onClick={showPrevImage} aria-label="Previous photo">{svgs.arrowLeft}</button>
            <button type="button" className="btn right" onClick={showNextImage} aria-label="Next photo">{svgs.arrowRight}</button>
            <div className="indicators" aria-label="Choose photo">
               {items.map((_, index) => (
                  <button type="button" className={index === imageIndex ? 'indicator active' : 'indicator'} key={index} onClick={(event) => { stopClick(event); setImageIndex(index) }} aria-label={'Show photo ' + (index + 1)} aria-current={index === imageIndex ? 'true' : undefined} />
               ))}
            </div>
         </>}
      </div>
   )
}
