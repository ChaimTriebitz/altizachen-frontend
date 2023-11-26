import { Route, Routes } from 'react-router-dom';
import { CreatePost, NavBar } from './cmps';
import { ForgotPassword, Home, Login, Register, ResetPassword } from './pages';
function App() {
   return (
      <div className="App">
         <NavBar />
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create_post' element={<CreatePost />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='resetpassword/:resetToken' element={<ResetPassword />} />
         </Routes>
      </div>
   );
}

export default App;
