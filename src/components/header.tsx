"use client"

import Link from "next/link"
import { FaHome } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <FaHome className="w-6 h-6" />
            <span>WunkatHomes</span>
          </Link>

          {/* Navigation */}
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
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/browse">Browse Rooms</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
