'use client';

import { useEffect, useState } from 'react';
import { SendHorizonal, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const users = [
  { id: 'user1', name: 'Alice Doe', lastMessage: 'That sounds amazing!' },
  { id: 'user2', name: 'Andrea Jones', lastMessage: 'Hey! How are you?' },
  { id: 'user3', name: 'Simon Stewart', lastMessage: 'Lunch Tuesday?' },
];

const initialMessages: Record<string, { sender: string; text: string; time: string }[]> = {
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

type Props = {
  selectedUser: string;
  isAdmin: boolean;
  onBack?: () => void;
};

export default function ChatWindow({ selectedUser, isAdmin, onBack }: Props) {
  const [chat, setChat] = useState(initialMessages[selectedUser] || []);
  const [input, setInput] = useState('');

  useEffect(() => {
    setChat(initialMessages[selectedUser] || []);
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
    initialMessages[selectedUser] = updatedChat;
  };

  const displayName = isAdmin
    ? users.find((u) => u.id === selectedUser)?.name || ''
    : 'Admin';

  return (
    <div className="flex flex-col h-full bg-white p-4">
      {/* Header */}
      <div className=" fixed top-[5.5rem] z-10 py-3 inset-x-0 sm:block  bg-white mb-12 border-b pb-3 sm:mb-3 flex justify-between px-2 items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="sm:hidden text-gray-600 hover:text-black">
            <ArrowLeft size={20} />
          </button>
        )}
        <h2 className="font-semibold text-gray-700">{displayName}</h2>
        <div className='relative size-14 rounded-full overflow-hidden'>
          <Image fill alt='user' src='/images/user-1.jpg' className='object-cover'/>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pt-20 space-y-4 px-1">
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
      <div className="mt-4 flex items-center fixed inset-x-0 bottom-24 mx-2 sm:mx-0 sm:block gap-2">
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
