'use client';

import {
  Github,
  Globe,
  Lock,
  Mail,
  Settings,
  Smartphone,
  Trash2,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import {
  HiOutlineClock,
  HiOutlineMoon,
  HiOutlineSun
} from "react-icons/hi";
import { LiaLanguageSolid } from "react-icons/lia";
import Swal from 'sweetalert2';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('');
  const [name, setName] = useState('Proveen Juge');
const [email, setEmail] = useState('hello@proveenjuge.com');
  const [avatar, setAvatar] = useState('/images/prof-1.jpg');
  const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleChangePassword = () => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    return Swal.fire('Error', 'Please fill in all fields', 'error');
  }

  if (newPassword !== confirmPassword) {
    return Swal.fire('Mismatch', 'New passwords do not match', 'warning');
  }

  Swal.fire({
    title: 'Change Password?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, change it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Updated!', 'Your password has been changed.', 'success');
      // Optional: Send password change to server
      // Reset form
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  });
};

  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      Swal.fire({
        title: 'Change Profile Picture?',
        text: 'Do you want to update your profile picture?',
        imageUrl: reader.result as string,
        imageAlt: 'New Profile Picture',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          setAvatar(reader.result as string); // update avatar
          Swal.fire('Updated!', 'Your profile picture has been changed.', 'success');
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateInfo = () => {
  Swal.fire({
    title: 'Update Information?',
    html: `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Success!', 'Your information has been updated.', 'success');
      // Optionally send to server here
    }
  });
};
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-4 space-y-3 text-sm font-medium text-gray-600">
          {[
            { label: 'Personal Information', icon: <User />, id: 'personal-info' },
            { label: 'Change Password', icon: <Lock />, id: 'change-password' },
            { label: 'Preferences', icon: <Settings />, id: 'preferences' },
            { label: 'Connected Accounts', icon: <Globe />, id: 'connected-accounts' },
            { label: 'Devices', icon: <Smartphone />, id: 'devices' },
          ].map(({ label, icon, id }) => (
            <div
              key={id}
              onClick={() => scrollToSection(id)}
              className="flex hover:bg-black px-2 py-4 items-center gap-2 cursor-pointer hover:text-white shadow rounded-lg transition-all duration-200"
            >
              {icon}
              {label}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Personal Info */}
          <div id="personal-info" className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>

  <div className="flex items-center gap-4 mb-4">
    <div
      className="relative size-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer group"
      onClick={handleAvatarClick}
    >
      <Image
        src={avatar}
        alt="User"
        fill
        className="object-cover group-hover:opacity-80 transition"
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
    <p className="text-sm text-gray-500">Click to change</p>
  </div>

  {/* Input Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="text-sm text-gray-600 block mb-1">Name</label>
      <div className="relative">
        <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
    <div>
      <label className="text-sm text-gray-600 block mb-1">Email</label>
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  </div>

  {/* Update Button */}
  <div className="mt-6">
    <button
      onClick={handleUpdateInfo}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
    >
      Update Info
    </button>
  </div>
</div>


          {/* Remaining sections (change-password, preferences, etc.) remain the same... */}
           <div id="change-password" className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label className="text-sm text-gray-600 block mb-1">Old Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>

    <div>
      <label className="text-sm text-gray-600 block mb-1">New Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>

    <div>
      <label className="text-sm text-gray-600 block mb-1">Confirm New Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  </div>

  <div className="mt-6">
    <button
      onClick={handleChangePassword}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
    >
      Confirm Password Change
    </button>
  </div>
</div>


          {/* Preferences */}
<div id="preferences" className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
    <HiOutlineSun className="w-5 h-5 text-black" />
    Preferences
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Theme */}
    <div>
      <label className="text-sm text-gray-600 block mb-1 flex items-center gap-2">
        <HiOutlineMoon className="w-4 h-4 text-black" />
        Theme
      </label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
      >
        <option>Light Mode</option>
        <option>Dark Mode</option>
      </select>
    </div>

    {/* Language */}
    <div>
      <label className="text-sm text-gray-600 block mb-1 flex items-center gap-2">
        <LiaLanguageSolid className="w-4 h-4 text-black" />
        Language
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
      >
        <option>English</option>
        <option>Spanish</option>
      </select>
    </div>

    {/* Timezone */}
    <div>
      <label className="text-sm text-gray-600 block mb-1 flex items-center gap-2">
        <HiOutlineClock className="w-4 h-4 text-black" />
        Timezone
      </label>
      <select
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-gray-400"
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
          <div id="connected-accounts" className="bg-white rounded-xl shadow-sm p-6">
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
          <div id="devices" className="bg-white rounded-xl shadow-sm p-6">
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
