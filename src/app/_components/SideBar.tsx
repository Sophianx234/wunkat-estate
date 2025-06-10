
import { motion } from 'motion/react'
import Logo from './Logo'
function SideBar() {
  return (
    <motion.div initial={{x:0,opacity:0}} animate={{x:0,opacity:1} } className="absolute bg-white inset-0 h-dvh">
      <div className='flex items-center sm:hidden'>
        
        <Logo/>
        
      </div>
      <ul className="flex flex-col   items-center
    text-sm  text-black z-10  pt-6">
  
        <li className="  sidebar-item">Home</li>
        <li className="sidebar-item">Buy</li>
        <li className="sidebar-item">Rent</li>
        <li className="sidebar-item">About</li>
        <li className="sidebar-item ">Contact us</li>
      </ul>
    

  </motion.div>
  )
}

export default SideBar
