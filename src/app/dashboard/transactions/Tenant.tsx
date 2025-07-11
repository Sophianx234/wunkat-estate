import Image from "next/image"
import { Phone, MessageCircle } from "lucide-react"

export default function TenantCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border col-span-2 sm:col-span-1  transition-all hover:shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="relative size-24">

        <Image
          src="/images/prof-1.jpg"
          alt="Profile"
          fill
          className="rounded-full border bg-center object-cover "
          />
          </div>
        <h2 className="mt-4 text-lg font-semibold">Rachel Mohr</h2>
        <p className="text-sm text-muted-foreground">ID: 015485647</p>

        <div className="flex gap-3 mt-4">
          <button className="flex items-center gap-1 bg-muted px-3 py-1.5 text-sm rounded-full hover:bg-accent">
            <MessageCircle className="w-4 h-4" /> Text
          </button>
          <button className="flex items-center gap-1 bg-muted px-3 py-1.5 text-sm rounded-full hover:bg-accent">
            <Phone className="w-4 h-4" /> Call
          </button>
        </div>
      </div>

      <div className="mt-6 text-left">
        <h3 className="font-semibold text-gray-800 mb-2">About Mohr</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Flat: <span className="font-medium">Merpur 045167</span></p>
          <p>User ID: <span className="font-medium">B48564</span></p>
          <p>Registered: <span className="font-medium">20 Jan 2018</span></p>
          <p>Profession: <span className="font-medium">Business</span></p>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Rachel is a long-term tenant known for punctual payments and great communication. She’s currently leasing a two-bedroom apartment.
        </p>
      </div>
    </div>
  )
}
