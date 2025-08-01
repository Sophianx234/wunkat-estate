"use client";

import { useDashStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";

export default function UploadProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { signupData } = useDashStore();

  console.log("user", signupData);

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
      toast.error("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploading(true);
    try {
      toast.loading("Creating account...");
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const res = await fetch("/api/user/update-image", {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok && !signupRes.ok) {
        const { msg } = await res.json();
        throw new Error(msg || "Upload failed");
      }
      toast.dismiss()
      toast.success("Account created");
      router.push("/dashboard/properties");
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log(err)
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = async() => {
    try{
      toast.loading("Creating account...");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      router.push("/dashboard/properties");
      if (!res.ok) {
        const { msg } = await res.json();
        throw new Error(msg || "Upload failed");
      }
      if(res.ok){

        toast.dismiss();
        
        toast.success("Account created...");
        router.push("/dashboard/properties");
      }
    
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log(err)
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Toaster />
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Upload Profile Photo
      </h1>

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
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm"></div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div
          className={`${
            uploading ? "flex" : "grid grid-cols-2"
          } gap-3 items-center`}
        >
          {!uploading && (
            <button
              onClick={handleSkip}
              className="flex justify-center hover:bg-gray-100 items-center gap-2 bg-white shadow border border-gray-200 text-black px-5 py-2 rounded-md"
            >
              Skip
            </button>
          )}

          {uploading ? (
            <ScaleLoader className="" />
          ) : (
            <button
              onClick={handleSetProfile}
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
            >
              <FiUploadCloud />
              Set Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
