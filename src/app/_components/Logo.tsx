import Image from "next/image"

type logoProps = {
  titleColor?: string
}
function Logo({titleColor}:logoProps) {
  return (
    <div className="flex items-center lg:gap-0 gap-2">
            <div className="relative sm:size-12 size-10  ">
              <Image fill alt="" src='/images/home.png' className="object-contain "/>
            </div>
        <h1 className={`section-title-tertiary lg:pt-4 pt-1 ${titleColor} `}>WunkatHomes</h1>
          </div>
  )
}

export default Logo
