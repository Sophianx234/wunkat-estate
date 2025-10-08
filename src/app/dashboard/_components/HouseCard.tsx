"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Plus, Edit, Trash, Bed, Bath } from "lucide-react";

import { IRoom } from "@/app/dashboard/properties/page";
import { IHouse } from "@/models/House";
import { useRouter } from "next/navigation";

type HouseCardProps = {
  house: IHouse;
  
  onEditHouse: (houseId: string) => void;
  onDeleteHouse: (houseId: string) => void;
 
};

export default function HouseCard({
  house,
  onEditHouse,
  onDeleteHouse,
}: HouseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const router = useRouter();

  // fetch rooms when expanded
  useEffect(() => {
    // if (expanded) {
      const fetchRooms = async () => {
        setLoadingRooms(true);
        try {
          const res = await fetch(`/api/rooms?houseId=${house._id}`, {
            cache: "no-store",
          });
          if (!res.ok) throw new Error("Failed to fetch rooms");
          const data = await res.json();
          setRooms(data);
        } catch (err) {
          console.error("Error fetching rooms:", err);
        } finally {
          setLoadingRooms(false);
        }
      };
      fetchRooms();
    // }
  }, [expanded, house._id]);

  const onAddRoom = (houseId: string) =>{
    router.push(`/dashboard/properties/add-property/${houseId}`);
  }
   const onEditRoom = (roomId: string) => {
    router.push(`/dashboard/properties/edit/${roomId}`);

    
   }

const onDeleteRoom = async (roomId: string) => {
  const result = await MySwal.fire({
    title: "Are you sure?",
    text: "This room will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete room");

      // remove from local state without re-fetching
      setRooms((prev) => prev.filter((room) => room._id !== roomId));

      // success toast (not modal)
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Room deleted successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting.",
      });
    }
  }
};


  return (
    <Card className="rounded-md shadow-md hover:shadow-xl transition flex flex-col">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">{house.name}</CardTitle>
          <CardDescription>{house.location.city}</CardDescription>
          <Badge
            variant="secondary"
            className="rounded-sm px-3 py-0.5 text-xs font-medium"
          >
            {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="rounded-full"
        >
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </Button>
      </CardHeader>

      {/* Expandable Room List */}
      {expanded && (
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Rooms</h4>
            <Button
              size="sm"
              onClick={() => onAddRoom(house._id)}
              className="flex items-center gap-1 rounded-md"
            >
              <Plus className="w-4 h-4" /> Add Room
            </Button>
          </div>

          {loadingRooms ? (
            <p className="text-muted-foreground text-sm">Loading rooms...</p>
          ) : rooms.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              No rooms added yet.
            </p>
          ) : (
            <ul className="space-y-2">
  {rooms.map((room: IRoom) => (
    <li
      key={room._id}
      className="flex items-center gap-3 p-2 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition"
    >
      {/* Room Image */}
      <img
        src={room.images?.[0] || "/placeholder-room.jpg"}
        alt={room.name}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />

      {/* Room Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{room.name}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
          {room.beds > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" /> {room.beds}
            </span>
          )}
          {room.baths > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" /> {room.baths}
            </span>
          )}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEditRoom(room._id)}
          className="h-5 w-5 rounded-full"
        >
          <Edit className="w-1 h-1" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDeleteRoom(room._id)}
          className="h-5 w-5 rounded-full"
        >
          <Trash className="w-1 h-1" />
        </Button>
      </div>
    </li>
  ))}
</ul>

          )}
        </CardContent>
      )}

      {/* Footer with actions */}
      <Separator />
      <CardFooter className="flex justify-end gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditHouse(house._id)}
          className="rounded-full"
        >
          <Edit className="w-4 h-4 mr-1" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteHouse(house._id)}
          className="rounded-full"
        >
          <Trash className="w-4 h-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
