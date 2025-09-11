"use client";

import { useDashStore } from "@/lib/store";
import {
  Lock,
  Mail,
  User
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { z } from "zod";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });


export default function AccountPage() {
  /* const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState(""); */
  const [name, setName] = useState("");
  const { user, setUser } = useDashStore();
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const handleChangePassword = async () => {

  const result = passwordSchema.safeParse({
    oldPassword,
    newPassword,
    confirmPassword,
  });

  if (!result.success) {
    toast.dismiss()
    toast.error('failed')
    const fieldErrors: { [key: string]: string } = {};
    result.error.errors.forEach((err) => {
      if (err.path.length > 0) fieldErrors[err.path[0]] = err.message;
    });
    setErrors(fieldErrors);
    return;
  }

  setErrors({});

  Swal.fire({
    title: "Change Password?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, change it!",
  }).then(async(result) => {
    if (result.isConfirmed) {
  toast.loading('Changing password...')

      const res = await fetch('/api/user/change-password',{
        method:'PATCH',
        
        headers:{
        'Content-Type': 'application/json',  
        },
        body: JSON.stringify({newPassword,oldPassword})
      })
      if(res.ok){
        toast.dismiss()
        toast.success('Password change successful')
        Swal.fire("Updated!", "Your password has been changed.", "success");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

      }else{
        toast.dismiss()
        toast.error('Password change failed')

      }

      // Reset fields
    }
  });
};

  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
        title: "Change Profile Picture?",
        text: "Do you want to update your profile picture?",
        imageUrl: reader.result as string,
        imageAlt: "New Profile Picture",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("image", file);

          try {
            toast.loading("Updating image...");
            const res = await fetch("/api/user/update-image", {
              method: "PATCH",
              body: formData,
            });
            const data = await res.json();
            if (res.ok) {
              toast.dismiss();
              toast.success("Picture updated successfully!");
              setAvatar(reader.result as string); // Update avatar in UI
              setUser(data.user);
              Swal.fire(
                "Updated!",
                "Your profile picture has been changed.",
                "success"
              );
            } else {
              const { msg } = await res.json();
              toast.dismiss();
              toast.error(msg || "Failed to update image");
            }
          } catch (error) {
            Swal.fire("Error", "Failed to upload image.", "error");
            console.log(error)
          }
        }
      });
    };

    reader.readAsDataURL(file);
  };

  const handleUpdateInfo = async() => {
    const updatedInfo: Partial<{name:string;email:string}> = {}
    if(!email && !name) return 
    if(email) updatedInfo.email = email
    if(name) updatedInfo.name = name
    
    Swal.fire({
      title: "Update Information?",
      html: `${name&&`<b>Name:</b> ${name}<br/>`}${email&&`<b>Email:</b> ${email}`}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        toast.loading('Updating information....')
        
       const  res = await fetch('/api/user/update-me',{
        method: 'PATCH',
        headers: {
    'Content-Type': 'application/json',
  },
        body:JSON.stringify(updatedInfo)

        })
        const data = await res.json()
        if(res.ok){
          toast.dismiss()
          toast.success('update successful')
          setUser(data.user)
          
          
        }else{
          toast.dismiss()
          toast.error('update failed')
        }
        Swal.fire("Success!", "Your information has been updated.", "success");
        // Optionally send to server here
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:fixed pt-24 md:pt-0 md:-translate-y-9">
      <h1 className="text-2xl font-bold  md:mb-8 mb-0 text-gray-800">Settings</h1>

        <div className="w-full md:w-64 md:block hidden  bg-white rounded-xl shadow-sm p-4 space-y-3 text-sm font-medium text-gray-600">
          {[
            {
              label: "Personal Information",
              icon: <User />,
              id: "personal-info",
            },
            { label: "Change Password", icon: <Lock />, id: "change-password" },
            
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
        </div>
        <div className="w-full md:w-64  ">

        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Personal Info */}
          <div id="personal-info" className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>

            <div className="flex  items-center gap-4 mb-4">
              <div
                className="relative size-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer group"
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
                  <img
                    src={user?.profile as string}
                    alt="User"
                    className="object-cover group-hover:opacity-80 transition"
                  />
                )}
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
                    placeholder={user?.name}

                    
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-md px-10 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    placeholder={user?.email}
                    
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
                className="bg-gray-950 hover:bg-zinc-800   text-white px-5 py-2 rounded-md text-sm font-medium transition"
              >
                Update Info
              </button>
            </div>
          </div>

          {/* Remaining sections (change-password, preferences, etc.) remain the same... */}
          <div id="change-password" className="bg-white rounded-xl shadow-sm p-6">
  <h2 className="text-lg font-semibold  text-gray-700 mb-4">
    Change Password
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
    <div>
      <label className="text-sm text-gray-600 block mb-1">
        Old Password
      </label>
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
      {errors.oldPassword && (
        <p className="text-sm text-red-600 mt-1">{errors.oldPassword}</p>
      )}
    </div>

    <div>
      <label className="text-sm text-gray-600 block mb-1">
        New Password
      </label>
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
      {errors.newPassword && (
        <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>
      )}
    </div>

    <div>
      <label className="text-sm text-gray-600 block mb-1">
        Confirm New Password
      </label>
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
      {errors.confirmPassword && (
        <p className="text-sm text-red-600 mt-1">
          {errors.confirmPassword}
        </p>
      )}
    </div>
  </div>

  <div className="mt-6">
    <button
      onClick={handleChangePassword}
      className="bg-gray-950 hover:bg-zinc-800 text-white px-5 py-2 rounded-md text-sm font-medium transition"
    >
      Confirm Password Change
    </button>
  </div>
</div>


          
        </div>
      </div>
    </div>
  );
}
