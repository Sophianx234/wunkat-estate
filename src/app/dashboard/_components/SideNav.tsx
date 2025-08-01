'use client'
import Logo from "@/app/_components/Logo";
import { motion } from 'framer-motion';
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdAccountCircle, MdMessage } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { TbHomePlus, TbReportAnalytics } from "react-icons/tb";
import { ScaleLoader } from "react-spinners";
type sidebarProps = {
  type?: 'normal'|'slide'
  handleClose?: ()=>void
}
export default function Sidebar({ handleClose, type = 'normal' }: sidebarProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const pathname = usePathname()
  console.log('pathname',pathname)
  const handleLogout = async()=>{
    try{
      setIsLoading(true)
      
      const res = await fetch(`/api/auth/logout`)
      const data = await res.json()
      if(res.ok){
        console.log('logout',data)
        
        toast.success('Logout successful')
        router.push('/')
        
        
      }else{
        console.log('logout',data)
      }
    }catch(err){
      
      toast.error('Logout failed')
      console.log(err)
    }finally{
      setIsLoading(false)
      
      
    }
    

  }
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className={`w-64 ${type === 'normal' ? 'hidden sm:fixed sm:block left-0 top-0  h-screen w-64 bg-white shadow z-50' : 'block absolute h-dvh top-0 left-0 -z-20 md:z-10'} sm:block bg-white md:shadow pb-6 `}
    >
      {/* Wrapper with flex column layout */}
      <div className="flex flex-col h-full md:h-dvh">
        
        {/* Top section: Logo and close button */}
        <div className="md:flex hidden  items-center justify-between mb-5 pt-6 border-b border-b-gray-200 pr-2 pb-5 pl-5 border-r border-r-gray-200">
          <Logo type="dash" />
          {type === 'slide' && (
            <X size={30} onClick={handleClose} className="block self-end stroke-black cursor-pointer" />
          )}
        </div>
        <div className="md:hidden flex mb-5 pt-16 bg-transparent"></div>

        {/* Scrollable nav container */}
        <nav className="flex-1 overflow-y-auto shadow md:shadow-none border md:border-none border-gray-200 scrollbar-hide  text-sm font-medium text-gray-600 px-4 space-y-1">
         <Link href="/dashboard/finance/analytics" className="dash-nav-item">
  <TbReportAnalytics className="size-6" />
  Financial Analytics
</Link>

          <Link href="/dashboard/properties" className={`dash-nav-item ${pathname ==='/dashboard/properties'?'bg-black text-white':''}`}><RiBuilding2Line className="size-6" /> Properties</Link>
          <Link href="/dashboard/agents" className={`dash-nav-item ${pathname ==='/dashboard/agents'?'bg-black text-white':''}`}><HiOutlineUsers className="size-6" /> Agents</Link>
          <Link href="/dashboard/customers" className={`dash-nav-item ${pathname ==='/dashboard/customers'?'bg-black text-white':''}`}><MdAccountCircle className="size-6" /> Customers</Link>
          <Link href="/dashboard/transactions" className={`dash-nav-item ${pathname ==='/dashboard/transactions'?'bg-black text-white':''}`}><TbHomePlus className="size-6" /> Transactions</Link>
          <Link href="/dashboard/messages" className={`dash-nav-item ${pathname ==='/dashboard/messages'?'bg-black text-white':''}`}><MdMessage className="size-6" /> Message</Link>
          <Link href="/dashboard/settings" className={`dash-nav-item ${pathname ==='/dashboard/settings'?'bg-black text-white':''}`}><FiSettings className="size-6" /> Settings</Link>
          <button onClick={handleLogout} className="dash-nav-item w-full text-red-500">{isLoading && (
              
                <ScaleLoader className="" height={10} width={6} color="#fff" />
            )}
             {isLoading ? "Loging out..." : (<><BiLogOut className="size-6" />Logout</>)}</button>
        </nav>

      </div>
      <Toaster/>
    </motion.aside>
  );
}
