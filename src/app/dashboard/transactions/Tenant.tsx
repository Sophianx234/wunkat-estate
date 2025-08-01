'use client'
import { useDashStore } from "@/lib/store"
import { MessageCircle, Phone } from "lucide-react"

export default function TenantCard() {
  const {user} = useDashStore()
  return (
    <div className="md:fixed  mt-24 md:mt-0 md:w-64 md:-translate-y-9">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Transactions</h1>

    <div className="bg-white w-full p-6 rounded-2xl md:h-[24.5rem] pb-8   shadow-md border col-span-3 sm:col-span-1  transition-all hover:shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="relative rounded-full overflow-hidden size-24">

        <img
          src={user?.profile}
          alt="Profile"
          
          className="rounded-full border bg-center object-cover "
          />
          </div>
        <h2 className="mt-4 text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>

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
        <h3 className="font-semibold text-gray-800 mb-2">About {user?.name}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Flat: <span className="font-medium">Merpur 045167</span></p>
          <p>User ID: <span className="font-medium">B48564</span></p>
          <p>Registered: <span className="font-medium">20 Jan 2018</span></p>
          <p>Profession: <span className="font-medium">Business</span></p>
        </div>
       
      </div>
    </div>
    </div>
  )
}
