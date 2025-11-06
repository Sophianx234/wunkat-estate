"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaBars, FaTimes, FaHome } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img alt="logo" src="/images/home.png" className="object-contain size-10" />
            <span className="pt-2">WunkatHomes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-muted-foreground transition">
              Home
            </Link>
            <Link href="/browse" className="text-foreground hover:text-muted-foreground transition">
              Browse Rooms
            </Link>
            <Link href="/about" className="text-foreground hover:text-muted-foreground transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-muted-foreground transition">
              Contact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="hidden sm:inline-flex md:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/browse">Browse Rooms</Link>
            </Button>

            {/* Breadcrumb / Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-foreground focus:outline-none"
            >
              {menuOpen ? (
                <FaTimes className="w-6 h-6 text-gray-800" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-800" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border shadow-md"
          >
            <nav className="flex flex-col pl-4 gap-4 py-6">
              
              <Link href="/browse" onClick={toggleMenu} className="text-foreground hover:text-muted-foreground transition">
                Browse Rooms
              </Link>
              <Link href="/about" onClick={toggleMenu} className="text-foreground hover:text-muted-foreground transition">
                About
              </Link>
              <Link href="/contact" onClick={toggleMenu} className="text-foreground hover:text-muted-foreground transition">
                Contact
              </Link>

                  <Link href="/login">Login</Link>
                
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
