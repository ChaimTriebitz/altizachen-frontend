import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm, useLogInUser } from '../hooks'
import API_URL from '../config/api'

export const Register = () => {
   const { login } = useLogInUser()
   const { values, handleChange } = useForm({ username: '', email: '', password: '', avatar: '' })
   const [err, setErr] = useState('')
   const nameInputRef = useRef(null)

   useEffect(() => nameInputRef.current?.focus(), [])

   const handleSubmit = async (e) => {
      e.preventDefault()
      setErr('')
      try {
         const response = await axios.post(API_URL + '/auth/register', values)
         login(response.data.token)
      } catch (error) {
         setErr(error?.response?.data?.error || 'Registration failed')
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
      <div className="page register">
         <form onSubmit={handleSubmit} className='form'>
            <div className="input"><label htmlFor="name">name</label><input ref={nameInputRef} id='name' name='username' value={values.username} onChange={handleChange} required /></div>
            <div className="input"><label htmlFor="email">email</label><input id='email' type="email" name='email' value={values.email} onChange={handleChange} required /></div>
            <div className="input"><label htmlFor="password">password</label><input id='password' type="password" name='password' value={values.password} onChange={handleChange} minLength={8} required /></div>
            <div className="input"><label htmlFor="image" className='single'>{values.avatar && <img src={values.avatar} alt="Avatar preview" />}</label><input id='image' type="file' accept='image/png,image/jpeg,image/jpg,image/webp' onChange={handleImageChange} hidden /></div>
            <h2 className='error'>{err}</h2>
            <button type="submit">Create account</button>
            <nav><Link to='/login'>Login</Link></nav>
         </form>
      </div>
   )
}
