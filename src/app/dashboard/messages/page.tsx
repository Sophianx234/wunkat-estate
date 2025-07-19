'use client';

import { useEffect, useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const isAdmin = true;

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(isAdmin ? 'user1' : 'admin');
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="flex flex-col pt-24 sm:pt-0 sm:flex-row h-screen">
      {/* Sidebar for desktop & mobile when no user selected */}
      {(isAdmin && (!selectedUser || !isMobile)) && (
        <div className="w-full sm:w-1/3 border-r">
          <ChatSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser ?? ''} />
        </div>
      )}

      {/* Chat Window */}
      {selectedUser && (
        <div className="flex-1">
          <ChatWindow
            selectedUser={selectedUser}
            isAdmin={isAdmin}
            onBack={isMobile ? handleBack : undefined}
          />
        </div>
      )}
    </div>
  );
}
