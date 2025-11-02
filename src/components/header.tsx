"use client"

import Link from "next/link"
import { useState } from "react"
import { FaHome } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-900 font-semibold text-xl tracking-tight"
          >
            <div className="p-2 bg-black text-white rounded-full">
              <FaHome className="w-5 h-5" />
            </div>
            <span className="font-bold">WunkatHomes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Browse Rooms
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-black transition font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              asChild
              className="border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-black text-white hover:bg-gray-800"
            >
              <Link href="/browse">Find Homes</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg animate-slideDown">
          <nav className="flex flex-col gap-3 px-6 py-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/browse"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Browse Rooms
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-black transition font-medium"
            >
              Contact
            </Link>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                variant="outline"
                asChild
                className="border-gray-300 text-gray-800"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-black text-white hover:bg-gray-800"
              >
                <Link href="/browse">Find Homes</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
