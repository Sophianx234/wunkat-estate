import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
const soldProperties = [
  { name: "7529 E. Pecan St.", date: "04/05/22", price: "$590K", status: "Paid" },
  { name: "3605 Parker Rd.", date: "09/05/22", price: "$280K", status: "Paid" },
  { name: "3890 Poplar Dr.", date: "13/05/22", price: "$390K", status: "Pending" },
  { name: "8080 Railroad St.", date: "13/05/22", price: "$150K", status: "Paid" },
  { name: "8558 Green Rd.", date: "13/05/22", price: "$370K", status: "Paid" },
  { name: "775 Rolling Green Rd.", date: "21/05/22", price: "$1.80M", status: "Pending" },
]
function SoldAnalytics() {
  return (
   <Card className="lg:col-span-8">
        <CardHeader>
          <CardTitle>Sold Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Property Name</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {soldProperties.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
  )
}

export default SoldAnalytics
