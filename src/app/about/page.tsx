
import { FaHandshake, FaHome, FaLock, FaUsers } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      icon: FaHandshake,
      title: "Direct Connections",
      description: "Connect directly with property owners. No agents, no middlemen, just honest conversations.",
    },
    {
      icon: FaHome,
      title: "Real Spaces",
      description: "Verified rooms with authentic photos and detailed descriptions. See exactly what you're getting.",
    },
    {
      icon: FaLock,
      title: "Secure & Safe",
      description: "Your money is protected. Payments are secured through Stripe, and bookings are guaranteed.",
    },
    {
      icon: FaUsers,
      title: "Community First",
      description: "We believe in building a community of trusted hosts and renters. Your feedback shapes us.",
    },
  ]

  return (
    <div className="min-h-screen  bg-background">
      <Header />
      <main>
        {/* About Hero */}
       <section
  className="relative bg-[url('/a-4.jpg')] bg-cover bg-center bg-no-repeat"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

  {/* Content */}
  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white ">
    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
      About WunkatHomes
    </h1>
    <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow">
      We’re on a mission to simplify real estate bookings.  
      By eliminating agents and hidden fees, we empower renters and property owners  
      to connect directly and fairly.
    </p>
  </div>
</section>

        {/* Mission Statement */}
<section className="relative bg-neutral-50 py-28">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16 px-6 lg:px-12">
    
    {/* Image Side */}
    <div className="relative group">
      <div className="rounded-3xl overflow-hidden shadow-2xl relative">
        <img
          src="/a-2.jpg"
          alt="Elegant interior representing WunkatHomes mission"
          className="w-full h-[600px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-10" />
    </div>

    {/* Text Side */}
    <div className="relative">
      <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Building Trust <br /> Through Transparency
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        At <span className="font-semibold text-gray-900">WunkatHomes</span>, our
        mission is to redefine real estate by making it more transparent,
        accessible, and human-centered. We believe that finding a home should be
        about trust, not transactions.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-10">
        Every connection is built on honesty and simplicity. From verified
        listings to secure payments, we ensure a seamless experience that lets
        you focus on what truly matters — finding your space.
      </p>
      <div className="flex items-center gap-6">
        <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
          Explore More
        </button>
        <button className="text-gray-700 hover:text-black font-medium transition">
          Our Vision →
        </button>
      </div>
    </div>

  </div>
</section>



        {/* Values */}
        <section className="py-20 md:py-32 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <Card key={idx} className="border border-border">
                    <CardHeader>
                      <Icon className="w-8 h-8 text-primary mb-4" />
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
