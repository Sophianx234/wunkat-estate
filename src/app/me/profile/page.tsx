"use client";

import { useDashStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/lib/utils";

export default function UploadProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null); // typed
  const router = useRouter();
  const { signupData,room } = useDashStore();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setAvatar(reader.result as string);
        setCropping(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const confirmCrop = async () => {
    if (!avatar || !croppedAreaPixels) return;
    try {
      const croppedFile: File = await getCroppedImg(avatar, croppedAreaPixels); // ensure getCroppedImg returns File
      setSelectedFile(croppedFile);

      const previewUrl = URL.createObjectURL(croppedFile);
      setAvatar(previewUrl);

      setCropping(false);
    } catch (err) {
      console.error(err);
    }
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
      if(res.ok){
        toast.dismiss();

        toast.success("Account created");
        if(room){
          router.push(`/dashboard/properties/${room._id}`);
        }else{
          router.push("/dashboard/properties");
        }
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = async () => {
    try {
      toast.loading("Creating account...");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (!res.ok) {
        const { msg } = await res.json();
        throw new Error(msg || "Upload failed");
      }
      if (res.ok) {
        toast.dismiss();
        toast.success("Account created...");
        
      if(room){
        router.push(`/dashboard/properties/${room._id}`);
      }else{
      router.push("/dashboard/properties");
      }
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log(err);
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

      {/* Crop Modal */}
      {cropping && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
          <div className="relative w-[300px] h-[300px] bg-white">
            <Cropper
              image={avatar || ""}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setCropping(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={confirmCrop}
              className="px-4 py-2 bg-black border border-white shadow text-white rounded"
            >
              Crop & Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
