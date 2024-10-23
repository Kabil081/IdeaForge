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
import HealthcareCostEstimator from './components/HealthcareCostEstimator'
import Health from "./components/Health"
import Goal from './components/Goal'
import Proscons from './components/proscons'
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
      <Route path="/health" element={<HealthcareCostEstimator/>}/>
      <Route path="/literacy" element={<Health/>}/>
      <Route path="/goal" element={<Goal/>}/>
      <Route path='/proscons' element={<Proscons/>}/>
    </Routes>
  )
}
export default App;