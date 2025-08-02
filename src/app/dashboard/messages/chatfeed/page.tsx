'use client';

import { useEffect, useState } from 'react';
import ChatSidebar from './chatsidebar';
import ChatWindow from '../chatwindow/page';
import Image from 'next/image';
import { useDashStore } from '@/lib/store';


const isAdmin = true;

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(isAdmin ? 'user1' : 'admin');
  const [isMobile, setIsMobile] = useState(false);
  const {user} = useDashStore()

  const handleBack = () => setSelectedUser(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Set on mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex gap-3 h-full  pt-24 sm:pt-0  ">
      {/* Sidebar for desktop & mobile when no user selected */}
      {(isAdmin && (!selectedUser || !isMobile)) && (
        
          <ChatSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser ?? ''} />
        
      )}
<div className='w-64'></div>
<div className='relative '>

<ChatWindow selectedUser={selectedUser as string} isAdmin={isAdmin}/>
</div>
</div>


      
  );
}
