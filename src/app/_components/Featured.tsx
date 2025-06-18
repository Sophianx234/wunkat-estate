import Feature from "./Feature"

function Featured() {
  return (
    <div className="pb-32 lg:pt-16" >
      <div className="section-textcontainer">
        <h1 className="text-3xl font-bold lg:text-4xl ">Featured Categories</h1>
        <h4 className="">Build in your own way</h4>
      </div>
      <div className="grid grid-cols-2 mx-4 gap-4 lg:flex lg:justify-center ">
        <Feature/>
        <Feature/>
        <Feature/>
        <Feature/>
        
      </div>
    </div>
  )
}

export default Featured
