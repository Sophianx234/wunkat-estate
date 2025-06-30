'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function RentApplicationPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    apartment: "",
    message: "",
  })

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.apartment) return alert("Please fill all required fields.")
    console.log("Rent Application Submitted:", form)
    alert("Application submitted successfully!")
    setForm({ fullName: "", email: "", phone: "", apartment: "", message: "" })
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Rent Application</h2>
        <p className="text-muted-foreground">Fill in the form below to apply for an apartment</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            placeholder="Full Name *"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <Input
            placeholder="Email Address *"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            placeholder="Apartment Interested In *"
            value={form.apartment}
            onChange={(e) => setForm({ ...form, apartment: e.target.value })}
          />
        </div>

        <Textarea
          placeholder="Optional Message..."
          className="min-h-[100px]"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <Button onClick={handleSubmit} className="mt-2 w-full sm:w-auto">
          Submit Application
        </Button>
      </Card>
    </div>
  )
}
