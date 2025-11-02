"use client"

import { FaSearch, FaCalendarCheck, FaCreditCard } from "react-icons/fa"

const steps = [
  {
    icon: FaSearch,
    number: "01",
    title: "Search Properties",
    description: "Browse hundreds of verified listings curated just for you. Filter by location, price, and amenities.",
  },
  {
    icon: FaCalendarCheck,
    number: "02",
    title: "Book Instantly",
    description: "Schedule viewings in seconds and secure your viewing slot with instant confirmation.",
  },
  {
    icon: FaCreditCard,
    number: "03",
    title: "Secure Payment",
    description: "Complete payments safely with our encrypted platform. No hidden fees, complete transparency.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Three simple steps to find and secure your dream home.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-bold text-gray-200 group-hover:text-gray-300">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
