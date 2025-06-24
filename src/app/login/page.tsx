import Image from "next/image"
import { Input } from "../_components/input"

function Login() {
  return (

    <div className="grid grid-cols-2 h-[35rem] m-20 justify-center items-center shadow border-gray-200  ">
      <div className="flex flex-col
       px-36">

      <div className="space-y-2">
<h1 className="font-bold text-2xl font-karla">Welcome back</h1>
<h3 className="text-sm text-gray-500">Welcome back! Please enter your details.</h3>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <label>
          <p className="text-sm font-semibold font-karla">Email</p>

        <Input type="text" placeholder="Enter your email"/>
        </label>
        <label>
          <p className="text-sm font-semibold font-karla">Password</p>

        <Input type="password" placeholder="Enter your password"/>
        </label>
      </div>
      </div>
      <div className="relative size-full">
<Image src="/images/img-6.jpg" alt="Login Image" fill className="object-cover w-full h-full" />
      </div>
    </div>
  )
}

export default Login
