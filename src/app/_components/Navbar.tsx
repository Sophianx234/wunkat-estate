"use client"
import Link from "next/link"
import BreadCrum from "./BreadCrum"
import Logo from "./Logo"


function Navbar() {
  
  
  return (
    

    <nav className=" z-10 fixed sm:grid flex grid-cols-3 justify-between  sm:px-20 px-6 pt-10 w-full items-center    text-white">
      <Logo/>

    <BreadCrum/>

      <ul className="sm:flex  items-center justify-between
backdrop-blur-3xl   overflow-hidden rounded-4xl bg-amber-100/15 hidden  text-lg px-6">
  
        <li className="  px-4 rounded-r-2xl py-3 hover-navlink ">Home</li>
        <li className="nav-item hover-navlink ">Buy</li>
        <li className="nav-item hover-navlink ">Rent</li>
        <li className="nav-item hover-navlink  ">About</li>
        
      </ul>

     <Link href='login' className='bg-black hover-blackbtn text-white sm:block hidden p-2 justify-self-end rounded-full px-6'>
          Login
        </Link>
    </nav>

    
  )
}

export default Navbar
