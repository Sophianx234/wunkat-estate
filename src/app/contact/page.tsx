"use client"

import { useState } from "react"
    import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'
import { FaEnvelope, FaHandshake, FaHome, FaLock, FaMapPin, FaPhone, FaUsers } from "react-icons/fa"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow">
              Have questions? We'd love to hear from you. Contact us anytime.
            </p>
          </div>
        </section>

        {/* MISSION */}
    

        {/* VALUES */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
      Get in Touch
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-16">
      Whether you have a question, feedback, or need assistance with your booking,
      our team is here to help. Reach out to us through any of the options below.
    </p>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {/* Email Card */}
      <Card className="w-full max-w-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-col items-center text-center">
          <FaEnvelope className="w-8 h-8 text-primary mb-4" />
          <CardTitle className="text-lg font-semibold">Email Us</CardTitle>
          <CardDescription className="text-gray-500">
            We typically reply within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <a
            href="mailto:info@wunkathomes.com"
            className="text-gray-800 hover:text-primary transition font-medium"
          >
            info@wunkathomes.com
          </a>
        </CardContent>
      </Card>

      {/* Phone Card */}
      <Card className="w-full max-w-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-col items-center text-center">
          <FaPhone className="w-8 h-8 text-primary mb-4" />
          <CardTitle className="text-lg font-semibold">Call Us</CardTitle>
          <CardDescription className="text-gray-500">
            Speak directly with our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <a
            href="tel:+233-55-123-4567"
            className="text-gray-800 hover:text-primary transition font-medium"
          >
            +233 55 123 4567
          </a>
        </CardContent>
      </Card>

      {/* Address Card */}
      <Card className="w-full max-w-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-col items-center text-center">
          <FaMapPin className="w-8 h-8 text-primary mb-4" />
          <CardTitle className="text-lg font-semibold">Visit Us</CardTitle>
          <CardDescription className="text-gray-500">
            Stop by our office during working hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-800">
            WunkatHomes HQ  
            <br />
            Spintex Road, Accra, Ghana
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>


        {/* CONTACT FORM */}
       {/* CONTACT FORM */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Form Side */}
      <div>
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
            {loading && (
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

        {status && <p className="mt-4 text-sm text-center text-gray-700">{status}</p>}
      </div>

      {/* Image Side */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="/c-1.jpg"
          alt="Contact Us"
          className=" object-cover transform hover:scale-105 transition duration-700 ease-in-out"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-3xl pointer-events-none" />
        {/* Optional text or CTA over the image */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-2xl font-bold text-center">Get in Touch Today!</h3>
        </div> */}
      </div>

    </div>
  </div>
</section>


      </main>
      <Footer />
    </div>
  )
}


/*  */