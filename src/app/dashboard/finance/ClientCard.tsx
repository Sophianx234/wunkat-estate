import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Phone } from "lucide-react"
const clients = [
  { name: "Leif Floyd", role: "Art Director", image: "/avatars/1.jpg" },
  { name: "Rayford", role: "Lawyer", image: "/avatars/2.jpg" },
  { name: "Lavern", role: "Dentist", image: "/avatars/3.jpg" },
]
function ClientCard() {
  return (
    <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>New Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-2">
            {clients.map((client, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={client.image} />
                    <AvatarFallback>{client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.role}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost"><MessageSquare className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost"><Phone className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
            <Button className="w-full mt-3" variant="outline">See All Clients</Button>
          </ScrollArea>
        </CardContent>
      </Card>
  )
}

export default ClientCard
