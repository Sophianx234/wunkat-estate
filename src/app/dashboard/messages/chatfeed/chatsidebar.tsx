import Image from 'next/image';

export const users = [
  {
    id: 'user1',
    name: 'Alice Doe',
    lastMessage: 'That sounds amazing!',
    avatar: '/images/prof-1.jpg',
  },
  {
    id: 'user2',
    name: 'Andrea Jones',
    lastMessage: 'Hey! How are you?',
    avatar: '/images/prof-2.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
  {
    id: 'user3',
    name: 'Simon Stewart',
    lastMessage: 'Lunch Tuesday?',
    avatar: '/images/prof-3.jpg',
  },
];

export default function ChatSidebar({
  onSelectUser,
  selectedUser,
}: {
  onSelectUser: (id: string) => void;
  selectedUser: string;
}) {
  return (
   <div className="fixed  w-64 h-screen bg-white p-4 border-r overflow-hidden">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>

  {/* Scrollable list container */}
  <div className="space-y-2 overflow-y-auto scrollbar-hide h-[calc(100vh-7rem)] pr-1">
    {users.map((user) => (
      <div
        key={user.id}
        onClick={() => onSelectUser(user.id)}
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
          selectedUser === user.id
            ? 'bg-blue-100 text-blue-700'
            : 'hover:bg-gray-100 text-gray-800'
        }`}
      >
        <div className="relative w-10 h-10">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
