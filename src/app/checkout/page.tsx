"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
// import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCheckCircle, FaArrowRight, FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa"
import { formatPrice } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details")
  const [loading, setLoading] = useState(false)

  // Mock booking data from URL params
  const roomId = searchParams.get("roomId") || "1"
  const checkIn = searchParams.get("checkIn") || "2024-11-15"
  const checkOut = searchParams.get("checkOut") || "2024-12-15"

  const mockRoom = {
    id: roomId,
    title: "Modern Downtown Loft",
    location: "San Francisco, CA",
    price: 1200,
    beds: 1,
    baths: 1,
    image: "Modern downtown loft with city views",
  }

  const bookingFee = Math.round(mockRoom.price * 0.05)
  const totalPrice = mockRoom.price + bookingFee

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.email && formData.phone) {
      setStep("payment")
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setStep("confirmation")
  }

  return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Steps Indicator */}
            {step !== "confirmation" && (
              <div className="mb-12 flex items-center justify-between">
                <div className={`flex items-center ${step === "details" ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step === "details" ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    1
                  </div>
                  <span className="ml-3 font-semibold">Booking Details</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step === "payment" ? "bg-primary" : "bg-border"}`}></div>
                <div className={`flex items-center ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step === "payment" ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    2
                  </div>
                  <span className="ml-3 font-semibold">Payment</span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                {step === "details" && (
                  <Card className="border-2 border-border">
                    <CardHeader>
                      <CardTitle>Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleDetailsSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Full Name</label>
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleDetailsChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Email</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleDetailsChange}
                            placeholder="you@example.com"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Phone Number</label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleDetailsChange}
                            placeholder="+1 (555) 123-4567"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Special Requests</label>
                          <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleDetailsChange}
                            placeholder="Any special requests or preferences?"
                            rows={4}
                            className="w-full px-3 py-2 border border-border rounded bg-input resize-none"
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full gap-2">
                          Continue to Payment
                          <FaArrowRight className="w-4 h-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {step === "payment" && (
                  <Card className="border-2 border-border">
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePaymentSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Cardholder Name</label>
                          <Input
                            name="cardName"
                            value={cardData.cardName}
                            onChange={handleCardChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Card Number</label>
                          <Input
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleCardChange}
                            placeholder="4532 1234 5678 9010"
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                            <Input
                              name="expiryDate"
                              value={cardData.expiryDate}
                              onChange={handleCardChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">CVV</label>
                            <Input
                              name="cvv"
                              value={cardData.cvv}
                              onChange={handleCardChange}
                              placeholder="123"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>

                        <div className="bg-secondary/50 p-4 rounded border border-border">
                          <p className="text-sm text-muted-foreground mb-2">
                            This is a demo payment form. No actual charges will be made.
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="flex-1 bg-transparent"
                            onClick={() => setStep("details")}
                          >
                            Back
                          </Button>
                          <Button type="submit" size="lg" className="flex-1 gap-2" disabled={loading}>
                            {loading ? "Processing..." : "Complete Booking"}
                            {!loading && <FaArrowRight className="w-4 h-4" />}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {step === "confirmation" && (
                  <Card className="border-2 border-primary bg-secondary/20">
                    <CardContent className="pt-12 pb-12 text-center">
                      <FaCheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                      <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
                      <p className="text-lg text-muted-foreground mb-8">
                        Your reservation has been successfully completed. Check your email for confirmation details.
                      </p>
                      <div className="bg-background p-6 rounded border border-border mb-8 text-left">
                        <h3 className="font-semibold mb-4">Booking Reference</h3>
                        <p className="font-mono text-sm text-primary mb-4">#BK20241115{roomId}</p>
                        <p className="text-sm text-muted-foreground">
                          A confirmation email has been sent to{" "}
                          <span className="font-semibold text-foreground">{formData.email}</span>
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 bg-transparent" asChild>
                          <a href="/dashboard/bookings">View My Bookings</a>
                        </Button>
                        <Button className="flex-1" asChild>
                          <a href="/browse">Browse More Rooms</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Booking Summary Sidebar */}
              <div className="md:col-span-1">
                <Card className="border-2 border-border sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Room Details */}
                    <div>
                      <h4 className="font-semibold mb-2">{mockRoom.title}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          {mockRoom.location}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FaBed className="w-4 h-4" />
                            {mockRoom.beds} bed
                          </div>
                          <div className="flex items-center gap-1">
                            <FaBath className="w-4 h-4" />
                            {mockRoom.baths} bath
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="border-t border-border pt-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check-in</span>
                          <span className="font-medium">{checkIn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Check-out</span>
                          <span className="font-medium">{checkOut}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-border pt-4">
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly rate</span>
                          <span className="font-medium">{formatPrice(mockRoom.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Booking fee (5%)</span>
                          <span className="font-medium">${bookingFee}</span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border font-bold text-base">
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
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
