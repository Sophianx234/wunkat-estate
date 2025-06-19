import Image from "next/image"
import BreadCrum from "./BreadCrum"

function Logo() {
  return (
    <div className="flex items-center">
            <div className="relative size-12 ">
              <Image fill alt="" src='/images/home.png' className="object-contain "/>
            </div>
        <h1 className="section-title-tertiary pt-4">WunkatHomes</h1>
          </div>
  )
}

export default Logo
