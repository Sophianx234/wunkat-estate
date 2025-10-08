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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDownCircle,
  ChevronUpCircle,
  Plus,
  Edit,
  Trash,
  Bed,
  Bath,
} from "lucide-react";

import { FaHome, FaMapMarkerAlt } from "react-icons/fa"; // ✅ react-icons

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

  useEffect(() => {
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
    if (expanded) fetchRooms();
  }, [expanded, house._id]);

  const onAddRoom = () => {
    router.push(`/dashboard/properties/add-property`);
  };
  const onEditRoom = (roomId: string) => {
    router.push(`/dashboard/properties/edit/${roomId}`);
  };

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

        setRooms((prev) => prev.filter((room) => room._id !== roomId));

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
    <Card className="rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col border border-border">
      {/* Header */}
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="space-y-2">
          {/* House Name with Icon */}
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FaHome className="text-primary" /> {house.name}
          </CardTitle>

          {/* Location with Icon */}
          <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> {house.location.city}
          </CardDescription>

          <Badge
            variant="secondary"
            className="rounded-md px-3 py-0.5 text-xs font-medium"
          >
            {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"}
          </Badge>
        </div>

        {/* Edit & Delete */}
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditHouse(house._id)}
            className="rounded-full h-8 w-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDeleteHouse(house._id)}
            className="rounded-full h-8 w-8"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Expand button */}
      <div className="flex justify-center pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="rounded-full hover:bg-accent"
        >
          {expanded ? (
            <ChevronUpCircle className="w-6 h-6 text-primary" />
          ) : (
            <ChevronDownCircle className="w-6 h-6 text-muted-foreground" />
          )}
        </Button>
      </div>

      {/* Expandable Room List */}
      {expanded && (
        <>
          <Separator className="my-2" />
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Rooms</h4>
              <Button
                size="sm"
                onClick={onAddRoom}
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
              <ul className="space-y-3">
                {rooms.map((room: IRoom) => (
                  <li
                    key={room._id}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={room.images?.[0] || "/placeholder-room.jpg"}
                      alt={room.name}
                      className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {room.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-3 flex-wrap">
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

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEditRoom(room._id)}
                        className="h-7 w-7 rounded-full"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDeleteRoom(room._id)}
                        className="h-7 w-7 rounded-full"
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
