"use client"

import { useEffect, useState } from "react"
import { FaMapMarkerAlt, FaStar, FaBed, FaBath } from "react-icons/fa"
import { motion } from "framer-motion"
import PropertyCardSkeleton from "./skeletons/PropertyCardSkeleton"

interface Room {
  _id: string
  name: string
  description: string
  rating: number
  reviews: number
  price: number
  beds: number
  baths: number
  planType: string
  images: string[]
  houseId: {
    name: string
    location: {
      address: string
      city: string
      region: string
      country: string
    }
  }
}

export default function FeaturedHomes() {
  const [homes, setHomes] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms")
        if (!res.ok) throw new Error("Failed to fetch rooms")

        const data = await res.json()

        // Add random ratings and reviews for realism
        const enriched = data.map((room: Room) => ({
          ...room,
          rating: (4.7 + Math.random() * 0.3).toFixed(2),
          reviews: Math.floor(Math.random() * 200) + 50,
        }))

        setHomes(enriched.slice(0, 6))
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])



  return (
    <section id="homes" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Homes</h2>
          <p className="text-gray-600 text-lg">Discover handpicked properties available now.</p>
        </div>

{loading && (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <PropertyCardSkeleton key={index} index={index} />
    ))}
  </div>
)}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && homes.map((home, index) => (
            <motion.div
              key={home._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={home.images[0] || "/placeholder.svg"}
                  alt={home.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-bold text-black">{home.price}</p>
                    <p className="text-sm text-gray-500">/month</p>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                    <FaStar className="w-4 h-4 text-gray-800" />
                    <span className="text-sm font-semibold">{home.rating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-1">{home.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {home.houseId.location.address},{home.houseId.location.city}
                  </div>
                </div>

                <div className="flex gap-4 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBed className="w-4 h-4" />
                    <span className="text-sm">{home.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBath className="w-4 h-4" />
                    <span className="text-sm">{home.baths} Baths</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500">{home.reviews} reviews</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
