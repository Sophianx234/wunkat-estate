import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    price: "$850,000",
    location: "Downtown, Seattle",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    status: "For Sale",
    image: "/modern-downtown-condo.png",
  },
  {
    id: 2,
    title: "Luxury Family Home",
    price: "$1,250,000",
    location: "Bellevue, WA",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    status: "Sold",
    image: "/luxury-family-home.png",
  },
  {
    id: 3,
    title: "Cozy Starter Home",
    price: "$425,000",
    location: "Tacoma, WA",
    beds: 3,
    baths: 2,
    sqft: "1,600",
    status: "For Sale",
    image: "/cozy-starter-home.png",
  },
]

export function PropertyListings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl">Recent Properties</CardTitle>
        <Button variant="outline">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {properties.map((property) => (
            <div key={property.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{property.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{property.price}</p>
                    <Badge variant={property.status === "Sold" ? "secondary" : "default"}>{property.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Bed className="h-3 w-3 mr-1" />
                    {property.beds} beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-3 w-3 mr-1" />
                    {property.baths} baths
                  </span>
                  <span className="flex items-center">
                    <Square className="h-3 w-3 mr-1" />
                    {property.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
