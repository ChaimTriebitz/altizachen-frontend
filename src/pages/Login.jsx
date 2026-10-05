import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm, useLogInUser } from '../hooks'
import { ls } from '../functions'
import API_URL from '../config/api'

export const Login = () => {
   const { login } = useLogInUser()
   const [err, setErr] = useState('')
   const { values, handleChange } = useForm({ email: '', password: '' })

   useEffect(() => {
      const token = ls.checkForItem('authToken')
      if (token) login(token)
   }, [login])

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')
      try {
         const response = await axios.post(API_URL + '/auth/login', values)
         if (response.data.success) login(response.data.token)
      } catch (error) {
         setErr(error?.response?.data?.error || 'Login failed')
      }
   }

   return (
      <div className="page login">
         <form onSubmit={handleSubmit} className='form'>
            <div className="input"><label htmlFor="email">email</label><input id='email' type="email" name='email' value={values.email} onChange={handleChange} required /></div>
            <div className="input"><label htmlFor="password">password</label><input id='password' type="password" name='password' value={values.password} onChange={handleChange} required /></div>
            <button type="submit">Login</button>
         </form>
         <p className='error'>{err}</p>
         <nav><Link to='/register'>Register</Link><Link to='/forgotpassword'>Forgot Password</Link></nav>
      </div>
   )
}
