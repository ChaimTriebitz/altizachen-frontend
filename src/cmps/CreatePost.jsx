import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks'
import { convertBase64 } from '../functions'
import { OPTIONS } from '../data'
import API_URL from '../config/api'

export const CreatePost = () => {
   const [err, setErr] = useState('')
   const [saving, setSaving] = useState(false)
   const SR = useRef(null)
   const navigate = useNavigate()
   const { values, handleChange } = useForm({ title: '', description: '', price: '', currency: '', category: '', images: [] })
   const tok = localStorage.getItem('authToken')

   const handleUploadImages = async (e) => {
      const files = Array.from(e.target.files || [])
      const converted = await Promise.all(files.map(file => convertBase64(file)))
      handleChange({ target: { name: 'images', value: converted } })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')
      setSaving(true)
      try {
         await axios.post(API_URL + '/posts', values, {
            headers: { Authorization: 'Bearer ' + tok }
         })
         navigate('/')
      } catch (error) {
         setErr(error?.response?.data?.message || 'Could not create listing')
      } finally {
         setSaving(false)
      }
   }

   return (
      <div className='create-post'>
         <form onSubmit={handleSubmit} className='form'>
            <div className='input'><label htmlFor='title'>Title</label><input id='title' name='title' value={values.title} onChange={handleChange} required maxLength={120} /></div>
            <div className='input'><label htmlFor='currency'>Currency</label>
               <select ref={SR} id='currency' name='currency' value={values.currency} onChange={handleChange} required>
                  <option value=''>Currency</option>
                  {OPTIONS.currencies.map((option, i) => <option key={i} value={option.name}>{option.symbol} {option.name}</option>)}
               </select>
            </div>
            <div className='input'><label htmlFor='category'>Category</label>
               <select id='category' name='category' value={values.category} onChange={handleChange} required>
                  <option value=''>Category</option>
                  {OPTIONS.categories.map((option, i) => <option key={i} value={option.name}>{option.name}</option>)}
               </select>
            </div>
            <div className='input'><label htmlFor='description'>Description</label><textarea id='description' name='description' value={values.description} onChange={handleChange} required maxLength={5000} /></div>
            <div className='input'><label htmlFor='price'>Price</label><input type='number' min='0' id='price' name='price' value={values.price} onChange={handleChange} required /></div>
            <div className='input'>
               <label htmlFor='image'>Photos</label>
               <div className='images'>{values.images.map((image, i) => <img key={i} src={image} alt='' />)}</div>
               <input type='file' id='image' accept='image/png,image/jpeg,image/jpg,image/jfif' onChange={handleUploadImages} multiple />
            </div>
            <button disabled={saving}>{saving ? 'Publishing...' : 'Publish listing'}</button>
            {err && <p className='error'>{err}</p>}
         </form>
      </div>
   )
}
