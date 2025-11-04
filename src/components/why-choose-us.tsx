"use client"

import { FaCheckCircle, FaShieldAlt, FaClock, FaSmile } from "react-icons/fa"

const features = [
  { icon: FaCheckCircle, title: "Verified Rooms", desc: "Each space listed on WunkatHomes is personally verified for quality, comfort, and authenticity." },
  { icon: FaShieldAlt, title: "Secure Booking", desc: "Book confidently with encrypted transactions and trusted payment gateways." },
  { icon: FaClock, title: "24/7 Support", desc: "Our dedicated team is available anytime you need assistance or guidance." },
  { icon: FaSmile, title: "Transparent Pricing", desc: "What you see is what you pay. No hidden costs, no surprises — just clarity." },
]

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-24">
      {/* Soft decorative background gradient overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center gap-16">
        {/* Left Text Section */}
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Why Choose <span className="text-gray-300">WunkatHomes?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            We’re redefining how you discover and book living spaces — through verified listings, secure payments,
            and an unmatched rental experience built on trust and design excellence.
          </p>

          <div className="mt-10 space-y-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-white bg-gray-700/30 rounded-full p-1.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side Visual */}
        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-white/10 to-transparent blur-3xl rounded-full" />
          <img
            src="/c-3.jpg"
            alt="Luxury Apartment"
            className="relative z-10 w-full rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
