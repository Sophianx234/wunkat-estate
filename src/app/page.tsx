"use client"

import Header from "@/components/header"
import Hero from "@/components/hero"
import PropertySearchBar from "@/components/property-searchbar"
import HowItWorks from "@/components/how-it-works"
import FeaturedHomes from "@/components/featured-homes"
import PopularLocations from "@/components/popular-locations"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import CtaBanner from "@/components/cta-banner"
import Footer from "@/components/footer"
import DownloadApp from "@/components/download-app"
import Newsletter from "@/components/news-letter"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <PropertySearchBar />
      <HowItWorks />
      <FeaturedHomes />
      <PopularLocations />
      <WhyChooseUs />
      <Testimonials />
      {/* <DownloadApp /> */}
      <CtaBanner />
      <Newsletter/>
      <Footer />
    </main>
  )
}
