import {Landmark,
  Banknote,
  Map,
  Building,
  Users2,
  PencilRuler,
  MountainSnow,
} from "lucide-react";

const trustedItems = [
  {
    icon: <Landmark className="stroke-white" size={45} />,
    label: "Real Estate Developers",
  },
  {
    icon: <Banknote className="stroke-white" size={52} />,
    label: "Property Investors",
  },
  {
    icon: <Map className="stroke-white" size={52} />,
    label: "Landowners",
  },
  {
    icon: <Building className="stroke-white" size={52} />,
    label: "Real Estate Agencies",
  },
  {
    icon: <Users2 className="stroke-white" size={52} />,
    label: "Homebuyers",
  },
  {
    icon: <PencilRuler className="stroke-white" size={52} />,
    label: "Architects & Engineers",
  },
  {
    icon: <MountainSnow className="stroke-white" size={52} />,
    label: "Land Surveyors",
  },
];

function TrustedBy() {
  return (
    <section className="bg-black text-white py-20 pb-12 mb-32 px-6 sm:mx-10 mx-4 rounded-3xl">
      <h2 className="text-2xl font-semibold text-center mb-12">
        Trusted By 
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-8 max-w-6xl mx-auto">
        {trustedItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2   p-6 rounded-xl  transition"
          >
            <div className="text-white">{item.icon}</div>
            <p className="text-sm text-gray-300 leading-4 font-karla  text-center">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustedBy;

