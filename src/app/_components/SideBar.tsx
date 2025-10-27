
import { motion } from 'motion/react'
import Logo from './Logo'
import { X } from 'lucide-react'
import Link from 'next/link'

type sidebarProps = {
  handleClose: ()=>void
}
function SideBar({handleClose}:sidebarProps) {
  return (
    <motion.aside
      initial={{ y: "-100%"  }}
      animate={{ x: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full  w-full bg-white shadow-lg z-50 p-6"
    >
      <div className='flex justify-between  mr-4 items-center sm:hidden pt-8 '>
        
        <Logo titleColor='text-black'/>
        <X size={36} onClick={handleClose} className='  stroke-black'/>
        
      </div>
      <ul className="flex flex-col     
    text-sm  text-black  z-10  pt-6">
  
        <li className="sidebar-item">Buy</li>
        <li className="sidebar-item">Rent</li>
        <li className="sidebar-item">About</li>
        <li className="sidebar-item ">Contact us</li>
        <Link href='login' className="sidebar-item text-center font-inter py-1">Get an apartment now!</Link>
      </ul>
    

  </motion.aside>
  )
}

export default SideBar
