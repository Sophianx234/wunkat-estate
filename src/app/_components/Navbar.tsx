
import BreadCrum from "./BreadCrum"
import Button from "./Button"
import Logo from "./Logo"


function Navbar() {
  
  
  return (
    

    <nav className=" fixed flex justify-between  sm:px-20 px-6 pt-10 w-full items-center    text-white">
      <Logo/>

    <BreadCrum/>
      <ul className="sm:flex  items-center justify-between
backdrop-blur-3xl   overflow-hidden rounded-4xl bg-amber-100/15 hidden  text-lg ">
  
        <li className=" pl-10 px-4 rounded-r-2xl py-3">Home</li>
        <li className="nav-item">Buy</li>
        <li className="nav-item">Rent</li>
        <li className="nav-item">About</li>
        <li className="pr-10">Contact us</li>
      </ul>

     <Button className='bg-black text-white sm:block hidden p-2 rounded-full px-6'>
          Login
        </Button>
    </nav>

    
  )
}

export default Navbar
