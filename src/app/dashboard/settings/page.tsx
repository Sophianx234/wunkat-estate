'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Trash2,
  Mail,
  Lock,
  User,
  Globe,
  Smartphone,
  Settings,
  Github,
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4 space-y-3 text-sm font-medium text-gray-600">
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <User className="w-4 h-4" />
            Personal Information
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <Lock className="w-4 h-4" />
            Change Password
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <Settings className="w-4 h-4" />
            Preferences
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <Globe className="w-4 h-4" />
            Connected Accounts
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <Smartphone className="w-4 h-4" />
            Devices
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">

          {/* Personal Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/avatars/user.jpg"
                alt="User"
                width={48}
                height={48}
                className="rounded-full"
              />
              <button className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
                Change
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    defaultValue="Proveen Juge"
                    className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    defaultValue="hello@proveenjuge.com"
                    className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Old Password', 'New Password', 'New Password Again'].map((label, i) => (
                <div key={i}>
                  <label className="text-sm text-gray-600 block mb-1">{label}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select timezone</option>
                  <option value="gmt">GMT</option>
                  <option value="utc">UTC</option>
                  <option value="est">EST</option>
                </select>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Connected Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Google', status: 'Connected as proveen@gmail.com', icon: <Globe className="text-red-500" /> },
                { name: 'GitHub', status: 'Connected as proveenjuge', icon: <Github className="text-black" /> },
              ].map(({ name, status, icon }, i) => (
                <div key={i} className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center gap-3">
                    {icon}
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-xs text-gray-500">{status}</p>
                    </div>
                  </div>
                  <button className="text-sm text-red-600 hover:underline">Disconnect</button>
                </div>
              ))}
            </div>
          </div>

          {/* Devices */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'iPhone 14 Pro', lastUsed: 'Last used 2 days ago' },
                { name: 'Surface Pro 8', lastUsed: 'Last used 1 week ago' },
              ].map(({ name, lastUsed }, i) => (
                <div key={i} className="flex items-center justify-between border p-4 rounded-md">
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-xs text-gray-500">{lastUsed}</p>
                  </div>
                  <button className="text-sm text-red-600 flex items-center gap-1 hover:underline">
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
