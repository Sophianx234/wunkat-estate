"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import { z } from "zod";
import Button from "../_components/Button";
import { Input } from "../_components/input";
import Logo from "../_components/Logo";

// Validation schema
const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetInputs = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [token,setToken] = useState<string | null>(null);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetInputs>({
    resolver: zodResolver(resetSchema),
  });

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const t = params.get("token");
  setToken(t);
}, []);

  const handleReset: SubmitHandler<ResetInputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Password Reset Successful!",
          text: "Your password has been updated successfully. You can now log in with your new credentials.",
          icon: "success",
          confirmButtonColor: "#111827",
        });
        reset();
        router.push("/login");
      } else {
        Swal.fire({
          title: "Invalid or Expired Link",
          text: result?.message || "Your reset link may have expired. Please request a new one.",
          icon: "error",
          confirmButtonColor: "#DC2626",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#DC2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleReset)}
      className="sm:grid grid-cols-2 h-dvh justify-center items-center sm:border sm:shadow sm:border-gray-200"
    >
      {/* Left Section */}
      <div className="flex flex-col sm:px-32 px-8 py-10 border-gray-500">
        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="font-bold text-3xl sm:text-2xl font-karla hidden sm:block">
            Reset Password
          </h1>
          <div className="flex items-center justify-center mt-10 mb-4 sm:hidden">
            <Logo />
          </div>
          <h3 className="sm:text-sm text-base text-gray-500 leading-5">
            Enter a new password below to regain access to your account.
          </h3>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 sm:mt-6 mt-8 mb-4">
          <label className="space-y-1">
            <p className="sm:text-sm font-semibold font-karla text-base">
              New Password
            </p>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter new password"
              className="py-6 sm:py-1"
            />
            {errors.password && (
              <div className="form-error text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}
          </label>

          <label className="space-y-1">
            <p className="sm:text-sm font-semibold font-karla text-base">
              Confirm Password
            </p>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm new password"
              className="py-6 sm:py-1"
            />
            {errors.confirmPassword && (
              <div className="form-error text-red-500 text-sm">
                {errors.confirmPassword.message}
              </div>
            )}
          </label>
        </div>

        {/* Submit */}
        <Button
          disabled={isLoading}
          className="bg-black flex items-center justify-center gap-3 text-white font-karla font-medium py-3 sm:py-2 rounded-lg"
        >
          {isLoading && <ScaleLoader height={10} width={6} color="#fff" />}
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>

        {/* Footer */}
        <div className="pt-8 text-center sm:text-left text-xs">
          <p>
            <span className="text-gray-500 font-karla text-sm">
              Remembered your password?
            </span>
            <Link
              href="/login"
              className="font-bold tracking-tighter pl-1 font-karla relative"
            >
              Back to login{" "}
              <img
                src="/images/und.png"
                className="w-20 absolute right-0"
                alt=""
              />
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative hidden sm:block size-full">
        <Image
          src="/images/img-6.jpg"
          alt="Reset Password Image"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </form>
  );
}
