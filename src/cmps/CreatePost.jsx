import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks'
import { convertBase64 } from '../functions'
import { OPTIONS } from '../data'
import API_URL from '../config/api'

export const CreatePost = () => {
   const [err, setErr] = useState('')
   const [saving, setSaving] = useState(false)
   const navigate = useNavigate()
   const { values, handleChange } = useForm({ title: '', description: '', price: '', currency: '', category: '', images: [] })
   const tok = localStorage.getItem('authToken')

   const handleUploadImages = async (e) => {
      const files = Array.from(e.target.files || [])
      if (!files.length) return
      const remaining = Math.max(0, 8 - values.images.length)
      const selected = files.slice(0, remaining)
      const converted = await Promise.all(selected.map(file => convertBase64(file)))
      handleChange({ target: { name: 'images', value: [...values.images, ...converted] } })
      e.target.value = ''
   }

   const removeImage = (index) => {
      handleChange({
         target: {
            name: 'images',
            value: values.images.filter((_, imageIndex) => imageIndex !== index)
         }
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')
      setSaving(true)
      try {
         await axios.post(API_URL + '/posts', values, { headers: { Authorization: 'Bearer ' + tok } })
         navigate('/')
      } catch (error) {
         setErr(error?.response?.data?.message || 'Could not publish your listing. Please try again.')
      } finally {
         setSaving(false)
      }
   }

   return (
      <div className="page create-page">
         <div className="create-card">
            <div className="create-heading">
               <button className="back-btn" type="button" onClick={() => navigate(-1)}>← Back</button>
               <span className="eyebrow">SELL ON ALTIZACHEN</span>
               <h1>Create a listing</h1>
               <p>Add the details buyers need. You can add up to 8 photos.</p>
            </div>
            <form onSubmit={handleSubmit} className="form create-form">
               <div className="input"><label htmlFor="title">Title</label><input id="title" name="title" value={values.title} onChange={handleChange} placeholder="e.g. iPhone 15 Pro 256GB" required maxLength={120} /></div>
               <div className="form-row">
                  <div className="input"><label htmlFor="category">Category</label><select id="category" name="category" value={values.category} onChange={handleChange} required><option value="">Choose category</option>{OPTIONS.categories.map((option, i) => <option key={i} value={option.name}>{option.name}</option>)}</select></div>
                  <div className="input"><label htmlFor="price">Price</label><input type="number" min="0" step="0.01" id="price" name="price" value={values.price} onChange={handleChange} placeholder="0" required /></div>
                  <div className="input"><label htmlFor="currency">Currency</label><select id="currency" name="currency" value={values.currency} onChange={handleChange} required><option value="">Currency</option>{OPTIONS.currencies.map((option, i) => <option key={i} value={option.name}>{option.symbol} {option.name}</option>)}</select></div>
               </div>
               <div className="input"><label htmlFor="description">Description</label><textarea id="description" name="description" value={values.description} onChange={handleChange} placeholder="Describe the condition, age, included accessories, pickup details…" required maxLength={5000} /></div>
               <div className="input photo-input">
                  <label htmlFor="image">Photos <span>{values.images.length}/8</span></label>
                  <div className="photo-grid">
                     {values.images.map((image, i) => (
                        <div className="photo-preview" key={i}>
                           <img src={image} alt={'Listing photo ' + (i + 1)} />
                           <button type="button" onClick={() => removeImage(i)} aria-label={'Remove photo ' + (i + 1)}>×</button>
                           {i === 0 && <span className="cover-badge">Cover</span>}
                        </div>
                     ))}
                     {values.images.length < 8 && (
                        <label className="add-photo" htmlFor="image">
                           <strong>+</strong>
                           <span>{values.images.length ? 'Add more' : 'Add photos'}</span>
                           <small>{8 - values.images.length} remaining</small>
                        </label>
                     )}
                  </div>
                  <input type="file" id="image" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleUploadImages} multiple hidden />
               </div>
               {err && <p className="error" role="alert">{err}</p>}
               <button className="submit-btn" disabled={saving}>{saving ? 'Publishing…' : 'Publish listing'}</button>
            </form>
         </div>
      </div>
   )
}
