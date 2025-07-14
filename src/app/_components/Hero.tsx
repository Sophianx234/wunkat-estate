import Link from "next/link"

function Hero() {
  return (
    <div className="py-24 z-1   pt-36">
      <div className="flex justify-center flex-col items-center">

      <h1 className={` sm:text-7xl text-4xl text-center  antialiased  font-bold lg:pt-3 lg:px-16 lg:font-extrabold  sm:tracking-tight sm:leading-20  px-1 pt-6 text-gray-200 font-archivo uppercase sm:pt-16`}>Crafting your dream    space,  inside and out</h1>
      <p className="max-w-2xl text-center text-gray-200 antialiased font-medium pt-6 px-6 sm:px-0 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, hic minus earum dolorum odio ullam doloribus quisquam totam sed eaque porro odit veniam repellat excepturi quo neque ipsum.</p>
      </div>
      <div className="flex justify-center items-center pt-8 gap-6">
        <Link href='login' className='btn-primary hover-blackbtn'>
          Login
        </Link>
        <Link href='signup' className=' hover-whitebtn btn-secondary hover-whitebtn'>
          Signup
        </Link>
      </div>
     
    </div>
  )
}

export default Hero
