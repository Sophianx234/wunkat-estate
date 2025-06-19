import Image from "next/image"

function Expert() {
  return (
    <div>
      <div>
  <div className="relative sm:size-[14rem] size-[11rem]  rounded-lg overflow-hidden">
    <Image fill alt="" src='/images/prof-2.jpg' className="object-cover object-center"/>
  </div>
  <div className="font-karla -space-y-2">
      <h1 className="font-bold text-base"> Alfred Zendaya</h1>
      <p className="text-sm">Executive</p>
      </div>
</div>
      
    </div>
  )
}

export default Expert
