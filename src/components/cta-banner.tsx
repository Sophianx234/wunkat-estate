"use client"

import { FaArrowRight } from "react-icons/fa"

export default function CtaBanner() {
  return (
    <section className="py-16 md:py-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-balance">Start your journey with HomesWunkat today.</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Join thousands of renters who have found their perfect home. No fees, no hassle, just honest pricing.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
          Get Started
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  )
}
