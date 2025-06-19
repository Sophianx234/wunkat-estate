import Image from "next/image"
import Button from "./Button"

function CTA() {
  return (
    <section className="grid sm:grid-cols-[1fr_2.5fr] grid-cols-1 mx-4  sm:mx-12 pb-36 rounded-xl overflow-hidden">
      
      
        <Image src='/images/fam-7.jpg' width={400} height={500}  alt="" className="  object-right rounded-xl  object-cover    " />
      
      <div className="  flex items-center flex-col justify-center sm:px-32 space-y-3">
        <h1 className=" section-subtitle sm:pt-0 pt-8  w-full ">Local expertise for <br /> luxury homes</h1>
        <div className="w-full ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis quia eum nobis quam, labore minus consectetur recusandae corporis, dignissimos quasi eveniet iste molestiae ab autem.</div>
        <Button className="btn-primary self-start">
          Learn more 
        </Button>
      </div>
    </section>
  )
}

export default CTA
