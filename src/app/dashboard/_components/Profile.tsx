'use client';
import { useDashStore } from '@/lib/store';
import Link from 'next/link';
export const revalidate = 0;
function Profile() {
const {user}= useDashStore();
console.warn('user',user)
  

  return (
    <div>
      <Link
        href="/dashboard/settings"
        className="flex items-center gap-2 border-l border-l-gray-200 pl-4"
      >
        <div className="relative overflow-hidden rounded-full size-10">
          {user?.profile ? (
            <img
              src={`${user.profile}?v=${Date.now()}`}
              alt="user"
              
              className="object-cover size-10 rounded-full"
            />
          ) : (
            <div className="bg-gray-300 size-10 rounded-full" />
          )}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </Link>
    </div>
  );
}

export default Profile;
