'use client';

import { MdDashboard, MdMessage } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { TbHomePlus } from 'react-icons/tb';
import Link from 'next/link';

export default function MobileNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 py-3 bg-white border-t shadow-md  sm:hidden">
      <ul className="flex justify-around items-center py-2 text-sm text-gray-600">
        <li className="flex flex-col items-center">
          <Link href="/dashboard" className="flex flex-col items-center">
            <MdDashboard className='size-6' />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/properties" className="flex flex-col items-center">
            <TbHomePlus className='size-6' />
            <span className="text-xs mt-1">Properties</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/messages" className="flex flex-col items-center">
            <MdMessage className='size-6' />
            <span className="text-xs mt-1">Message</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link href="/account" className="flex flex-col items-center">
            <HiOutlineUsers className='size-6' />
            <span className="text-xs mt-1">My Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
