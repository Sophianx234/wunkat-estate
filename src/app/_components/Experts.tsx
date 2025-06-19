import Image from "next/image"
import Expert from "./Expert"

function Experts() {
  return (
    <section className="py-32 pt-32">
<div className="text-center">
  <h1 className="section-title-secondary">Meet Our Team of Experts</h1>
  <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia.</p>
</div>

<div className="flex gap-4 px-32 justify-center">

<Expert/>
<Expert/>
<Expert/>
</div>
      
    </section>
  )
}

export default Experts
