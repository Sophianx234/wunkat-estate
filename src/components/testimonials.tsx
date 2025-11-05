"use client"

import { FaQuoteLeft, FaStar } from "react-icons/fa"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Renter",
    quote: "Found my dream apartment in 2 days. The process was seamless and transparent. Highly recommend!",
    rating: 5,
    avatar: "/professional-woman-avatar.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Investor",
    quote: "As a property investor, HomesWunkat made managing multiple units incredibly easy. Best platform out there.",
    rating: 5,
    avatar: "/professional-man-avatar.jpg",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Young Professional",
    quote: "No hidden fees, no hassle. Just honest pricing and great homes. This is the future of renting.",
    rating: 5,
    avatar: "/professional-woman-avatar-2.jpg",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 text-lg">Thousands of happy renters trust HomesWunkat.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-gray-800" />
                ))}
              </div>

              <div className="flex items-start gap-3 mb-6">
                <FaQuoteLeft className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">{testimonial.quote}</p>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-6">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
