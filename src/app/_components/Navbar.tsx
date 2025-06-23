"use client"
import { Suspense } from "react"
import BreadCrum from "./BreadCrum"
import Button from "./Button"
import Logo from "./Logo"


function Navbar() {
  
  
  return (
    

    <nav className=" fixed grid grid-cols-3 justify-between  sm:px-20 px-6 pt-10 w-full items-center    text-white">
      <Logo/>
<Suspense fallback={null}>
    <BreadCrum/>
</Suspense>
      <ul className="sm:flex  items-center justify-between
backdrop-blur-3xl   overflow-hidden rounded-4xl bg-amber-100/15 hidden  text-lg px-6">
  
        <li className="  px-4 rounded-r-2xl py-3 hover-navlink ">Home</li>
        <li className="nav-item hover-navlink ">Buy</li>
        <li className="nav-item hover-navlink ">Rent</li>
        <li className="nav-item hover-navlink  ">About</li>
        
      </ul>

     <Button className='bg-black hover-blackbtn text-white sm:block hidden p-2 justify-self-end rounded-full px-6'>
          Login
        </Button>
    </nav>

    
  )
}

export default Navbar
