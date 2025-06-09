function Navbar() {
  return (
    <nav className=" flex justify-between  px-20 w-full items-center mt-10 text-white">
      <div>
        <h1 className="text-xl font-bold ">WunkatHomes</h1>
      </div>

      <ul className="flex  items-center justify-between
backdrop-blur-3xl bg-white text-black overflow-hidden rounded-2xl   text-lg ">
  
        <li className=" pl-10 px-4 rounded-r-2xl py-3">Home</li>
        <li className="nav-item">Buy</li>
        <li className="nav-item">Rent</li>
        <li className="nav-item">About</li>
        <li className="pr-10">Contact us</li>
      </ul>
      <div className="bg-[#000] rounded-lg text-lg px-4 py-1 font-extrabold"><span>login</span></div>
    </nav>
  )
}

export default Navbar
