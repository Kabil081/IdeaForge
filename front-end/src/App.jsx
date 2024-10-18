import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Calculator from './components/Calculator'
import Contact from './components/Contact'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import  Profile  from './components/Profile'
import Logout from './components/Logout'
import ForgotPassword from './components/ForgotPassword'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/calculator' element={<Calculator/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  )
}
export default App;