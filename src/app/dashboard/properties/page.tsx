'use client'
import { FaPlus } from "react-icons/fa";
import Button from "../../_components/Button";
import Filters from "../_components/Filters";
import PropertyCard from "../_components/PropertyCard";
import AddProperty from "../_components/AddProperty";
import { useAppStore } from "@/lib/store";
import ExpandedProperty from "../_components/ExpandedProperty";

const mockProperties = [
  {
    id: 1,
    name: "St. George Bayfront",
    location: "Washington Heights, Manhattan",
    beds: 3,
    baths: 2,
    size: "2400 sqft",
    price: "$4,000",
    image: "/images/img-2.jpg",
  },
  {
    id: 2,
    name: "SoHo Lofts",
    location: "SoHo, Manhattan",
    beds: 4,
    baths: 3,
    size: "3650 sqft",
    price: "$5,200",
    image: "/images/img-1.jpg",
  },
];

export default function Dashboard() {
  const { openAddProperty,toggleAddProperty,openExpandedProperty} = useAppStore();
  return (
    <main className="flex-1 grid-cols-1 mt-8 px-8 py-6 pt-32 sm:pt-6  relative ">
      <div className="flex justify-between  items-center mb-6">
        <h2 className="text-xl font-semibold">Properties</h2>
        <Button onClick={toggleAddProperty} className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <FaPlus /> Add Property
        </Button>
      </div>
        { openAddProperty && <AddProperty/>}
      <Filters />
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProperties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
{openExpandedProperty&&<ExpandedProperty/>}

    </main>
  );
}
