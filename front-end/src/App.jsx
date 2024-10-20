import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Contact from './components/Contact'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import  Profile  from './components/Profile'
import Logout from './components/Logout'
import ForgotPassword from './components/ForgotPassword'
import Discussion from './components/Discussion'
import Recommendation from './components/Recommendation'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/discussion" element={<Discussion />} />
      <Route path="/recommendation" element={<Recommendation />} />
    </Routes>
  )
}
export default App;