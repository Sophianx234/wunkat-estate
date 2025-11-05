import { Clock, Facebook, Linkedin, MapPin, Twitter } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo + Tagline */}
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-gray-700">
            Trusted property listings and insights to help you find your perfect
            home or investment.
          </p>
        </div>

        {/* Address, Hours & Social */}
        <div className="flex flex-col sm:flex-row gap-8 text-sm">
          {/* Address & Hours */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-black" />
              <span className="leading-tight text-xs">
                East Legon
                <br />
                Accra, Ghana
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-black" />
              <span className="leading-tight text-xs">
                Mon - Sat:
                <br />
                8am – 6pm
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-gray-700 hover:text-black transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-black transition"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-black transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="  ">
        

        {/* Bottom Bar */}
        <div className="border-t py-6 border-gray-300 pt-6 text-center text-xs text-gray-600">
         <div> © {new Date().getFullYear()} Wunkat. All rights reserved.</div>
       
        </div>
      </div>
    </footer>
  );
}
