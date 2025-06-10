"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";
import { AnimatePresence } from "motion/react";
type breadCrumProps = {
  style?: string
}
function BreadCrum({style}:breadCrumProps) {
  const [openSideBar, setOpenSidebar] = useState<boolean>(false);
  return (
    <>
      <div className="flex sm:hidden">
        {!openSideBar ? (
          <Menu className={style} size={40} onClick={() => setOpenSidebar(true)} />
        ) : (
          <X size={40} className={style} onClick={() => setOpenSidebar(false)} />
        )}
      </div>
      <AnimatePresence>{openSideBar && <SideBar />}</AnimatePresence>
    </>
  );
}

export default BreadCrum;
