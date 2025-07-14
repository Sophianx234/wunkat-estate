"use client";
import { BASE_URL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from 'react-spinners';
import { z } from "zod";
import Button from "../_components/Button";
import { Checkbox } from "../_components/checkbox";
import { Input } from "../_components/input";
import Logo from "../_components/Logo";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
type formInputs = z.infer<typeof loginSchema>;
function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputs>({
    resolver: zodResolver(loginSchema),
  });
  const handleLogin: SubmitHandler<formInputs> = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/login`, data);

      if(res.status === 200){
        console.log("res", res);
        toast.success('login successful')
        router.push('/dashboard/properties')
        

      }else{
        toast.error('Login failed...')

      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="sm:grid grid-cols-2 sm:mx-6 sm:mt-24 sm:h-[35rem] sm:m-20 justify-center items-center sm:border sm:shadow sm:border-gray-200   "
    >
      <div
        className="flex flex-col
       sm:px-32 px-8 py-10 border-gray-500 "
      >
        
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="font-bold text-3xl sm:text-2xl  font-karla hidden sm:block">
            Welcome back
          </h1>
          <div className="flex items-center justify-center mt-10 mb-4  sm:hidden">

        <Logo/>
        </div>

          <h3 className="sm:text-sm text-base text-gray-500 leading-5">
            Welcome back! Please enter your details.
          </h3>
        </div>
        <div className="flex flex-col gap-4  sm:mt-6 mt-8 space-y-4 sm:space-y-0 mb-2 sm:mb-0 ">
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">
              Email
            </p>

            <Input
              {...register("email")}
              type="text"
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
              placeholder="Enter your password"
              className="py-6 sm:py-1"
            />
            {errors.password && (
              <div className="form-error">{errors.password.message}</div>
            )}
          </label>
        </div>
        <div className="flex  justify-between text-sm sm:text-xs items-center pt-8 sm:pt-5 font-medium font-karla">
          <div className="flex items-center  gap-1">
            <Checkbox />
            <span>Remember for 30 days</span>
          </div>
          <p>Forgot password</p>
        </div>
        <div className="flex flex-col pt-4 space-y-3">
          <Button
            disabled={isLoading}
            className="bg-black flex items-center justify-center gap-3 text-white font-karla font-medium py-3 sm:py-2 rounded-lg"
          >
            {isLoading && (
              
                <ScaleLoader className="" height={10} width={6} color="#fff" />
            )}
             {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          
        </div>
        <div className="pt-8 text-center sm:text-left text-xs">
          <p>
            <span className="text-gray-500 font-karla text-sm">
              Don&apos;t have an account?{" "}
            </span>
            <Link href='/signup' className="font-bold tracking-tighter pl-1 font-karla relative">
              Sign up for free{" "}
              <img
                src="images/und.png"
                className="w-20 absolute right-0"
                alt=""
              />
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden sm:block size-full">
        <Image
          src="/images/img-6.jpg"
          alt="Login Image"
          fill
          className="object-cover w-full h-full"
        />
      </div>
            <Toaster position="top-center" />
      
    </form>
  );
}

export default Login;
