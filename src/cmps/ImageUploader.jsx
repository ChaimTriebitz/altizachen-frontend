import { useState } from 'react'
import axios from 'axios'
import { convertBase64 } from '../functions'

export const ImageUploader = () => {
   const [images, setImages] = useState([])
   const tok = localStorage.getItem('authToken')
   const handleSubmit = async (e) => {
      e.preventDefault()
      if (images.length > 0) {

      }
      const res = await axios.post('http://localhost:5000/api/private/upload_images', {
         images
      }, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tok}`
         }
      })
      try {
         console.log(res.data)
      } catch (error) {
         console.log(error);
      }

   }
   const handleChange = async (e) => {
      const files = e.target.files
      let convertedFiles = []
      for (let i = 0; i < files.length; i++) {
         const currConvertedFile = await convertBase64(files[i])
         convertedFiles.push(currConvertedFile)
      }
      setImages(convertedFiles)
   }





   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label htmlFor="image">upload image</label>
            <input
               type="file"
               id='image'
               accept='image/png,image/jpeg,image/jpg,image/jfif'
               onChange={handleChange}
               multiple
            />
            <button>submit</button>
         </form>
         {
            images.map((image, imageIdx) => <img key={imageIdx} src={image} alt="" />)
         }
      </div>
   )
}



