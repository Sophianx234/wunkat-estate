'use client'
import Logo from "@/app/_components/Logo";
import { motion } from 'framer-motion';
import { X } from "lucide-react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdAccountCircle, MdMessage } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { TbHomePlus, TbReportAnalytics } from "react-icons/tb";
type sidebarProps = {
  type?: 'normal'|'slide'
  handleClose?: ()=>void
}
export default function Sidebar({ handleClose, type = 'normal' }: sidebarProps) {
  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className={`w-64 ${type === 'normal' ? 'hidden sm:fixed sm:block left-0 top-0  h-screen w-64 bg-white shadow z-50' : 'block absolute h-dvh top-0 left-0 z-10'} sm:block bg-white shadow pb-6 `}
    >
      {/* Wrapper with flex column layout */}
      <div className="flex flex-col h-dvh">
        
        {/* Top section: Logo and close button */}
        <div className="flex items-center justify-between mb-5 pt-6 border-b border-b-gray-200 pr-2 pb-5 pl-5 border-r border-r-gray-200">
          <Logo type="dash" />
          {type === 'slide' && (
            <X size={30} onClick={handleClose} className="block self-end stroke-black cursor-pointer" />
          )}
        </div>

        {/* Scrollable nav container */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide  text-sm font-medium text-gray-600 px-4 space-y-1">
         <Link href="/dashboard/finance/analytics" className="dash-nav-item">
  <TbReportAnalytics className="size-6" />
  Financial Analytics
</Link>

          <Link href="/dashboard/properties" className="dash-nav-item"><RiBuilding2Line className="size-6" /> Properties</Link>
          <Link href="/dashboard/agents" className="dash-nav-item"><HiOutlineUsers className="size-6" /> Agents</Link>
          <Link href="/dashboard/customers" className="dash-nav-item"><MdAccountCircle className="size-6" /> Customers</Link>
          <Link href="/dashboard/transactions" className="dash-nav-item"><TbHomePlus className="size-6" /> Transaction</Link>
          <Link href="/dashboard/messages" className="dash-nav-item"><MdMessage className="size-6" /> Message</Link>
          <Link href="/dashboard/settings" className="dash-nav-item"><FiSettings className="size-6" /> Settings</Link>
          <Link href="#" className="dash-nav-item text-red-500"><BiLogOut className="size-6" /> Log Out</Link>
        </nav>

      </div>
    </motion.aside>
  );
}
