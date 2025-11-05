"use client"

import { useState } from "react"
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaHome } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/app/dashboard/_components/PropertyCard"
import { IRoom } from "../properties/page"
import { motion, AnimatePresence } from "framer-motion"

export default function PropertySearchBar() {
  const [filters, setFilters] = useState({
    city: "",
    maxPrice: "",
    description: "",
  })
  const [results, setResults] = useState<IRoom[]>([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setResults([])
    setSearched(true)

    try {
      const params = new URLSearchParams(filters).toString()
      const res = await fetch(`/api/rooms/search?${params}`)
      const data = await res.json()

      if (res.ok) {
        setResults(data.data || [])
      } else {
        setError(data.message || "Something went wrong")
      }
    } catch (err) {
      setError("Failed to fetch search results.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative z-10 -mt-12 px-6 mb-12">
      {/* 🔍 Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-4 md:items-center"
      >
        <div className="flex items-center gap-2 flex-1">
          <FaMapMarkerAlt className="text-gray-400" />
          <Input
            name="city"
            placeholder="Enter location"
            className="border-none focus:ring-0"
            value={filters.city}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <FaDollarSign className="text-gray-400" />
          <Input
            name="maxPrice"
            placeholder="Max price ($)"
            className="border-none focus:ring-0"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2 flex-1">
          <FaHome className="text-gray-400" />
          <Input
            name="description"
            placeholder="Room description or keyword"
            className="border-none focus:ring-0"
            value={filters.description}
            onChange={handleChange}
          />
        </div>

        <Button
          onClick={handleSearch}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? "Searching..." : <><FaSearch /> Search</>}
        </Button>
      </motion.div>

      {/* 🏠 Search Results */}
      <div className="max-w-6xl mx-auto mt-10">
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}

        {!loading && searched && results.length === 0 && !error && (
          <p className="text-center text-gray-400 italic mt-6">
            No results found. Try adjusting your filters.
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-500 italic mt-6">
            Searching rooms...
          </p>
        )}

        <AnimatePresence>
          {!loading && results.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {results.map((room) => (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <PropertyCard room={room} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
