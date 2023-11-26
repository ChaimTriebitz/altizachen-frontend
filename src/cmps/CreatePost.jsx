import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useForm } from '../hooks'
import { convertBase64 } from '../functions'
import { OPTIONS } from '../data'

export const CreatePost = () => {
   const [err, setErr] = useState('')
   const SR = useRef(null)

   const { values, handleChange, resetValues } = useForm({ title: '', description: '', price: 0, currency: '', category: '', images: [] })
   const tok = localStorage.getItem('authToken')

   const handleUploadImages = async (e) => {
      const files = e.target.files
      let convertedFiles = []
      for (let i = 0; i < files.length; i++) {
         const currConvertedFile = await convertBase64(files[i])
         convertedFiles.push(currConvertedFile)
      }
      handleChange({ target: { name: 'images', value: convertedFiles } })
   }
   console.log(values.images);
   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const { data } = await axios.post('http://localhost:5000/api/posts/upload', { ...values }, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${tok}`
            }
         })

      } catch (error) {

      }
   }

   return (
      <div className='create-post'>
         <form onSubmit={handleSubmit} className='form'>
            <div className='input'>
               <label htmlFor="title">Title</label>
               <input
                  placeholder='Title'
                  id='title'
                  name='title'
                  value={values.title || ''}
                  onChange={handleChange}
               />
            </div>
            <div className='input'>
               <label htmlFor="currency">Currency</label>
               <select
                  className={values.currency || 'no-value'}
                  ref={SR}
                  id='currency'
                  name='currency'
                  value={values.currency || ''}
                  onChange={handleChange}
               >
                  <option value="" style={{ display: 'none' }} >Currency</option>
                  {
                     OPTIONS.currencies.map((option, optionIdx) =>
                        <option
                           key={optionIdx}
                           value={option.name || ''}
                        >
                           {option.symbol}
                           &#160;
                           {option.name}
                        </option>
                     )
                  }
               </select>
            </div>
            <div className='input'>
               <label htmlFor="category">Category</label>
               <select
                  className={values.category || 'no-value'}
                  ref={SR}
                  id='category'
                  name='category'
                  value={values.category || ''}
                  onChange={handleChange}
               >
                  <option value="" style={{ display: 'none' }} >Category</option>
                  {
                     OPTIONS.categories.map((option, optionIdx) =>
                        <option
                           key={optionIdx}
                           value={option.name || ''}
                        >
                           {option.name}
                        </option>
                     )
                  }
               </select>
            </div>
            <div className='input'>
               <label htmlFor="description">Description</label>
               <input
                  placeholder='Description'
                  id='description'
                  name='description'
                  value={values.description || ''}
                  onChange={handleChange}
               />
            </div>
            <div className='input'>

               <label htmlFor="price">Price</label>
               <input
                  type='number'
                  placeholder='Price'
                  id='price'
                  name='price'
                  value={values.price || ''}
                  onChange={handleChange}
               />
            </div>
            <div className='input'>
               <label htmlFor="image">
                  <div className="images">
                     {
                        values.images.map((image, imageIdx) => <img key={imageIdx} src={image} alt="" />)
                     }
                  </div>
               </label>
               <input
                  type="file"
                  id='image'
                  accept='image/png,image/jpeg,image/jpg,image/jfif'
                  onChange={handleUploadImages}
                  multiple
                  hidden
               />
            </div>
            <button>submit</button>
            <p className='error'>{err}</p>
         </form>
      </div>
   )
}
