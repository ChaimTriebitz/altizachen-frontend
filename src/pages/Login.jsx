import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useForm, useGlobalState, useLogInUser } from '../hooks'
import { ls } from '../functions'

export const Login = () => {
   const { login } = useLogInUser()
   const [err, setErr] = useState('')
   const { values, handleChange, resetValues } = useForm({ email: '', password: '' })
   const { loggedInUser, dispatch } = useGlobalState()

   useEffect(() => {
      if (ls.checkForItem('authToken')) login(ls.checkForItem('authToken'))
   }, [])




   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         const { data } = await axios.post(`http://localhost:5000/api/auth/login`, { ...values })
         if (data.success) {
            login(data.token)
         }

      } catch (error) {
         resetValues()
         setErr(error?.response?.data?.error || error?.message + ' !')
      }
   }

   return (
      <div className="page login">
         <form onSubmit={handleSubmit} className='form'>
            <div className="input">
               <label htmlFor="email">email</label>
               <input
                  placeholder='email'
                  id='email'
                  type="email"
                  name='email'
                  value={values.email}
                  onChange={handleChange}
               />
            </div>
            <div className="input">
               <label htmlFor="password">password</label>
               <input
                  placeholder='password'
                  id='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
               />
            </div>
            <button>submit</button>
         </form>
         <p className='error'>{err}</p>
         <nav>
            <Link to='/register'>Register</Link>
            <Link to='/forgotpassword'>Forgot Password</Link>
         </nav>
      </div>
   )
}
