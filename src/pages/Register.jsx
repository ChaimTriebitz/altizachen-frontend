import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm, useLogInUser } from '../hooks'

export const Register = () => {
   const login = useLogInUser()
   const { values, handleChange, resetValues } = useForm({ username: '', email: '', password: '', avatar: '' })
   const [err, setErr] = useState('')
   const nameInputRef = useRef(null)

   useEffect(() => {
      nameInputRef.current.focus()
   }, [err])

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const { data } = await axios.post(`http://localhost:5000/api/auth/register`, { ...values })
         login(data.token)
      } catch (error) {
         setErr(error?.response?.data?.error || error?.message + ' !')
         resetValues()
      }
   }

   const handleImageChange = (e) => {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {
         handleChange({
            target: {
               name: e.target.name,
               value: reader.result
            }
         })
      }
   }
   console.log(values);
   return (
      <div className='page register'>
         <article className='form'>
            <form onSubmit={handleSubmit}>
               <label htmlFor="name">name</label>
               <input
                  ref={nameInputRef}
                  id='name'
                  placeholder='name'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
               />
               <label htmlFor="email">email</label>
               <input
                  id='email'
                  placeholder='email'
                  type="email"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
               />
               <label htmlFor="password">password</label>
               <input
                  id='password'
                  placeholder='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
               />
               <label htmlFor="image">upload image</label>
               <input
                  id='image'
                  placeholder='image'
                  type="file"
                  accept='image/png,image/jpeg,image/jpg,image/jfif'
                  onChange={handleImageChange}
                  name='avatar'
               />
               <h2 className='error'>{err}</h2>
               <button>submit</button>
               <nav>
                  <Link to='/login'>Login</Link>
               </nav>
            </form>
         </article>

      </div>
   )
}
