import axios from 'axios';
import { useForm, useGlobalState } from '../hooks'
import ImageDisplay from './ImageDisplay';

export const UserProfile = () => {
   const { loggedInUser } = useGlobalState()
   console.log(loggedInUser);
   const { values, handleChange, resetValues } = useForm({ username: loggedInUser.username, email: loggedInUser.email, avatar: loggedInUser.avatar })
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
   const handleSubmit = async (e) => {
      e.preventDefault()
      const tok = localStorage.getItem('authToken')
      try {
         const { data } = await axios.patch(`http://localhost:5000/api/users`, { ...values }, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${tok}`
            }
         },)
         console.log(data);
      } catch (error) {
      }
   }
   return (
      <div className='user-profile'>
         <form className='form' onSubmit={handleSubmit}>
            <div className="input">
               <label htmlFor="username">username</label>
               <input
                  placeholder='username'
                  id='username'
                  name='username'
                  value={values.username}
                  onChange={handleChange}
               />
            </div>
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
            <div className='input'>
               <label htmlFor="image">{<ImageDisplay publicId={loggedInUser?.avatar} isAvatar={false} />}</label>
               <input
                  type="file"
                  name='avatar'
                  id='image'
                  accept='image/png,image/jpeg,image/jpg,image/jfif'
                  onChange={handleImageChange}
                  multiple
                  hidden
               />
            </div>
            <button className='btn'>save</button>
         </form>
      </div>
   )
}
