"use client"
import { Suspense } from "react"
import BreadCrum from "./BreadCrum"
import Button from "./Button"
import Logo from "./Logo"


function Navbar() {
  
  
  return (
    

    <nav className=" fixed flex justify-between  sm:px-20 px-6 pt-10 w-full items-center    text-white">
      <Logo/>
<Suspense fallback={null}>
    <BreadCrum/>
</Suspense>
      <ul className="sm:flex  items-center justify-between
backdrop-blur-3xl   overflow-hidden rounded-4xl bg-amber-100/15 hidden  text-lg ">
  
        <li className=" pl-10 px-4 rounded-r-2xl py-3 hover-navlink ">Home</li>
        <li className="nav-item hover-navlink ">Buy</li>
        <li className="nav-item hover-navlink">Rent</li>
        <li className="nav-item hover-navlink">About</li>
        <li className="pr-10 hover-navlink">Contact us</li>
      </ul>

     <Button className='bg-black hover-blackbtn text-white sm:block hidden p-2 rounded-full px-6'>
          Login
        </Button>
    </nav>

    
  )
}

export default Navbar
