"use client"

import { FaMapMarkerAlt, FaStar, FaBed, FaBath } from "react-icons/fa"

const homes = [
  {
    id: 1,
    image: "/modern-apartment-city-view.jpg",
    price: "$2,500",
    title: "Modern City Apartment",
    location: "Downtown Manhattan, NY",
    beds: 2,
    baths: 2,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    image: "/luxury-penthouse-skyline.jpg",
    price: "$4,200",
    title: "Luxury Penthouse",
    location: "Midtown, Manhattan, NY",
    beds: 3,
    baths: 2,
    rating: 5.0,
    reviews: 89,
  },
  {
    id: 3,
    image: "/cozy-studio-apartment.jpg",
    price: "$1,800",
    title: "Cozy Studio",
    location: "Brooklyn, NY",
    beds: 1,
    baths: 1,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 4,
    image: "/spacious-family-home.jpg",
    price: "$3,500",
    title: "Spacious Family Home",
    location: "Upper West Side, NY",
    beds: 4,
    baths: 3,
    rating: 4.9,
    reviews: 102,
  },
  {
    id: 5,
    image: "/elegant-loft-space.jpg",
    price: "$2,800",
    title: "Elegant Loft",
    location: "Tribeca, NY",
    beds: 2,
    baths: 2,
    rating: 4.95,
    reviews: 73,
  },
  {
    id: 6,
    image: "/waterfront-luxury-condo.jpg",
    price: "$5,500",
    title: "Waterfront Luxury Condo",
    location: "Upper East Side, NY",
    beds: 3,
    baths: 3,
    rating: 5.0,
    reviews: 45,
  },
]

export default function FeaturedHomes() {
  return (
    <section id="homes" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Homes</h2>
          <p className="text-gray-600 text-lg">Discover handpicked properties available now.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homes.map((home) => (
            <div
              key={home.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:translate-y-[-8px] group cursor-pointer"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={home.image || "/placeholder.svg"}
                  alt={home.title}
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
                  <h3 className="text-lg font-semibold mb-1">{home.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    {home.location}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
