"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import FeaturedHomes from "@/components/featured-homes"
import Testimonials from "@/components/testimonials"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedHomes />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </main>
  )
}
