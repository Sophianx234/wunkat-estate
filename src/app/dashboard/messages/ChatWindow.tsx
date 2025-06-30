'use client';

import { useEffect, useState } from 'react';
import { SendHorizonal } from 'lucide-react';

// Dummy users and messages
export const users = [
  { id: 'user1', name: 'Alice Doe', lastMessage: 'That sounds amazing!' },
  { id: 'user2', name: 'Andrea Jones', lastMessage: 'Hey! How are you?' },
  { id: 'user3', name: 'Simon Stewart', lastMessage: 'Lunch Tuesday?' },
];

export const messages: Record<string, { sender: string; text: string; time: string }[]> = {
  user1: [
    { sender: 'user', text: 'Hi admin!', time: '09:00' },
    { sender: 'admin', text: 'Hello Alice', time: '09:01' },
  ],
  user2: [
    { sender: 'user', text: 'How are you?', time: '08:30' },
    { sender: 'admin', text: 'Good! You?', time: '08:31' },
  ],
  user3: [],
};

export default function ChatWindow({
  selectedUser,
  isAdmin,
}: {
  selectedUser: string;
  isAdmin: boolean;
}) {
  const [chat, setChat] = useState(messages[selectedUser] || []);
  const [input, setInput] = useState('');

  // Update chat when selectedUser changes
  useEffect(() => {
    setChat(messages[selectedUser] || []);
  }, [selectedUser]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: isAdmin ? 'admin' : 'user',
      text: input,
      time: 'Now',
    };

    const updatedChat = [...chat, newMessage];
    setChat(updatedChat);
    setInput('');

    // Optionally: Update the global messages object (if needed)
    messages[selectedUser] = updatedChat;
  };

  const displayName = isAdmin
    ? users.find((u) => u.id === selectedUser)?.name || ''
    : 'Admin';

  return (
    <div className=" flex flex-col bg-white p-4 col-span-2">
      {/* Header */}
      <div className="border-b pb-3 mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">Chat with {displayName}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs px-4 py-2 rounded-xl ${
              msg.sender === (isAdmin ? 'admin' : 'user')
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-right opacity-70">{msg.time}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full text-white"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
}
