import HomeCard from "./HomeCard"

function HomesForYou() {
  return (
    <section className="bg-gray-50 lg:mx-6 rounded-xl pb-28 mb-32">
      <div className="lg:pt-24 ">
<div className="section-textcontainer">
  <h1 className="section-title ">Homes For You</h1>
  <h3 className="italic  ">A place like never before</h3>
  </div>
      </div>
      <div className="flex items-center gap-3 mx-4">
        <HomeCard/>
        <HomeCard/>
        <HomeCard/>
        <HomeCard/>
        <HomeCard/>
      </div>
      
    </section>
  )
}

export default HomesForYou
