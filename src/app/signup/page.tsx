"use client";
import Image from "next/image";
import Button from "../_components/Button";
import { Checkbox } from "../_components/checkbox";
import { Input } from "../_components/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../_components/Logo";
const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type signupFormInputs = z.infer<typeof signupSchema>;

function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<signupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup: SubmitHandler<signupFormInputs> = async (data) => {
    try {
      if (!acceptTerms) throw new Error("need to accept terms and conditions ");
      setIsLoading(true);
      const res = await axios.post("/api/auth/signup", data);
      if (res.status === 200) {
        router.push("/me/profile");
        toast.success("Signup successful:", res.data);
        // You can redirect or show a success message here
      } else {
        console.error("Signup failed:", res.data);
        toast.error("could not sign up ");
      }
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="sm:grid grid-cols-2 mx-6 sm:mt-24 sm:my-10  sm:h-[35rem] sm:m-20 justify-center items-center sm:border overflow-hidden sm:shadow sm:border-gray-200"
    >
      <div className="flex flex-col sm:px-32 px-6 sm:py-10 sm:border-gray-500">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl sm:text-2xl font-karla hidden sm:block">
            Create an account
          </h1>
          <div className="flex items-center justify-center mt-10 mb-4  sm:hidden">
            <Logo />
          </div>
          <h3 className="sm:text-sm text-base text-gray-500 leading-5 sm:text-left text-center font-medium">
            Let’s get you started with your new account.
          </h3>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">
              Name
            </p>
            <Input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className="py-6 sm:py-1"
            />
            {errors.name && (
              <div className="form-error">{errors.name.message}</div>
            )}
          </label>
          <label className="space-y-1 sm:space-y-0">
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
              <div className="form-error">{errors.email.message}</div>
            )}
          </label>
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">
              Password
            </p>
            <Input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              className="py-6 sm:py-1"
            />
            {errors.password && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </label>
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">
              Confirm Password
            </p>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
              className="py-6 sm:py-1"
            />
            {errors.confirmPassword && (
              <div className="form-error">{errors.confirmPassword.message}</div>
            )}
          </label>
        </div>
        <div className="flex justify-between text-sm sm:text-xs items-center pt-5 font-medium font-karla">
          <div className="flex items-center gap-1">
            <Checkbox onClick={() => setAcceptTerms((state) => !state)} />
            <span>I agree to the terms and conditions</span>
          </div>
        </div>
        <div className="flex flex-col pt-4 space-y-3">
          <Button className="bg-black flex items-center justify-center gap-3 text-white font-karla font-medium py-2 sm:py-1 rounded-lg">
            {isLoading && (
              <ScaleLoader className="" height={10} width={6} color="#fff" />
            )}
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
        <div className="sm:pt-5 pt-3 text-center sm:text-left text-xs">
          <p>
            <span className="text-gray-500 font-karla text-sm">
              Already have an account?
            </span>
            <Link
              href="/login"
              className="font-bold tracking-tighter pl-1 inline-block w-20 font-karla relative  "
            >
              Sign in
              <div className="relative sm:right-4 w-16 h-3 ">
                <Image
                  src="/images/und.png"
                  fill
                  className="  absolute object-contain right-4 sm:left-0 top-0 "
                  alt=" image"
                />
              </div>
            </Link>
          </p>
        </div>
      </div>
      <div className="relative  hidden sm:block size-full">
        <Image
          src="/images/img-5.jpg"
          alt="Signup Image"
          fill
          className="object-cover   w-full h-full"
        />
      </div>
      <Toaster position="top-center" />
    </form>
  );
}

export default Signup;
