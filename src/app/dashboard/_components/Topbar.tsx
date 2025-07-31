"use client";
import BreadCrum from "@/app/_components/BreadCrum";
import { useDashStore } from "@/lib/store";

import { Suspense } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import Profile from "./Profile";
export const revalidate = 0;
export default function Topbar() {
  const { toggleNotification, user, avatar } = useDashStore();
  console.log("avatar", avatar);
  return (
    <div className=" fixed sm:relative left-0 right-0   z-20 shadow sm:shadow-none  bg-white   border-b border-b-gray-200 pt-7 pb-4 pl-5    px-10">
      <div className="grid grid-cols-[2fr_4fr]  justify-between  items-center  ">
        <div className="sm:hidden block">
          <Suspense fallback={null}>
            <BreadCrum type="dash" style="size-8" />
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
          <div
            onClick={toggleNotification}
            className="border hover:scale-105 duration-200 cursor border-gray-200 rounded-full p-2 relative "
          >
            <span className="absolute bg-green-200 rounded-full size-3 top-0 -right-1 "></span>

            <FaBell className="text-gray-500" />
          </div>
          <Profile/>
        </div>
      </div>
    </div>
  );
}
