import Link from "next/link"
import Image from "next/image"
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatPrice, getImageUrl } from "@/lib/utils"
import type { Room } from "@/lib/types"
import { IRoom } from "@/app/dashboard/properties/page"
import { useDashStore } from "@/lib/store"
import { useRouter } from "next/navigation"

interface RoomCardProps {
  room: IRoom
}

export function RoomCard({ room }: RoomCardProps) {
  const {user,setRoom} = useDashStore()
  const router = useRouter();
  const handleViewDetails = () => {
    if(!user){
      setRoom(room);
      router.push(`/login`);
    }
  }
      // Navigate to room details page
  return (
    <Card className="overflow-hidden hover:shadow-lg transition border border-border h-full flex flex-col">
      <div className="relative h-48 bg-muted w-full overflow-hidden">
        <Image
          src={room?.images[0] || "room"}
          alt={room?.name}
          fill
          className="object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{room.name}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{room.houseId?.location.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaBed className="w-4 h-4" />
              {room.beds} bed{room.beds !== 1 ? "s" : ""}
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="w-4 h-4" />
              {room.baths} bath{room.baths !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div className="font-bold text-lg">{formatPrice(room.price)}</div>
        <Button variant="outline" size="sm" asChild onClick={handleViewDetails}>
          <div className="pointer">View Details</div>
        </Button>
      </CardFooter>
    </Card>
  )
}
