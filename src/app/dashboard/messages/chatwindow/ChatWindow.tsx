'use client';

import { SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

export default function ChatWindow({ selectedUser, isAdmin }: Props) {
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
    <div className="flex w-[38rem] rounded-md overflow-hidden h-[26rem] fixed border-x border-x-gray-200  flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow z-10">
        <h2 className="font-semibold text-gray-700 text-base sm:text-lg">
          {displayName || 'Boruto Uzumaki'}
        </h2>
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
          <Image fill alt="user" src="/images/user-1.jpg" className="object-cover" />
        </div>
      </div>

      {/* Messages */}
      <div className=" px-4 py-4 space-y-7">
        {chat.map((msg, i) => {
          const isSender = msg.sender === (isAdmin ? 'admin' : 'user');
          return (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-xl relative shadow-sm text-sm sm:text-base ${
                isSender
                  ? 'bg-gray-900 text-white self-end ml-auto'
                  : 'bg-gray-100 text-gray-800 self-start'
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`absolute -bottom-4 right-2 text-[10px] ${
                  isSender ? 'text-white/70' : 'text-gray-500'
                }`}
              >
                {msg.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-y px-4 py-3 absolute inset-x-0 bottom-0 bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        <button
          onClick={handleSend}
          className="bg-gray-900 hover:bg-gray-800 p-2 rounded-full text-white"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
}
