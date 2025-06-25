import Button from "@/app/_components/Button";

export default function Filters() {
  return (
    <div className="flex gap-4 p-3 py-2 rounded-xl bg-white mb-6">
      <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm">
        <option>Rent a Properties</option>
      </select>
      <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm">
        <option>Property Type</option>
      </select>
      <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm">
        <option>Location</option>
      </select>
      <Button className="bg-black text-white px-4 py-2 rounded-lg text-sm">Search</Button>
    </div>
  );
}