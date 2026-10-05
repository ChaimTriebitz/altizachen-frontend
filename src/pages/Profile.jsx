import { Navigate } from 'react-router-dom'
import { UserProfile } from '../cmps/UserProfile'
import { useGlobalState } from '../hooks'

export const Profile = () => {
   const { loggedInUser } = useGlobalState()

   if (!loggedInUser) return <Navigate to="/login" replace />

   return (
      <div className="page profile-page">
         <section className="profile-page-content">
            <div className="profile-page-heading">
               <span className="eyebrow">ACCOUNT</span>
               <h1>Your profile</h1>
               <p>Manage your account details and profile photo.</p>
            </div>
            <UserProfile />
         </section>
      </div>
   )
}
