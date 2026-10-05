import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { OPTIONS } from '../data'
import API_URL from '../config/api'

export const EditPost = () => {
   const { id } = useParams()
   const navigate = useNavigate()
   const [values, setValues] = useState({ title: '', description: '', price: '', currency: '', category: '' })
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
               category: data.category || ''
            })
         })
         .catch(error => setErr(error?.response?.data?.message || 'Could not load this listing.'))
         .finally(() => setLoading(false))
   }, [id])

   const handleChange = event => {
      const { name, value } = event.target
      setValues(current => ({ ...current, [name]: value }))
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
               <p>Update the details of your item.</p>
            </div>
            <form onSubmit={handleSubmit} className="form create-form">
               <div className="input"><label htmlFor="title">Title</label><input id="title" name="title" value={values.title} onChange={handleChange} required maxLength={120} /></div>
               <div className="form-row">
                  <div className="input"><label htmlFor="category">Category</label><select id="category" name="category" value={values.category} onChange={handleChange} required><option value="">Choose category</option>{OPTIONS.categories.map((option, i) => <option key={i} value={option.name}>{option.name}</option>)}</select></div>
                  <div className="input"><label htmlFor="price">Price</label><input type="number" min="0" step="0.01" id="price" name="price" value={values.price} onChange={handleChange} required /></div>
                  <div className="input"><label htmlFor="currency">Currency</label><select id="currency" name="currency" value={values.currency} onChange={handleChange} required><option value="">Currency</option>{OPTIONS.currencies.map((option, i) => <option key={i} value={option.name}>{option.symbol} {option.name}</option>)}</select></div>
               </div>
               <div className="input"><label htmlFor="description">Description</label><textarea id="description" name="description" value={values.description} onChange={handleChange} required maxLength={5000} /></div>
               {err && <p className="error" role="alert">{err}</p>}
               <button className="submit-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
            </form>
         </div>
      </div>
   )
}
