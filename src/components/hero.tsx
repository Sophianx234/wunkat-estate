import Link from "next/link"
import { FaArrowRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export default  function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-muted to-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Find Your Perfect Space. Book Instantly. Live Freely.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Direct bookings. Transparent pricing. No middlemen. Discover thousands of rooms from verified hosts, book
            instantly, and start living your best life.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/browse">
              Browse Rooms
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
