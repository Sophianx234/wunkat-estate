"use client"
import { Menu, X } from "lucide-react";

import SideBar from "./SideBar";
import { useRouter,useSearchParams } from "next/navigation";
import { AnimatePresence } from "motion/react";
type breadCrumProps = {
  style?: string
}
function BreadCrum({style}:breadCrumProps) {
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
          <Menu className={style} size={40} onClick={handleOpenSideBar} />
        ) : (
          <X size={40} className={style} onClick={handleCloseSideBar}  />
        )}
      </div>
      <AnimatePresence>{openSideBar && <SideBar handleClose={handleCloseSideBar} />}</AnimatePresence>
    </>
  );
}

export default BreadCrum;
