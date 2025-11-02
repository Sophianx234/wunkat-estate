import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaMapMarkerAlt, FaBed, FaBath, FaWifi, FaCheck } from "react-icons/fa"
import { formatPrice } from "@/lib/utils"
import Header from "@/components/header"
import { ImageCarousel } from "@/components/image-carousel"
import { BookingButton } from "@/components/booking-button"
import Footer from "@/components/footer"

// Mock room data - Replace with real data from database
const MOCK_ROOMS = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    description:
      "Beautiful loft with city views in the heart of downtown. Perfect for professionals or remote workers.",
    longDescription:
      "This stunning modern loft offers the ultimate urban living experience. With floor-to-ceiling windows overlooking the cityscape, exposed brick walls, and contemporary finishes, every detail has been carefully curated for comfort and style. The open-concept layout is perfect for entertaining, while the private bedroom provides a peaceful retreat after a long day in the city.",
    price: 1200,
    location: "San Francisco, CA",
    beds: 1,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "AC", "Heating", "Parking", "Balcony"],
    images: [
      "/c-1.jpg",
      "/c-2.jpg",
      "/c-3.jpg",
      "/c-4.jpg",
    ],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Cozy Beachside Cottage",
    description: "Charming cottage steps from the beach with ocean views",
    longDescription:
      "Wake up to the sound of waves and ocean breeze in this charming beachside cottage. Located just steps away from the sandy beach, this property offers the perfect coastal escape. The cottage features a well-equipped kitchen, comfortable bedrooms, and a spacious living area with direct beach access.",
    price: 950,
    location: "Santa Monica, CA",
    beds: 2,
    baths: 1,
    amenities: ["WiFi", "Kitchen", "Pet Friendly", "Parking", "Beach Access"],
    images: [
      "/c-1.jpg",
      "/c-2.jpg",
      "/c-3.jpg",
      "/c-4.jpg",
    ],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Luxury Brooklyn Apartment",
    description: "Stunning apartment with exposed brick and modern amenities",
    longDescription:
      "Experience luxury living in this stunning Brooklyn apartment featuring original exposed brick walls, high ceilings, and state-of-the-art amenities. The spacious layout includes a modern kitchen, two comfortable bedrooms, and two full bathrooms. Located in a vibrant neighborhood with excellent restaurants and nightlife.",
    price: 1800,
    location: "Brooklyn, NY",
    beds: 2,
    baths: 2,
    amenities: ["WiFi", "Kitchen", "Gym", "Washer/Dryer", "Doorman", "Rooftop Access"],
    images: [
      "/c-1.jpg",
      "/c-2.jpg",
      "/c-3.jpg",
      "/c-4.jpg",
    ],
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const metadata: Metadata = {
  title: "Room Details - WunkatHomes",
  description: "View detailed information about available rooms",
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const room = MOCK_ROOMS.find((r) => r.id === id)

  if (!room) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Image Carousel */}
          <ImageCarousel images={room.images} title={room.title} />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Title and Location */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{room.title}</h1>
                <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                  <FaMapMarkerAlt className="w-5 h-5" />
                  {room.location}
                </div>
                <p className="text-lg text-muted-foreground">{room.description}</p>
              </div>

              {/* Quick Facts */}
              <Card className="border border-border">
                <CardContent className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaBed className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">{room.beds}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Bedroom{room.beds !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaBath className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">{room.baths}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Bathroom{room.baths !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaWifi className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">WiFi</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Included</p>
                  </div>
                </CardContent>
              </Card>

              {/* Full Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Space</h2>
                <p className="text-muted-foreground leading-relaxed">{room.longDescription}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 rounded border border-border bg-secondary/20"
                    >
                      <FaCheck className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Guest Reviews</h2>
                <Card className="border border-border">
                  <CardContent className="py-8">
                    <p className="text-center text-muted-foreground">
                      No reviews yet. Be the first to review this room after your stay!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="md:col-span-1">
              <Card className="border-2 border-border sticky top-20">
                <CardHeader>
                  <div className="text-4xl font-bold mb-2">{formatPrice(room.price)}</div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dates */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">Check-in</label>
                    <input type="date" className="w-full px-3 py-2 border border-border rounded bg-input" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">Check-out</label>
                    <input type="date" className="w-full px-3 py-2 border border-border rounded bg-input" />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">Number of Guests</label>
                    <select className="w-full px-3 py-2 border border-border rounded bg-input">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly rate</span>
                      <span className="font-medium">{formatPrice(room.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking fee</span>
                      <span className="font-medium">${Math.round(room.price * 0.05)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border font-semibold text-base">
                      <span>Total</span>
                      <span>{formatPrice(room.price + Math.round(room.price * 0.05))}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <BookingButton roomId={room.id} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
