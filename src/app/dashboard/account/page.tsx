"use client";

import { useState, useRef } from "react";
import { useDashStore } from "@/lib/store";
import { z } from "zod";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock, Mail, User, ImageIcon } from "lucide-react";

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
  const { user, setUser } = useDashStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      Swal.fire({
        title: "Change Profile Picture?",
        imageUrl: reader.result as string,
        imageAlt: "New Profile Picture",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
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
            toast.dismiss();
            if (res.ok) {
              toast.success("Profile picture updated");
              setAvatar(reader.result as string);
              setUser(data.user);
            } else toast.error(data.msg || "Failed to update image");
          } catch {
            toast.dismiss();
            toast.error("Upload failed");
          }
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateInfo = async () => {
    const updated: Partial<{ name: string; email: string }> = {};
    if (name) updated.name = name;
    if (email) updated.email = email;
    if (!name && !email) return;

    Swal.fire({
      title: "Update Info?",
      html: `${name ? `<b>Name:</b> ${name}<br/>` : ""}${email ? `<b>Email:</b> ${email}` : ""}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.loading("Updating info...");
        const res = await fetch("/api/user/update-me", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });
        const data = await res.json();
        toast.dismiss();
        if (res.ok) {
          toast.success("Information updated");
          setUser(data.user);
        } else toast.error("Update failed");
      }
    });
  };

  const handleChangePassword = async () => {
    const result = passwordSchema.safeParse({ oldPassword, newPassword, confirmPassword });
    if (!result.success) {
      const errs: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) errs[err.path[0]] = err.message;
      });
      setErrors(errs);
      toast.error("Validation failed");
      return;
    }

    Swal.fire({
      title: "Change Password?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        toast.loading("Changing password...");
        const response = await fetch("/api/user/change-password", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword, newPassword }),
        });
        toast.dismiss();
        if (response.ok) {
          toast.success("Password updated");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setErrors({});
        } else toast.error("Password change failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-10 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Account Settings
        </h1>

        {/* 🧍 Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-gray-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div
                className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer group"
                onClick={handleAvatarClick}
              >
                <Image
                  src={avatar || (user?.profile as string)}
                  alt="User avatar"
                  fill
                  className="object-cover group-hover:opacity-80 transition"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <ImageIcon className="text-white w-5 h-5" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="text-sm text-gray-500">Click the image to change your profile picture</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>Name</Label>
                <Input
                  placeholder={user?.name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="space-y-3">
                <Label>Email</Label>
                <Input
                  placeholder={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Button onClick={handleUpdateInfo} className="mt-3">
              Update Information
            </Button>
          </CardContent>
        </Card>

        {/* 🔒 Password Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <Lock className="w-5 h-5 text-gray-600" />
              Change Password
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label>Old Password</Label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                />
                {errors.oldPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.oldPassword}</p>
                )}
              </div>
              <div className="space-y-3">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
                )}
              </div>
              <div className="sm:col-span-2 space-y-3">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <Button onClick={handleChangePassword} className="mt-3 bg-gray-900 hover:bg-gray-800">
              Confirm Password Change
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
