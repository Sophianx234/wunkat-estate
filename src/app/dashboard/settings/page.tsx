'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4 space-y-2 text-sm font-medium text-gray-600">
          <SidebarItem label="Personal Information" />
          <SidebarItem label="Change Password" />
          <SidebarItem label="Preferences" />
          <SidebarItem label="Connected Accounts" />
          <SidebarItem label="Devices" />
        </aside>

        {/* Content */}
        <section className="flex-1 space-y-6">
          {/* Personal Info */}
          <Card>
            <SectionTitle title="Personal Information" />
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
              <Input label="Name" defaultValue="Proveen Juge" />
              <Input label="Email" defaultValue="hello@proveenjuge.com" />
            </div>
          </Card>

          {/* Password */}
          <Card>
            <SectionTitle title="Change Password" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Old Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="New Password Again" type="password" />
            </div>
          </Card>

          {/* Preferences */}
          <Card>
            <SectionTitle title="Preferences" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Theme" value={theme} onChange={setTheme} options={['Light Mode', 'Dark Mode']} />
              <Select label="Language" value={language} onChange={setLanguage} options={['English', 'Spanish']} />
              <Select label="Timezone" value={timezone} onChange={setTimezone} options={['GMT', 'UTC', 'EST']} />
            </div>
          </Card>

          {/* Connected Accounts */}
          <Card>
            <SectionTitle title="Connected Accounts" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConnectedAccount name="Google" status="Connected as proveen@gmail.com" />
              <ConnectedAccount name="GitHub" status="Connected as proveenjuge" />
            </div>
          </Card>

          {/* Devices */}
          <Card>
            <SectionTitle title="Devices" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Device name="iPhone 14 Pro" lastUsed="Last used 2 days ago" />
              <Device name="Surface Pro 8" lastUsed="Last used 1 week ago" />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function SidebarItem({ label }: { label: string }) {
  return (
    <div className="cursor-pointer hover:text-blue-600">{label}</div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {children}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
  );
}

function Input({ label, type = 'text', defaultValue = '' }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">Select</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function ConnectedAccount({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between border border-gray-200 p-4 rounded-md">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">{status}</p>
      </div>
      <button className="text-sm font-medium text-red-600">Disconnect</button>
    </div>
  );
}

function Device({ name, lastUsed }: { name: string; lastUsed: string }) {
  return (
    <div className="flex items-center justify-between border border-gray-200 p-4 rounded-md">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">{lastUsed}</p>
      </div>
      <button className="text-sm text-red-600 flex items-center gap-1 hover:underline">
        <Trash2 className="w-4 h-4" />
        Remove
      </button>
    </div>
  );
}
