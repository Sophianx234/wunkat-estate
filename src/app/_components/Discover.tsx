import { MoveRight } from "lucide-react"
import Image from "next/image"
import Button from "./Button"

function Discover() {
  return (
    <div className="grid grid-cols-[1fr_1fr] shadow sm:h-full h-fit   mb-44 mt-28 sm:mx-40 rounded-lg overflow-hidden mx-2 ">
      <div className="bg-gray-50  sm:px-16 px-6 space-y-5 sm:pt-24 pt-8 pb-4 sm:pb-0 ">
    <div className="space-y-2" >
      <h1 className="section-title-secondary  ">Discover Our Finest <br className="hidden sm:block"/> Selection</h1>
      <p className="text-xs ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa quia ullam quibusdam hic fugiat voluptas, quae cupiditate quasi!</p>
    </div>
    <Button className="text-sm bg-black sm:btn-primary text-white py-1 px-2 sm:py-2 sm:px-3 rounded-full flex hover-blackbtn items-center gap-2">
      Browse 
       <MoveRight size={22} className="pt-[2px]" />
    </Button >
      </div>
      <div className="relative sm:w-full sm:h-[22rem] rounded-tr-lg  overflow-hidden ">
        <Image src='/images/img-1.jpg' alt="" fill className="object-cover" />
      </div>
    </div>
  )
}

export default Discover
