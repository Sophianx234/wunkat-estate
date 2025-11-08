"use client";

import Logo from "@/app/_components/Logo";
import { useDashStore } from "@/lib/store";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { GiSpookyHouse } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { ClipLoader, ScaleLoader } from "react-spinners";
import ControlPanel from "./ControlPanel";
import { motion } from "framer-motion";

type SidebarProps = {
  type?: "normal" | "slide";
  handleClose?: () => void;
};

export default function Sidebar({ handleClose, type = "normal" }: SidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toggleSidebar, user } = useDashStore();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/auth/logout`);
      const data = await res.json();
      if (res.ok) {
        router.push("/");
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ✨ Animation variants
  const sidebarVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  const AsideWrapper = type === "normal" ? "aside":motion.aside

  return (
    <AsideWrapper
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${
        type === "normal"
          ? "hidden sm:fixed pb-28 sm:block left-0 top-0 h-screen w-64 bg-white z-50"
          : "fixed bg-white pb-10 inset-0 top-0 left-0 z-40 sm:hidden"
      } flex flex-col h-full  border-r border-gray-200`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-6 pb-5 px-5 border-b border-gray-200">
        <Logo type="dash" />
        {type === "slide" && (
          <motion.button
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={handleClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X size={24} className="stroke-black" />
          </motion.button>
        )}
      </div>

      {/* Nav Links */}
      <nav className={`flex-1 overflow-y-scroll h-dvh ${type==='normal'&&"pb-36"} shadow  pt-5 px-4 text-sm font-medium text-gray-700 space-y-1 scrollbar-hide`}>
        <Link onClick={toggleSidebar} href="/dashboard/finance/overview" className="dash-nav-item">
          <TbReportAnalytics className="size-6" />
          Financial Analytics
        </Link>

        <ControlPanel />

        <Link
          onClick={toggleSidebar}
          href="/dashboard/properties"
          className={`dash-nav-item ${
            pathname === "/dashboard/properties" ? "bg-black text-white" : ""
          }`}
        >
          <GiSpookyHouse className="size-6" />
          Properties
        </Link>

        <Link
          onClick={toggleSidebar}
          href="/dashboard/tenants"
          className={`dash-nav-item ${
            pathname === "/dashboard/tenants" ? "bg-black text-white" : ""
          }`}
        >
          <MdAccountCircle className="size-6" />
          Tenants
        </Link>

        <Link
          onClick={toggleSidebar}
          href={`/dashboard/transactions/${user?._id}`}
          className={`dash-nav-item ${
            pathname === "/dashboard/transactions" ? "bg-black text-white" : ""
          }`}
        >
          <CiMoneyCheck1 className="size-6" />
          Transactions
        </Link>

        <Link
          onClick={toggleSidebar}
          href="/dashboard/account"
          className={`dash-nav-item ${
            pathname === "/dashboard/account" ? "bg-black text-white" : ""
          }`}
        >
          <FiSettings className="size-6" />
          Account
        </Link>

        <motion.button
          onClick={handleLogout}
          whileTap={{ scale: 0.96 }}
          className="dash-nav-item w-full text-red-600 hover:bg-red-50 transition"
        >
          {isLoading ? (
           <> <ClipLoader size={18}  color="#ef4444 size-3" /> logingout....</>
          ) : (
            <>
              <BiLogOut className="size-6" />
              Logout
            </>
          )}
        </motion.button>
      </nav>

      <Toaster />
    </AsideWrapper>
  );
}
