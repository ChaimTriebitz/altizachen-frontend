import axios from 'axios'
import React, { useState } from 'react'
import ImageDisplay from './ImageDisplay'

export const ImageGallery = () => {
   const [publicIds, setPublicIds] = useState([])
   const tok = localStorage.getItem('authToken')
   const getImages = async () => {
      const res = await axios.get('http://localhost:5000/api/private/get_images', {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tok}`
         }
      })
      setPublicIds(res.data.data)
   }

   return (
      <div>
         <button onClick={getImages}>getImages</button>
         {
            publicIds.map(id => <ImageDisplay publicId={id} />)
         }
      </div>
   )
}
