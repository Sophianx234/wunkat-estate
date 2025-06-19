import Image from "next/image"
import Button from "./Button"
import { ArrowBigRight, MoveRight } from "lucide-react"

function Discover() {
  return (
    <div className="grid grid-cols-[1fr_1fr] shadow  mb-44 mt-28 mx-40 rounded-lg overflow-hidden ">
      <div className="bg-gray-50  px-16 space-y-5 pt-24">
    <div className="space-y-2" >
      <h1 className="section-title-secondary  ">Discover Our Finest <br /> Selection</h1>
      <p className="text-xs ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa quia ullam quibusdam hic fugiat voluptas, quae cupiditate quasi!</p>
    </div>
    <Button className="btn-primary flex items-center gap-2">
      Browse 
       <MoveRight size={22} className="pt-[2px]" />
    </Button >
      </div>
      <div className="relative w-full h-[22rem] rounded-tr-lg  overflow-hidden ">
        <Image src='/images/img-1.jpg' alt="" fill className="object-cover" />
      </div>
    </div>
  )
}

export default Discover
