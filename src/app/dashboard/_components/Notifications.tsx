'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Mail, CalendarCheck, Trash2 } from 'lucide-react';
import { BiBuildingHouse } from 'react-icons/bi';
import { useDashStore } from '@/lib/store';

type Notification = {
  id: string; // use string since MongoDB _id is a string
  title: string;
  description: string;
  type: 'message' | 'listing' | 'reminder';
  time: string;
  read: boolean;
};

export default function NotificationList() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { notifications: backendNotifications, toggleNotification } = useDashStore();

  // ✅ Local state to track read status without mutating Zustand directly
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ Map Zustand backend data → frontend Notification type
  useEffect(() => {
    if (!backendNotifications) return;

    const mapped = backendNotifications.map((n: any) => ({
      id: n._id,
      title: n.title,
      description: n.message,
      type: 'listing', // since these are system "house added" notifications
      time: new Date(n.createdAt).toLocaleString(),
      read: false,
    }));

    setNotifications(mapped);
  }, [backendNotifications]);

  // ✅ Handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        toggleNotification();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggleNotification]);

  // ✅ Icon logic
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <Mail className="text-blue-500" />;
      case 'listing':
        return <BiBuildingHouse className="text-green-500" />;
      case 'reminder':
        return <CalendarCheck className="text-yellow-500" />;
    }
  };

  // ✅ Mark as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // ✅ Clear all
  const clearNotifications = () => setNotifications([]);

  return (
    <div className="fixed w-60 h-60 right-3 top-1 z-10">
      <div className="fixed bg-red-400 top-[8px] left-[10.5rem] w-4 h-4 rotate-45 shadow -z-20" />
      <div
        ref={panelRef}
        className="max-w-md mx-auto absolute right-5 z-10 top-24 bg-white rounded-xl shadow p-4 space-y-4 w-[22rem]"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-400" /> Notifications
          </h2>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        <div className="h-[350px] overflow-y-scroll scrollbar-hide">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No notifications
            </p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-start gap-3 p-3 rounded-md border hover:bg-gray-50 cursor-pointer transition ${
                    !n.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => markAsRead(n.id)}
                >
                  <div className="mt-1">{getIcon(n.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800">
                      {n.title}
                    </h4>
                    <p className="text-xs text-gray-500">{n.description}</p>
                    <span className="text-xs text-gray-400">{n.time}</span>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
