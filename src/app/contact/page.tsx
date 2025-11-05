"use client"

import { useState } from "react"
    import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'
import { FaHandshake, FaHome, FaLock, FaUsers } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      icon: FaHandshake,
      title: "Direct Connections",
      description:
        "Connect directly with property owners. No agents, no middlemen, just honest conversations.",
    },
    {
      icon: FaHome,
      title: "Real Spaces",
      description:
        "Verified rooms with authentic photos and detailed descriptions. See exactly what you're getting.",
    },
    {
      icon: FaLock,
      title: "Secure & Safe",
      description:
        "Your money is protected. Payments are secured through Stripe, and bookings are guaranteed.",
    },
    {
      icon: FaUsers,
      title: "Community First",
      description:
        "We believe in building a community of trusted hosts and renters. Your feedback shapes us.",
    },
  ]

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("Message sent successfully!")
        // setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("Failed to send message. Please try again.")
      }
    } catch (error) {
      setStatus("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative bg-[url('/a-4.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              About WunkatHomes
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow">
              We’re on a mission to simplify real estate bookings. By eliminating agents and hidden
              fees, we empower renters and property owners to connect directly and fairly.
            </p>
          </div>
        </section>

        {/* MISSION */}
        <section className="relative bg-neutral-50 py-28">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16 px-6 lg:px-12">
            <div className="relative group">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/a-2.jpg"
                  alt="Elegant interior representing WunkatHomes mission"
                  className="w-full h-[600px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            <div className="relative">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Building Trust <br /> Through Transparency
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At <span className="font-semibold text-gray-900">WunkatHomes</span>, our mission is
                to redefine real estate by making it more transparent, accessible, and
                human-centered.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Every connection is built on honesty and simplicity. From verified listings to
                secure payments, we ensure a seamless experience that lets you focus on what truly
                matters — finding your space.
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-20 md:py-32 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <Card key={idx} className="border border-border shadow-md hover:shadow-lg transition">
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

        {/* CONTACT FORM */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-10">
              Have a question or suggestion? We’d love to hear from you. Fill out the form below and
              our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none"
              />
              <button
  type="submit"
  disabled={loading}
  className="w-full py-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 flex justify-center items-center gap-2"
>
  {!loading && (


// Default values shown
<Ring2
  size="34"
  stroke="5"
  strokeLength="0.25"
  bgOpacity="0.1"
  speed="0.8"
  color="white" 
/>
  )}
  {loading ? "Sending..." : "Send Message"}
</button>

            </form>

            {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
