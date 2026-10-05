import { Route, Routes } from 'react-router-dom'
import { CreatePost, NavBar } from './cmps'
import { ForgotPassword, Home, Listing, Login, Register, ResetPassword } from './pages'

function App() {
   return (
      <div className="App">
         <NavBar />
         <main className="app-main">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/listing/:id" element={<Listing />} />
               <Route path="/create_post" element={<CreatePost />} />
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
