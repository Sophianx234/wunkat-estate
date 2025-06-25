import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdDashboard, MdMessage, MdAccountCircle } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { RiBuilding2Line } from "react-icons/ri";
import { TbFileInvoice, TbHomePlus } from "react-icons/tb";
import Logo from "@/app/_components/Logo";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow   pb-6">
      <div className="mb-5 pt-6 border-b border-b-gray-200  pr-2 pb-5 pl-5 border-r border-r-gray-200">
        <Logo type="dash"/>
        </div>
      <nav className=" text-sm font-medium text-gray-600 overflow-y-scroll px-4">
        <a href="#" className="dash-nav-item">
          <MdDashboard  className="size-6"/> Dashboard
        </a>
        <a href="#" className="dash-nav-item">
          <RiBuilding2Line className="size-6" /> Properties
        </a>
        <a href="#" className="dash-nav-item">
          <HiOutlineUsers className="size-6" /> Agents
        </a>
        <a href="#" className="dash-nav-item">
          <MdAccountCircle className="size-6" /> Customers
        </a>
        <a href="#" className="dash-nav-item">
          <TbFileInvoice className="size-6" /> Rent Application
        </a>
        <a href="#" className="dash-nav-item">
          <TbHomePlus className="size-6" /> Transaction
        </a>
        <a href="#" className="dash-nav-item">
          <MdMessage className="size-6" /> Message
        </a>
        <a href="#" className="dash-nav-item">
          <FiSettings className="size-6" /> Settings
        </a>
        <a href="#" className="dash-nav-item">
          <MdAccountCircle className="size-6" /> My Account
        </a>
        <a href="#" className="dash-nav-item text-red-500">
          <BiLogOut className="size-6" /> Log Out
        </a>
      </nav>
    </aside>
  );
}