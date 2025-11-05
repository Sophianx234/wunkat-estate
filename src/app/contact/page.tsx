"use client"

import type React from "react"

import { useState } from "react"
import { FaEnvelope, FaPhone, FaMapPin } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend API for sending emails
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Contact Hero */}
        <section
  className="relative bg-[url('/a-4.jpg')] py-20 md:py-32 bg-cover bg-center bg-no-repeat"
  
>
  {/* Overlay */}
 <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/70"></div>
  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8  text-white">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
    <p className="text-lg text-gray-200">
      Have questions? We'd love to hear from you. Contact us anytime.
    </p>
  </div>
</section>


        {/* Contact Content */}
        <section className="py-20 md:py-32 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Contact Info Cards */}
              <Card className="border border-border">
                <CardHeader>
                  <FaEnvelope className="w-6 h-6 text-primary mb-4" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:info@wunkathomes.com" className="text-foreground hover:text-primary transition">
                    info@wunkathomes.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader>
                  <FaPhone className="w-6 h-6 text-primary mb-4" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+1-800-HOMES" className="text-foreground hover:text-primary transition">
                    +1-800-HOMES
                  </a>
                </CardContent>
              </Card>

              <Card className="border border-border">
                <CardHeader>
                  <FaMapPin className="w-6 h-6 text-primary mb-4" />
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">123 Main St, Anytown, USA 12345</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
  

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto    py-4 ">
       

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 ">
  {/* Contact Form */}
  <div className="space-y-6">
    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
      Send Us a Message
    </h2>
    <p className="text-gray-600 mb-8">
      We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.
    </p>

    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows={6}
        value={formData.message}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition"
        required
      />

      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 text-white text-lg font-medium py-5 rounded-xl transition"
      >
        Send Message
      </Button>

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-300 text-green-700 rounded-xl text-sm text-center">
          ✅ Thank you! We'll get back to you soon.
        </div>
      )}
    </form>
  </div>

  {/* Info Section */}
  <div className="space-y-8">
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <Clock size={24} className="text-black mt-1" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2 text-lg">Business Hours</h3>
          <div className="text-gray-600 text-sm space-y-1">
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 11:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>

    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-gray-900 text-lg mb-4">
        Frequently Asked Questions
      </h3>
      <div className="divide-y divide-gray-200">
        <details className="py-3 group">
          <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center hover:text-black">
            What are your operating hours?
            <span className="group-open:rotate-45 text-xl transition-transform">+</span>
          </summary>
          <p className="text-gray-600 mt-2 text-sm">
            Our support team is available weekdays from 9:00 AM to 6:00 PM.
          </p>
        </details>

        <details className="py-3 group">
          <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center hover:text-black">
            How soon do you reply to messages?
            <span className="group-open:rotate-45 text-xl transition-transform">+</span>
          </summary>
          <p className="text-gray-600 mt-2 text-sm">
            We usually respond within 24 hours during business days.
          </p>
        </details>

        <details className="py-3 group">
          <summary className="cursor-pointer font-medium text-gray-800 flex justify-between items-center hover:text-black">
            Can I visit your office in person?
            <span className="group-open:rotate-45 text-xl transition-transform">+</span>
          </summary>
          <p className="text-gray-600 mt-2 text-sm">
            Yes! Please book an appointment before visiting our main office.
          </p>
        </details>
      </div>
    </div>
  </div>
</div>

      </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
