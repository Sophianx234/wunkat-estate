'use client'
import BreadCrum from "@/app/_components/BreadCrum";
import { useDashStore } from "@/app/store/dashboard-store";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaBell, FaSearch } from "react-icons/fa";

export default function Topbar() {
  const {toggleNotification} = useDashStore()
  return (
    <div className=" fixed sm:relative left-0 right-0   z-20 shadow sm:shadow-none  bg-white   border-b border-b-gray-200 pt-7 pb-4 pl-5    px-10">

    <div className="grid grid-cols-[2fr_4fr]  justify-between  items-center  ">
      <div className="sm:hidden block">
        <Suspense fallback={null}>

        <BreadCrum type="dash" style="size-8"/>
        </Suspense>
      </div>
      <div className="hidden sm:block relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search something here..."
          className="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none"
        />
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="flex items-center justify-self-end gap-4">
        <div onClick={toggleNotification} className="border hover:scale-105 duration-200 cursor border-gray-200 rounded-full p-2 relative ">
          <span className="absolute bg-green-200 rounded-full size-3 top-0 -right-1 "></span>

        <FaBell className="text-gray-500" />
        </div>
        <Link href='/dashboard/settings' className="flex items-center gap-2 border-l border-l-gray-200 pl-4">
          <div className="relative size-10">

          <Image
            src="/images/user-1.jpg"
            alt="user"
            fill
            className="object-cover rounded-full "
            />
            </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Albert Flores</p>
            <p className="text-xs text-gray-500">albert45@email.com</p>
          </div>
        </Link>
      </div>
    </div>
    </div>
  );
}