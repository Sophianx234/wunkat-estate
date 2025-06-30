'use client';

import { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const isAdmin = true; // Set to false for regular user

export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState('admin');

  return (
    <div className="flex sm:grid grid-cols-3 h-full bg-gray-50">
      {isAdmin && (
        <ChatSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      )}
      <ChatWindow selectedUser={selectedUser} isAdmin={isAdmin} />
    </div>
  );
}
