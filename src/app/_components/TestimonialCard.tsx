import Image from "next/image"

function TestimonialCard() {
  return (
    <div className="w-[20rem] pt-8 bg-white px-6 pb-8 rounded-2xl">
      <div className="grid grid-cols-[1fr_2fr_.5fr] justify-center items-center">

      <div className="relative size-16 rounded-full overflow-hidden">
        <Image src="/images/prof-1.jpg" className="object-cover" fill alt="" />
      </div>
      <div className="font-karla -space-y-2">
      <p className="font-bold"> Damian Parker</p>
      <p className="text-sm">Customer</p>
      </div>
      <div className="relative w-full h-full">

      <Image src="/images/quote.png" alt="" fill  className="object-contain"/>
      </div>
      </div>
      <p className="text-sm   font-light pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore dolor autem. Eos dolores facere enim, animi optio harum porro dolorem? Ducimus, deserunt temporibus, fuga molestias, quasi ipsa quae officiis maxime cumque officia magnam illum.</p>
    </div>
  )
}

export default TestimonialCard
