import { useState } from 'react'
import axios from 'axios'
import { useForm } from '../hooks'

export const ForgotPassword = () => {
   const { values, handleChange, resetValues } = useForm({ email: '' })
   const [err, setErr] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const { data } = await axios.post(`http://localhost:5000/api/auth/forgotpassword`, { ...values },)
         console.log(data);
      } catch (error) {
         setErr(error.response.data.error)
      }
   }



   return (
      <div className='login'>
         <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input id='email' type="email" name='email' value={values.email} onChange={handleChange} />
            <button>Send Email</button>
         </form>
         <h1 className='error'>{err}</h1>
      </div>
   )
}

