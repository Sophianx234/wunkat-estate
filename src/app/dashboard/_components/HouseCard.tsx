"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  Trash,
  Bed,
  Bath,
} from "lucide-react";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { IRoom } from "@/app/dashboard/properties/page";
import { IHouse } from "@/models/House";
import { useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

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

  const onAddRoom = () => router.push(`/dashboard/properties/add-property`);
  const onEditRoom = (roomId: string) =>
    router.push(`/dashboard/properties/edit/${roomId}`);

  const onDeleteRoom = async (roomId: string) => {
    const result = await MySwal.fire({
      title: "Delete room?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/rooms/${roomId}`, { method: "DELETE" });
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
          title: "Error",
          text: "Something went wrong.",
        });
      }
    }
  };

  return (
    <Card className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <CardHeader className="flex justify-between items-start p-5">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
            <FaHome className="text-zinc-500 dark:text-zinc-400" />
            {house.name}
          </CardTitle>
          <CardDescription className="text-sm flex items-center gap-2 text-zinc-500">
            <FaMapMarkerAlt className="text-zinc-400" />
            {house.location.city}
          </CardDescription>
          <Badge
            variant="outline"
            className="border-zinc-300 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
          >
            {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditHouse(house._id)}
            className="h-8 w-8 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteHouse(house._id)}
            className="h-8 w-8 text-red-500 hover:text-red-700 dark:text-red-400"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Toggle button */}
      <div className="flex justify-center pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <>
          <Separator className="my-2" />
          <CardContent className="space-y-4 p-5">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-zinc-700 dark:text-zinc-200">
                Rooms
              </h4>
              <Button
                size="sm"
                onClick={onAddRoom}
                className="flex items-center gap-1 rounded-md text-sm bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                <Plus className="w-4 h-4" /> Add Room
              </Button>
            </div>

            {loadingRooms ? (
              <p className="text-zinc-500 text-sm">Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p className="text-zinc-500 text-sm italic">
                No rooms added yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {rooms.map((room: IRoom) => (
                  <li
                    key={room._id}
                    className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-100/60 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    <img
                      src={room.images?.[0] || "/placeholder-room.jpg"}
                      alt={room.name}
                      className="w-14 h-14 rounded-md object-cover border border-zinc-300 dark:border-zinc-700"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">
                        {room.name}
                      </p>
                      <p className="text-xs text-zinc-500 flex items-center gap-3 flex-wrap">
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

                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditRoom(room._id)}
                        className="h-7 w-7 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteRoom(room._id)}
                        className="h-7 w-7 text-red-500 hover:text-red-700 dark:text-red-400"
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
