import React from 'react'
import Navbar from './Navbar'
import Footer from "./Footer"
import { Button } from './ui/Button'
import Example from './Example'
const Home = () => {
  return (
    <>
      <Navbar/>
      <Button className="mb-11">Click me</Button>
      <Example/>
      <Footer/>
    </>
  )
}
export default Home