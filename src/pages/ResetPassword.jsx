import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks';

export const ResetPassword = () => {
   const navigate = useNavigate()
   const { resetToken } = useParams()
   const { values, handleChange, resetValues } = useForm({ password: '' })

   const [err, setErr] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const { data } = await axios.put(`http://localhost:5000/api/auth/resetpassword/${resetToken}`, { ...values },)
         navigate('/login')
      } catch (error) {
         setErr(error.response.data.error)
      }
   }



   return (
      <div className='login'>
         <form onSubmit={handleSubmit}>
            <label htmlFor="password">password</label>
            <input id='password' name='password' value={values.password} onChange={handleChange} />
            <button>Reset Password</button>
         </form>
         <h1>{err}</h1>
      </div>
   )
}
