"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import type { Room } from "@/lib/types"
import { FilterState, RoomFilters } from "@/components/room-filters"
import Header from "@/components/header"
import { RoomCard } from "@/components/room-card"
import Footer from "@/components/footer"

// Mock data - Replace with real data from API
const MOCK_ROOMS: Room[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    description: "Beautiful loft with city views in the heart of downtown",
    price: 1200,
    location: "San Francisco, CA",
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "AC", "Balcony"],
    images: ["Modern downtown loft with city views"],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Cozy Beachside Cottage",
    description: "Charming cottage steps from the beach",
    price: 950,
    location: "Santa Monica, CA",
    beds: 2,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "Pet Friendly", "Parking"],
    images: ["Beachside cottage with ocean views"],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Luxury Brooklyn Apartment",
    description: "Stunning apartment with exposed brick and modern amenities",
    price: 1800,
    location: "Brooklyn, NY",
    beds: 2,
    baths: 2,
    amenities: ["WiFi", "Kitchen", "Gym", "Washer/Dryer"],
    images: ["Luxury apartment in Brooklyn with exposed brick"],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Charming Chicago Studio",
    description: "Compact studio in a vibrant neighborhood",
    price: 750,
    location: "Chicago, IL",
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "AC", "Heating"],
    images: ["Charming studio apartment in Chicago"],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Austin Tech Hub Suite",
    description: "Modern suite perfect for professionals",
    price: 1100,
    location: "Austin, TX",
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "Parking", "Pool"],
    images: ["Modern suite in Austin tech district"],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Seattle Waterfront Studio",
    description: "Cozy studio with waterfront access",
    price: 1050,
    location: "Seattle, WA",
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "Balcony", "Pet Friendly"],
    images: ["Waterfront studio in Seattle"],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "Miami Luxury Penthouse",
    description: "Upscale penthouse with ocean views and premium amenities",
    price: 2500,
    location: "Miami, FL",
    beds: 3,
    baths: 2,
    amenities: ["WiFi", "Kitchen", "Pool", "Gym", "Parking"],
    images: ["Luxury penthouse in Miami with ocean views"],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Denver Mountain View Apartment",
    description: "Spacious apartment with mountain views and modern finishes",
    price: 1350,
    location: "Denver, CO",
    beds: 2,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "Balcony", "Heating", "AC"],
    images: ["Mountain view apartment in Denver"],
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function BrowsePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    bedrooms: null,
    maxPrice: 5000,
    amenities: [],
  })
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter((room) => {
      const matchesSearch =
        room.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        room.description.toLowerCase().includes(filters.search.toLowerCase())

      const matchesLocation = filters.location
        ? room.location.toLowerCase().includes(filters.location.toLowerCase())
        : true

      const matchesBedrooms = filters.bedrooms ? room.beds === filters.bedrooms : true

      const matchesPrice = room.price <= filters.maxPrice

      const matchesAmenities =
        filters.amenities.length === 0 || filters.amenities.every((amenity) => room.amenities.includes(amenity))

      return matchesSearch && matchesLocation && matchesBedrooms && matchesPrice && matchesAmenities
    })
  }, [filters])

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage)
  const paginatedRooms = filteredRooms.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Browse Hero */}
        <section className="py-12 md:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Rooms</h1>
            <p className="text-lg text-muted-foreground">Explore {MOCK_ROOMS.length} rooms across the country</p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-12 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <RoomFilters onFilter={setFilters} />
                </div>
              </div>

              {/* Room Grid */}
              <div className="lg:col-span-3">
                {paginatedRooms.length > 0 ? (
                  <>
                    <div className="mb-6 text-sm text-muted-foreground">
                      Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredRooms.length)}{" "}
                      of {filteredRooms.length} rooms
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {paginatedRooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center gap-2 flex-wrap">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <Button
                            key={idx + 1}
                            variant={page === idx + 1 ? "default" : "outline"}
                            onClick={() => {
                              setPage(idx + 1)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                          >
                            {idx + 1}
                          </Button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground mb-4">No rooms found matching your filters.</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setFilters({
                          search: "",
                          location: "",
                          bedrooms: null,
                          maxPrice: 5000,
                          amenities: [],
                        })
                      }
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
