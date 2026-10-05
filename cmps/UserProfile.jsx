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
   const [saving, setSaving] = useState(false)
   const [error, setError] = useState('')
   const [saved, setSaved] = useState(false)

   const handleImageChange = (e) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onloadend = () => handleChange({ target: { name: 'avatar', value: reader.result } })
      reader.readAsDataURL(file)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setSaving(true)
      setError('')
      setSaved(false)
      try {
         const { data } = await axios.patch(API_URL + '/users', values, {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') }
         })
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: data.user || data })
         setSaved(true)
      } catch (err) {
         setError(err?.response?.data?.message || 'Could not save profile.')
      } finally {
         setSaving(false)
      }
   }

   return (
      <div className="user-profile">
         <div className="profile-heading">
            <strong>Your profile</strong>
            <button type="button" onClick={onClose} aria-label="Close profile">×</button>
         </div>
         <form className="form" onSubmit={handleSubmit}>
            <div className="profile-avatar">
               <label htmlFor="profile-image">
                  <ImageDisplay publicId={values.avatar} isAvatar={false} />
                  <span>Change photo</span>
               </label>
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
