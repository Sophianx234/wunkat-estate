
import { motion } from 'motion/react'
import Logo from './Logo'
import { X } from 'lucide-react'

type sidebarProps = {
  handleClose: ()=>void
}
function SideBar({handleClose}:sidebarProps) {
  return (
    <motion.div initial={{x:0,opacity:0}}   animate={{x:0,opacity:1} } className="absolute bg-white inset-0 h-dvh">
      <div className='flex justify-between  mr-4 items-center sm:hidden pt-8 px-4'>
        
        <Logo titleColor='text-black'/>
        <X size={36} onClick={handleClose} className='  stroke-black'/>
        
      </div>
      <ul className="flex flex-col     
    text-sm  text-black  z-10  pt-6">
  
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
