"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import { isAuthenticated } from "@/lib/auth"

interface BookingButtonProps {
  roomId: string
  checkIn?: string
  checkOut?: string
}

export function BookingButton({ roomId, checkIn, checkOut }: BookingButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const params = new URLSearchParams({
      roomId,
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
    })

    router.push(`/checkout?${params.toString()}`)
  }

  return (
    <Button onClick={handleClick} className="w-full gap-2" size="lg">
      Book Now
      <FaArrowRight className="w-4 h-4" />
    </Button>
  )
}
