import Feature from "./Feature"

function Featured() {
  return (
    <div className="pb-32" >
      <div className="text-center pt-12 pb-6">
        <h1 className="text-3xl font-bold ">Featured Categories</h1>
        <h4 className="">Build in your own way</h4>
      </div>
      <div className="grid grid-cols-2 mx-4 gap-4">
        <Feature/>
        <Feature/>
        <Feature/>
        <Feature/>
        
      </div>
    </div>
  )
}

export default Featured
