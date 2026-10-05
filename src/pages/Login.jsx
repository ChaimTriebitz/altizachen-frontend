import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm, useLogInUser } from '../hooks'
import { ls } from '../functions'
import API_URL from '../config/api'

export const Login = () => {
   const { login } = useLogInUser()
   const [err, setErr] = useState('')
   const [loading, setLoading] = useState(false)
   const { values, handleChange } = useForm({ email: '', password: '' })

   useEffect(() => {
      const token = ls.checkForItem('authToken')
      if (token) login(token)
   }, [login])

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')
      setLoading(true)
      try {
         const response = await axios.post(API_URL + '/auth/login', values)
         if (response.data.success) login(response.data.token)
      } catch (error) {
         setErr(error?.response?.data?.error || error?.response?.data?.message || 'Could not log in. Please check your details.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="page auth-page">
         <div className="auth-card">
            <div className="auth-heading">
               <span className="eyebrow">WELCOME BACK</span>
               <h1>Log in to Altizachen</h1>
               <p>Continue browsing and managing your listings.</p>
            </div>
            <form onSubmit={handleSubmit} className="form">
               <div className="input">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={values.email} onChange={handleChange} autoComplete="email" required />
               </div>
               <div className="input">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" name="password" value={values.password} onChange={handleChange} autoComplete="current-password" required />
               </div>
               {err && <p className="error" role="alert">{err}</p>}
               <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? 'Signing in…' : 'Log in'}
               </button>
            </form>
            <nav className="auth-links">
               <Link to="/register">Create an account</Link>
               <Link to="/forgotpassword">Forgot password?</Link>
            </nav>
         </div>
      </div>
   )
}
