
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
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* About Hero */}
        <section className="py-20 md:py-32 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About WunkatHomes</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to simplify real estate bookings. By eliminating agents and hidden fees, we empower
              renters and property owners to connect directly and fairly.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 md:py-32 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-secondary/50 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                To simplify real estate bookings by removing intermediaries and hidden costs. We believe renters deserve
                transparent pricing, instant bookings, and direct communication with property owners.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're looking for a short-term rental, a long-term lease, or anything in between, WunkatHomes
                makes it simple, fair, and secure.
              </p>
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
