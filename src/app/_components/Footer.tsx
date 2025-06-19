import Image from "next/image"
import Logo from "./Logo"
import { Clock, Facebook, Linkedin, Mail, MapPin, Twitter } from "lucide-react"

function Footer() {
  return (
    <section className="bg-gray-50">
      

<div className="px-6 pt-8 pb-4">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
    
    {/* Logo + Tagline */}
    <div className="max-w-sm">
      <Logo />
      
    </div>

    {/* Quick Info with Icons */}
    <div className="space-y-3 text-sm text-gray-700">
      
      

      {/* Social Icons */}
      <div className="flex gap-3 pt-2">
        <a href="#" className="text-gray-600 hover:text-green-700 transition">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-green-700 transition">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-green-700 transition">
          <Linkedin className="size-6" />
        </a>
      </div>
    </div>

  </div>
</div>

      <div className=" border-t border-gray-300 py-12  px-6 ">

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 text-sm text-gray-700">
    {/* Newsletter */}
    <div className="md:col-span-2">
      <h4 className="font-semibold mb-3">Subscribe</h4>
      <p className="mb-4">Subscribe to our newsletter for market updates</p>
      <div className="flex">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border border-gray-300 rounded-l-md w-full"
        />
        <button className="bg-green-700 text-white px-4 py-2 rounded-r-md">
          Send
        </button>
      </div>
    </div>

    {/* Browse */}
    <div>
      <h4 className="font-semibold mb-3">Browse</h4>
      <ul className="space-y-2">
        <li>Buy</li>
        <li>Rent</li>
        <li>Sell</li>
        <li>Agents</li>
      </ul>
    </div>

    {/* Popular Links */}
    <div>
      <h4 className="font-semibold mb-3">Popular Areas</h4>
      <ul className="space-y-2">
        <li>East Legon</li>
        <li>Spintex</li>
        <li>Cantonments</li>
        <li>Airport Residential</li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="font-semibold mb-3">Contact Us</h4>
      <ul className="space-y-2">
        <li>info@yourdomain.com</li>
        <li>+233 20 000 0000</li>
      </ul>
    </div>

    {/* App Buttons */}
    <div className="">
      <h4 className="font-semibold mb-3 pl-6">Location</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2 -translate-x-1">
        <MapPin className="size-5 text-green-700" />
        <span className="font-karla leading-4">East Legon <br /> Accra, Ghana</span>
      </div>
      <div className="flex items-center gap-2 -translate-x-1">
        <Clock className="size-5 text-green-700" />
        <span className="font-karla  leading-4">Mon - Sat: <br />
         8am – 6pm</span>
      </div>
      </div>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="mt-12 text-center text-xs text-gray-500">
    © 2025 Wunkat. All rights reserved.
  </div>
      </div>
</section>

  )
}

export default Footer
