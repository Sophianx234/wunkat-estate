import Image from "next/image";
import { Input } from "../_components/input";
import { Checkbox } from "../_components/checkbox";
import { FaGoogle } from "react-icons/fa";
import Button from "../_components/Button";

function Signup() {
  return (
    <div className="sm:grid grid-cols-2 mx-6 sm:mt-24 my-10 sm:h-[35rem] sm:m-20 justify-center items-center border shadow border-gray-200">
      <div className="flex flex-col sm:px-32 px-6 py-10 border-gray-500">
        <div className="space-y-2">
          <h1 className="font-bold text-3xl sm:text-2xl font-karla">
            Create an account
          </h1>
          <h3 className="sm:text-sm text-base text-gray-500 leading-5">
            Let’s get you started with your new account.
          </h3>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">Name</p>
            <Input type="text" placeholder="Enter your full name" className="py-5 sm:py-1" />
          </label>
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">Email</p>
            <Input type="email" placeholder="Enter your email" className="py-5 sm:py-1" />
          </label>
          <label className="space-y-1 sm:space-y-0">
            <p className="sm:text-sm font-semibold font-karla text-base">Password</p>
            <Input type="password" placeholder="Create a password" className="py-5 sm:py-1" />
          </label>
        </div>
        <div className="flex justify-between text-sm sm:text-xs items-center pt-5 font-medium font-karla">
          <div className="flex items-center gap-1">
            <Checkbox />
            <span>I agree to the terms and conditions</span>
          </div>
        </div>
        <div className="flex flex-col pt-4 space-y-3">
          <Button className="bg-black text-white font-karla font-medium py-2 sm:py-1 rounded-lg">
            Create Account
          </Button>
          <Button className="border text-gray-700 flex items-center gap-2 justify-center font-karla font-medium py-2 sm:py-1 rounded-lg">
            <FaGoogle />
            <span> Sign up with Google </span>
          </Button>
        </div>
        <div className="pt-8 text-xs">
          <p>
            <span className="text-gray-500 font-karla text-sm">
              Already have an account?
            </span>
            <span className="font-bold tracking-tighter pl-1 inline-block w-20 font-karla relative  ">
              Sign in
              <img
                src="images/und.png"
                className="w-12  absolute right-9"
                alt=""
              />
            </span>
          </p>
        </div>
      </div>
      <div className="relative hidden sm:block size-full">
        <Image
          src="/images/img-5.jpg"
          alt="Signup Image"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default Signup;
