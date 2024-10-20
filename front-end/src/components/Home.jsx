import React from 'react'
import Navbar from './Navbar'
import Footer from "./Footer"
import { Button } from './ui/Button'
import Discussion from './Discussion'
const Home = () => {
  return (
    <>
      <Navbar/>
      <Discussion/>
      <Footer/>
    </>
  )
}
export default Home;