import React from 'react'
import Navbar from './Navbar'
import Footer from "./Footer"
import { Button } from './ui/Button'
const Home = () => {
  return (
    <>
      <Navbar/>
      <Button className="mb-11">Click me</Button>
      <Footer/>
    </>
  )
}
export default Home;