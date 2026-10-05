import axios from 'axios'
import { useState } from 'react'
import { useForm, useGlobalState, useLogInUser } from '../hooks'
import { ACTIONS } from '../state'
import ImageDisplay from './ImageDisplay'
import API_URL from '../config/api'

export const UserProfile = ({ onClose }) => {
   const { loggedInUser, dispatch } = useGlobalState()
   const { logout } = useLogInUser()
   const { values, handleChange } = useForm({
      username: loggedInUser?.username || '',
      email: loggedInUser?.email || '',
      avatar: loggedInUser?.avatar || ''
   })
   const [imageChanged, setImageChanged] = useState(false)
   const [saving, setSaving] = useState(false)
   const [error, setError] = useState('')
   const [saved, setSaved] = useState(false)

   const authHeaders = {
      Authorization: 'Bearer ' + localStorage.getItem('authToken')
   }

   const handleImageChange = (e) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onloadend = () => {
         handleChange({ target: { name: 'avatar', value: reader.result } })
         setImageChanged(true)
         setSaved(false)
         setError('')
      }
      reader.readAsDataURL(file)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setSaving(true)
      setError('')
      setSaved(false)

      try {
         let avatar = loggedInUser?.avatar || ''

         // Only upload when the user actually selected a new image.
         // This prevents an existing Cloudinary public ID from being
         // accidentally uploaded again during a normal profile save.
         if (imageChanged && values.avatar?.startsWith('data:image/')) {
            const uploadResponse = await axios.post(
               API_URL + '/users/upload_image',
               { image: values.avatar },
               { headers: authHeaders }
            )
            avatar = uploadResponse.data.public_id
         }

         const { data } = await axios.patch(
            API_URL + '/users',
            {
               username: values.username,
               email: values.email,
               avatar
            },
            { headers: authHeaders }
         )

         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: data.user || data })
         setImageChanged(false)
         setSaved(true)
      } catch (err) {
         const message =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.response?.data?.details ||
            err?.message

         setError(message || 'Could not save profile.')
      } finally {
         setSaving(false)
      }
   }

   return (
      <div className="user-profile">
         <div className="profile-heading">
            <strong>Your profile</strong>
            {onClose && <button type="button" onClick={onClose} aria-label="Close profile">×</button>}
         </div>
         <form className="form" onSubmit={handleSubmit}>
            <div className="profile-avatar">
               <div className="profile-avatar-image">
                  <ImageDisplay publicId={values.avatar} isAvatar={false} />
               </div>
               <label className="profile-photo-btn" htmlFor="profile-image">Change photo</label>
               <input type="file" id="profile-image" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={handleImageChange} hidden />
            </div>
            <div className="input"><label htmlFor="profile-username">Username</label><input id="profile-username" name="username" value={values.username} onChange={handleChange} required /></div>
            <div className="input"><label htmlFor="profile-email">Email</label><input id="profile-email" type="email" name="email" value={values.email} onChange={handleChange} required /></div>
            {error && <p className="error" role="alert">{error}</p>}
            {saved && <p className="success">Profile saved.</p>}
            <button className="submit-btn" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
            <button className="logout-btn" type="button" onClick={logout}>Log out</button>
         </form>
      </div>
   )
}
