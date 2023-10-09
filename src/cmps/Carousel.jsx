import { useState } from 'react'
import { svgs } from '../assets/svgs'



export function Carousel({ children }) {
   console.log(children);
   const [imageIndex, setImageIndex] = useState(0)

   function showNextImage() {
      setImageIndex(index => {
         if (index === children.length - 1) return 0
         return index + 1
      })
   }

   function showPrevImage() {
      setImageIndex(index => {
         if (index === 0) return children.length - 1
         return index - 1
      })
   }

   return (
      <div className='carousel'>
         <div className='slides' >
            {children.map((_, index) => (
               <div key={index} className="slide" style={{ translate: `${-100 * imageIndex}%` }}>
                  {children[index]}
               </div>
            ))}
         </div>
         <button className="btn left" onClick={showPrevImage}>{svgs.arrowLeft}</button>
         <button className="btn right" onClick={showNextImage}>{svgs.arrowRight}</button>
         <div className='indicators'>
            {children.map((_, index) => (
               <button key={index} onClick={() => setImageIndex(index)}>
                  {index === imageIndex ? '⚫' : '🔘'}
               </button>
            ))}
         </div>
      </div>
   )
}

