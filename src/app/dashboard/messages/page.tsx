'use client';

import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const isAdmin = true;

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(isAdmin ? 'user1' : 'admin');

  const handleBack = () => setSelectedUser(null);

  return (
    <div className="flex flex-col pt-24 sm:pt-0 sm:flex-row h-screen">
      {/* Sidebar for desktop & conditionally for mobile */}
      {(isAdmin && (!selectedUser || window.innerWidth >= 640)) && (
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
            onBack={window.innerWidth < 640 ? handleBack : undefined}
          />
        </div>
      )}
    </div>
  );
}
