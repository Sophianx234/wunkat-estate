'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiUploadCloud } from 'react-icons/fi';
import { ScaleLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';

export default function UploadProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null); // Preview image
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Raw file
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setAvatar(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSetProfile = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first!');
      return;
    }

    setUploading(true);
    try {
      // Simulate image upload
      await new Promise((res) => setTimeout(res, 1500));
      toast.success('Profile uploaded!');
      router.push('/dashboard/properties');
    } catch (err) {
      toast.error('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-6 text-center">Upload Profile Photo</h1>

      <div className="flex flex-col items-center gap-4 mb-6">
        <div
          className="relative size-24 rounded-full overflow-hidden border-2 border-orange-200 cursor-pointer group"
          onClick={handleAvatarClick}
        >
          {avatar ? (
            <Image
              src={avatar}
              alt="User"
              fill
              className="object-cover group-hover:opacity-80 transition"
            />
          ) : (
            <div className="">
              
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {uploading ? (
        <ScaleLoader />
      ) : (
        <button
          onClick={handleSetProfile}
          className="flex items-center  gap-2 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <FiUploadCloud />
          Set Profile
        </button>
      )}
      </div>

      
    </div>
  );
}
