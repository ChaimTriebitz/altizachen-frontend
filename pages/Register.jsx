import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm, useLogInUser } from '../hooks'
import API_URL from '../config/api'

export const Register = () => {
   const { login } = useLogInUser()
   const { values, handleChange } = useForm({ username: '', email: '', password: '', avatar: '' })
   const [err, setErr] = useState('')
   const [loading, setLoading] = useState(false)
   const nameInputRef = useRef(null)

   useEffect(() => nameInputRef.current?.focus(), [])

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')
      setLoading(true)
      try {
         const response = await axios.post(API_URL + '/auth/register', values)
         login(response.data.token)
      } catch (error) {
         setErr(error?.response?.data?.error || error?.response?.data?.message || 'Could not create your account.')
      } finally {
         setLoading(false)
      }
   }

   const handleImageChange = (e) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onloadend = () => handleChange({ target: { name: 'avatar', value: reader.result } })
      reader.readAsDataURL(file)
   }

   return (
      <div className="page auth-page">
         <div className="auth-card register-card">
            <div className="auth-heading">
               <span className="eyebrow">JOIN ALTIZACHEN</span>
               <h1>Create your account</h1>
               <p>List items, discover great deals, and chat with sellers.</p>
            </div>
            <form onSubmit={handleSubmit} className="form">
               <div className="input">
                  <label htmlFor="name">Name</label>
                  <input ref={nameInputRef} id="name" name="username" value={values.username} onChange={handleChange} autoComplete="name" required />
               </div>
               <div className="input">
                  <label htmlFor="register-email">Email</label>
                  <input id="register-email" type="email" name="email" value={values.email} onChange={handleChange} autoComplete="email" required />
               </div>
               <div className="input">
                  <label htmlFor="register-password">Password <span>8+ characters</span></label>
                  <input id="register-password" type="password" name="password" value={values.password} onChange={handleChange} minLength={8} autoComplete="new-password" required />
               </div>
               <div className="avatar-upload">
                  <label htmlFor="image" className="avatar-dropzone">
                     {values.avatar ? <img src={values.avatar} alt="Avatar preview" /> : <span>+ Add profile photo <small>optional</small></span>}
                  </label>
                  <input id="image" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleImageChange} hidden />
               </div>
               {err && <p className="error" role="alert">{err}</p>}
               <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? 'Creating account…' : 'Create account'}
               </button>
            </form>
            <nav className="auth-links">
               <span>Already have an account?</span>
               <Link to="/login">Log in</Link>
            </nav>
         </div>
      </div>
   )
}
