"use client"
import { Menu, X } from "lucide-react";

import SideBar from "./SideBar";
import { useRouter,useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { HiMenuAlt1 } from "react-icons/hi";
import Sidebar from "../dashboard/_components/SideNav";
type breadCrumProps = {
  style?: string
  type?: 'normal'|'dash'
}
function BreadCrum({style,type='normal'}:breadCrumProps) {
  const router = useRouter()

  const openSideBar = useSearchParams().get('modal') === 'open'
  console.log(openSideBar)
  

  const handleCloseSideBar = ()=>{
    router.push('/')
  }
  const handleOpenSideBar = ()=>{
    router.push('?modal=open')
  }
  return (
    <>
      <div className="flex sm:hidden">
        {!openSideBar ? (
          type==='normal'?<Menu className={style} size={40} onClick={handleOpenSideBar} />:<HiMenuAlt1 className={style} onClick={handleOpenSideBar}/>
        ) : (
          <X size={40} className={style} onClick={handleCloseSideBar}  />
        )}
      </div>
      {type=='normal'&&<AnimatePresence>{openSideBar && <SideBar handleClose={handleCloseSideBar} />}</AnimatePresence>}
      {type=='dash'&&<AnimatePresence>{openSideBar && <Sidebar/>}</AnimatePresence>}
    </>
  );
}

export default BreadCrum;
