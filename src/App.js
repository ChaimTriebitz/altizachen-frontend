import { useEffect } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { CreatePost, NavBar } from './cmps'
import { EditPost, ForgotPassword, Home, Listing, Login, Messages, Profile, Register, ResetPassword } from './pages'
import { useGlobalState } from './hooks'
import { ACTIONS } from './state'
import API_URL from './config/api'

function App() {
   const { dispatch } = useGlobalState()

   useEffect(() => {
      const token = localStorage.getItem('authToken')
      if (!token) return

      axios.get(API_URL + '/users', {
         headers: { Authorization: 'Bearer ' + token }
      }).then(({ data }) => {
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: data.user })
      }).catch(() => {
         localStorage.removeItem('authToken')
         dispatch({ type: ACTIONS.SET, entity: 'loggedInUser', payload: null })
      })
   }, [dispatch])

   return (
      <div className="App">
         <NavBar />
         <main className="app-main">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/listing/:id" element={<Listing />} />
               <Route path="/listing/:id/edit" element={<EditPost />} />
               <Route path="/create_post" element={<CreatePost />} />
               <Route path="/messages" element={<Messages />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/forgotpassword" element={<ForgotPassword />} />
               <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
            </Routes>
         </main>
      </div>
   )
}

export default App
