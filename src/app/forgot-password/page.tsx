"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import { z } from "zod";
import Button from "../_components/Button";
import { Input } from "../_components/input";
import Logo from "../_components/Logo";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotInputs = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ForgotInputs>({
    resolver: zodResolver(forgotSchema),
  });

  const handleForgot: SubmitHandler<ForgotInputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Email Sent!",
          text: "A password reset link has been sent to your inbox. Please check your email.",
          icon: "success",
          confirmButtonColor: "#111827",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error",
          text: result?.message || "Failed to send reset link. Please try again.",
          icon: "error",
          confirmButtonColor: "#DC2626",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while sending your reset email.",
        icon: "error",
        confirmButtonColor: "#DC2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleForgot)}
      className="sm:grid grid-cols-2 h-dvh justify-center items-center sm:border sm:shadow sm:border-gray-200"
    >
      <div className="flex flex-col sm:px-32 px-8 py-10 border-gray-500">
        {/* Header */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="font-bold text-3xl sm:text-2xl font-karla hidden sm:block">
            Forgot Password
          </h1>
          <div className="flex items-center justify-center mt-10 mb-4 sm:hidden">
            <Logo />
          </div>
          <h3 className="sm:text-sm text-base text-gray-500 leading-5">
            Enter your email address and we’ll send you a link to reset your password.
          </h3>
        </div>

        {/* Form field */}
        <div className="flex flex-col gap-4 sm:mt-6 mt-8 mb-4">
          <label className="space-y-1">
            <p className="sm:text-sm font-semibold font-karla text-base">
              Email
            </p>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="py-6 sm:py-1"
            />
            {errors.email && (
              <div className="form-error text-red-500 text-sm">
                {errors.email.message}
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
          {isLoading ? "Sending..." : "Send Reset Link"}
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
          alt="Forgot Password Image"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </form>
  );
}
