import {
  Clock,
  Facebook,
  Linkedin,
  MapPin,
  Twitter,
} from "lucide-react";
import Logo from "./Logo";

function Footer() {
  return (
    <section className="bg-gray-50">
      {/* Top Logo + Social */}
      <div className="px-6 pt-8 pb-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Logo + Tagline */}
          <div className="max-w-sm">
            <Logo />
          </div>

          {/* Social Icons */}
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3 pt-2">
              <a href="#" className="text-gray-600 hover:text-green-700 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-700 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-green-700 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid Section */}
      <div className="border-t border-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm text-gray-700">
          {/* Newsletter */}
          <div>
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

          {/* Links & Info */}
          <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-[1fr_1fr_2fr] sm:gap-0 gap-6 mt-8 sm:mt-0 ">
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

            {/* Popular Areas */}
            <div>
              <h4 className="font-semibold mb-3">Popular Areas</h4>
              <ul className="space-y-2">
                <li>East Legon</li>
                <li>Spintex</li>
                <li>Cantonments</li>
                <li>Airport Residential</li>
              </ul>
            </div>

            {/* Contact & Location */}
            <div className="space-y-4 flex gap-9">
              <div>
                <h4 className="font-semibold mb-3">Contact Us</h4>
                <ul className="space-y-2">
                  <li>info@yourdomain.com</li>
                  <li>+233 20 000 0000</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Location</h4>
                <div className="flex items-start gap-2">
                  <MapPin className="size-5 text-green-700" />
                  <span className="leading-4 text-xs text-nowrap">East Legon<br />Accra, Ghana</span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <Clock className="size-5 text-green-700" />
                  <span className="leading-4">Mon - Sat:<br />8am – 6pm</span>
                </div>
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
  );
}

export default Footer;
