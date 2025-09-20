"use client";
import Logo from "@/app/_components/Logo";
import { useDashStore } from "@/lib/store";
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
  type?: "normal" | "slide";
  handleClose?: () => void;
};
export default function Sidebar({
  handleClose,
  type = "normal",
}: sidebarProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toggleSidebar } = useDashStore();
  const pathname = usePathname();
  console.log("pathname", pathname);
  const handleLogout = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`/api/auth/logout`);
      const data = await res.json();
      if (res.ok) {
        console.log("logout", data);

        toast.success("Logout successful");
        router.push("/");
      } else {
        console.log("logout", data);
      }
    } catch (err) {
      toast.error("Logout failed");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <aside
      
      className={` ${
        type === "normal"
          ? "hidden sm:fixed sm:block left-0 top-0  h-screen w-64 bg-white  z-50"
          : "block absolute h-dvh inset-0 top-0 left-0  z-10"
      } sm:block bg-white  pb-6 `}
    >
      {/* Wrapper with flex column layout */}
      <div className="flex flex-col h-full md:h-dvh">
        {/* Top section: Logo and close button */}
        <div className="flex   items-center justify-between  pt-6 border-b border-b-gray-200 pr-3 md:pr-2 pb-5 pl-5 border-r border-r-gray-200">
          <Logo type="dash" />
          {type === "slide" && (
            <X
              size={30}
              onClick={handleClose}
              className="block self-end stroke-black cursor-pointer"
            />
          )}
        </div>

        {/* Scrollable nav container */}
        <nav className="flex-1  flex-col overflow-y-auto pt-5 shadow  border-gray-200 scrollbar-hide  text-sm font-medium text-gray-600 px-4 space-y-1">
          <Link
            onClick={toggleSidebar}
            href="/dashboard/finance/analytics"
            className="dash-nav-item"
          >
            <TbReportAnalytics className="size-6" />
            Financial Analytics
          </Link>

          <Link
            onClick={toggleSidebar}
            href="/dashboard/properties"
            className={`dash-nav-item ${
              pathname === "/dashboard/properties" ? "bg-black text-white" : ""
            }`}
          >
            <RiBuilding2Line className="size-6" /> Properties
          </Link>
        {/*   <Link
            onClick={toggleSidebar}
            href="/dashboard/agents"
            className={`dash-nav-item ${
              pathname === "/dashboard/agents" ? "bg-black text-white" : ""
            }`}
          >
            <HiOutlineUsers className="size-6" /> Agents
          </Link> */}
          <Link
            onClick={toggleSidebar}
            href="/dashboard/tenants"
            className={`dash-nav-item ${
              pathname === "/dashboard/tenants" ? "bg-black text-white" : ""
            }`}
          >
            <MdAccountCircle className="size-6" /> Tenants
          </Link>
          <Link
            onClick={toggleSidebar}
            href="/dashboard/transactions"
            className={`dash-nav-item ${
              pathname === "/dashboard/transactions"
                ? "bg-black text-white"
                : ""
            }`}
          >
            <TbHomePlus className="size-6" /> Transactions
          </Link>
         
          <Link
            onClick={toggleSidebar}
            href="/dashboard/account"
            className={`dash-nav-item ${
              pathname === "/dashboard/account" ? "bg-black text-white" : ""
            }`}
          >
            <FiSettings className="size-6" /> Account
          </Link>
          <button
            onClick={handleLogout}
            className="dash-nav-item w-full text-red-500"
          >
            {isLoading && (
              <ScaleLoader className="" height={10} width={6} color="#fff" />
            )}
            {isLoading ? (
              "Loging out..."
            ) : (
              <>
                <BiLogOut className="size-6" />
                Logout
              </>
            )}
          </button>
        </nav>
      </div>
      <Toaster />
    </aside>
  );
}
