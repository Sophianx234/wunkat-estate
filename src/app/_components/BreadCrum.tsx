"use client";
import { Menu, X } from "lucide-react";

import { AnimatePresence } from "framer-motion";
import { HiMenuAlt1 } from "react-icons/hi";
import Sidebar from "../dashboard/_components/SideNav";
import SideBar from "./SideBar";
import { useDashStore } from "@/lib/store";
type breadCrumProps = {
  style?: string;
  type?: "normal" | "dash";
};
function BreadCrum({ style, type = "normal" }: breadCrumProps) {
  const store = useDashStore();
  return (
    <>
      <div className="flex sm:hidden">
        {!store.openSidebar ? (
          type === "normal" ? (
            <Menu className={style} size={40} onClick={store.toggleSidebar} />
          ) : (
            <HiMenuAlt1 className={style} onClick={store.toggleSidebar} />
          )
        ) : (
          <X size={40} className={style} onClick={store.toggleSidebar} />
        )}
      </div>
      {type == "normal" && (
        <AnimatePresence>
          {store.openSidebar && <SideBar handleClose={store.toggleSidebar} />}
        </AnimatePresence>
      )}
      {type == "dash" && (
        <AnimatePresence>
          {store.openSidebar && (
            <Sidebar handleClose={store.toggleSidebar} type="slide" />
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default BreadCrum;
