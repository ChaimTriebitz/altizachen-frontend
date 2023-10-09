import { Route, Routes } from 'react-router-dom';
import { NavBar } from './cmps';
import { ForgotPassword, Home, Login, Register, ResetPassword } from './pages';
function App() {
   console.log('init');
   return (
      <div className="App">
         <NavBar />
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='resetpassword/:resetToken' element={<ResetPassword />} />
         </Routes>
      </div>
   );
}

export default App;
