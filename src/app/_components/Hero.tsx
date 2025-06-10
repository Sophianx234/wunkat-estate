import { roboto } from "../layout"
import Button from "./Button"

function Hero() {
  return (
    <div className="pt-24">
      <div className="flex justify-center flex-col items-center">

      <h1 className={`${roboto.className} text-8xl antialiased capitalize font-extrabold  tracking-tight leading-24 text-gray-200`}>Crafting your dream <br /> space, inside and out</h1>
      <p className="max-w-2xl text-center text-gray-200 antialiased font-medium pt-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, hic minus earum dolorum odio ullam doloribus quisquam totam sed eaque porro odit veniam repellat excepturi quo neque ipsum.</p>
      </div>
      <div className="flex justify-center items-center pt-4 gap-6">
        <Button className='bg-black text-white p-2 rounded-full px-6'>
          Login
        </Button>
        <Button className='text-black bg-white px-6 p-2 rounded-full'>
          Signup
        </Button>
      </div>
    </div>
  )
}

export default Hero
