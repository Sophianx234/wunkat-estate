import Expert from "./Expert"

function Experts() {
  return (
    <section className="py-32 pt-32">
<div className="text-center space-y-2 pb-10 px-4 sm:px-0">
  <h1 className="section-title-secondary ">Meet Our Team of Experts</h1>
  <p className=" font-karla">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia.</p>
</div>

<div className="sm:flex grid grid-cols-2 w-full sm:gap-4 gap-2  sm:px-32 justify-center px-4 items-center">

<Expert/>
<Expert/>
<Expert/>
<Expert/>
</div>
      
    </section>
  )
}

export default Experts
