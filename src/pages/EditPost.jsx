import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OPTIONS } from '../data'
import { convertBase64 } from '../functions'
import API_URL from '../config/api'

const MAX_IMAGES = 8

export const EditPost = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const fileInputRef = useRef(null)
   const [values, setValues] = useState({ title: '', description: '', price: '', currency: '', category: '', images: [] })
   const [loading, setLoading] = useState(true)
   const [saving, setSaving] = useState(false)
   const [err, setErr] = useState('')
   const token = localStorage.getItem('authToken')

   useEffect(() => {
      axios.get(API_URL + '/posts/' + id)
         .then(({ data }) => {
            setValues({
               title: data.title || '',
               description: data.description || '',
               price: data.price ?? '',
               currency: data.currency || '',
               category: data.category || '',
               images: data.images || []
            })
         })
         .catch(error => setErr(error?.response?.data?.message || 'Could not load this listing.'))
         .finally(() => setLoading(false))
   }, [id])

   const handleChange = event => {
      const { name, value } = event.target
      setValues(current => ({ ...current, [name]: value }))
   }

   const handleUploadImages = async event => {
      const files = Array.from(event.target.files || [])
      if (!files.length) return
      const remaining = MAX_IMAGES - values.images.length
      if (remaining <= 0) return
      try {
         const converted = await Promise.all(files.slice(0, remaining).map(file => convertBase64(file)))
         setValues(current => ({ ...current, images: [...current.images, ...converted] }))
      } catch {
         setErr('Could not process one of the selected images.')
      } finally {
         event.target.value = ''
      }
   }

   const removeImage = index => {
      setValues(current => ({ ...current, images: current.images.filter((_, imageIndex) => imageIndex !== index) }))
   }

   const handleSubmit = async event => {
      event.preventDefault()
      setErr('')
      setSaving(true)
      try {
         await axios.put(API_URL + '/posts/' + id, values, {
            headers: { Authorization: 'Bearer ' + token }
         })
         navigate('/listing/' + id)
      } catch (error) {
         setErr(error?.response?.data?.message || 'Could not update your listing.')
      } finally {
         setSaving(false)
      }
   }

   if (loading) return <div className="page create-page"><div className="create-card"><div className="loading-card">Loading listing…</div></div></div>

   return (
      <div className="page create-page">
         <div className="create-card">
            <div className="create-heading">
               <button className="back-btn" type="button" onClick={() => navigate(-1)}>← Back</button>
               <span className="eyebrow">MY LISTING</span>
               <h1>Edit listing</h1>
               <p>Update the details and photos of your item.</p>
            </div>
            <form onSubmit={handleSubmit} className="form create-form">
               <div className="input"><label htmlFor="title">Title</label><input id="title" name="title" value={values.title} onChange={handleChange} required maxLength={120} /></div>
               <div className="form-row">
                  <div className="input"><label htmlFor="category">Category</label><select id="category" name="category" value={values.category} onChange={handleChange} required><option value="">Choose category</option>{OPTIONS.categories.map((option, i) => <option key={i} value={option.name}>{option.name}</option>)}</select></div>
                  <div className="input"><label htmlFor="price">Price</label><input type="number" min="0" step="0.01" id="price" name="price" value={values.price} onChange={handleChange} required /></div>
                  <div className="input"><label htmlFor="currency">Currency</label><select id="currency" name="currency" value={values.currency} onChange={handleChange} required><option value="">Currency</option>{OPTIONS.currencies.map((option, i) => <option key={i} value={option.name}>{option.symbol} {option.name}</option>)}</select></div>
               </div>
               <div className="input"><label htmlFor="description">Description</label><textarea id="description" name="description" value={values.description} onChange={handleChange} required maxLength={5000} /></div>
               <div className="input image-edit-field">
                  <label>Photos</label>
                  <div className="image-edit-grid">
                     {values.images.map((image, index) => (
                        <div className="image-edit-item" key={image + '-' + index}>
                           <img src={image.startsWith('data:image/') || image.startsWith('http') ? image : 'https://res.cloudinary.com/dlyxlzh2y/image/upload/f_auto,q_auto,w_500/' + image} alt={'Listing photo ' + (index + 1)} />
                           {index === 0 && <span className="image-cover-label">Cover</span>}
                           <button type="button" className="image-remove-btn" onClick={() => removeImage(index)} aria-label={'Remove photo ' + (index + 1)}>×</button>
                        </div>
                     ))}
                     {values.images.length < MAX_IMAGES && (
                        <button type="button" className="image-add-btn" onClick={() => fileInputRef.current?.click()}>
                           <span>+</span>
                           <small>Add photo</small>
                        </button>
                     )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp,image/jfif" multiple onChange={handleUploadImages} hidden />
                  <small className="image-help">{values.images.length}/{MAX_IMAGES} photos · The first photo is the cover</small>
               </div>
               {err && <p className="error" role="alert">{err}</p>}
               <button className="submit-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
            </form>
         </div>
      </div>
   )
}
