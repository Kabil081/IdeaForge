import React from 'react'
import { Routes,Route } from 'react-router'
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Calculator from './components/Calculator'
import Contact from './components/Contact'
const App = () => {
  return (
    <Routes>
      <Route path='/' component={<Home/>}/>
      <Route path='/contact' component={<Contact/>}/>
      <Route path='/calculator' component={<Calculator/>}/>
      <Route path='/about' component={<About/>}/>
      <Route path='/login' component={<Login/>}/>
    </Routes>
  )
}
export default App