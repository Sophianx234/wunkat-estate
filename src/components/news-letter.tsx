"use client"

import { FaArrowRight, FaEnvelopeOpenText } from "react-icons/fa"

export default function Newsletter() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Left Image Section */}
        <div className="relative h-[400px] md:h-auto">
          <img
            src="/c-1.jpg"
            alt="Elegant modern home exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
          <div className="absolute bottom-6 left-6 text-white md:hidden">
            <h3 className="text-2xl font-semibold">Luxury Meets Lifestyle</h3>
            <p className="text-sm text-gray-200">Curated spaces, crafted for comfort.</p>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex items-center justify-center px-8 md:px-16 py-20 bg-gray-50 relative">
          <div className="max-w-md text-center md:text-left space-y-8">
            {/* Subheading */}
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm uppercase tracking-wide">
              <FaEnvelopeOpenText className="w-4 h-4" />
              <span>Join Our Community</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
              Get Exclusive <br />
              <span className="font-light text-gray-700">Real Estate Insights</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Subscribe for curated updates on new listings, design inspiration, and investment opportunities — 
              tailored for the modern homeowner.
            </p>

            {/* Form */}
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 bg-white"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition-all duration-300"
              >
                Subscribe
                <FaArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Note */}
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>

          {/* Decorative Element */}
          <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-tr from-gray-200 to-transparent rounded-full blur-2xl opacity-40" />
        </div>
      </div>
    </section>
  )
}
