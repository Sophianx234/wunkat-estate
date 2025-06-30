'use client';

import Image from 'next/image';
import {
  Edit2,
  Trash2,
  MapPin,
  Mail,
  Phone,
  CreditCard,
} from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl  shadow-sm p-6 text-center">
          <div className='flex justify-center flex-col'>

          <div className='relative self-center  size-20'>

          <Image
            src="/images/prof-1.jpg"
            alt="Felicia"
            fill
            className="rounded-full mx-auto object-cover"
            />
            </div>
            </div>
          <h2 className="text-lg font-semibold mt-4">Felecia Burke</h2>
          <div className="bg-blue-100 text-blue-700 text-sm rounded-full px-4 py-1 inline-block mt-2 font-medium">
            Balance: $5,000
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              Hong Kong, China
            </p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              example@mail.com
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              +1 (070) 123-4567
            </p>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 relative">
          <SectionHeader title="Account Details" />
          <InfoGrid
            data={[
              ['First Name', 'Felecia'],
              ['Last Name', 'Burke'],
              ['Date of Birth', '10 June, 1990'],
              ['Gender', 'Female'],
            ]}
          />
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-6 relative">
          <SectionHeader title="Payment Methods" />
          <div className="rounded-xl overflow-hidden mb-4 relative">
            <Image
              src="/images/credit-card.png"
              alt="credit card"
              width={400}
              height={200}
              className="w-full rounded-xl"
            />
            <CreditCard className="absolute top-3 right-3 text-white w-6 h-6" />
          </div>
          <InfoGrid
            data={[
              ['Card Type', 'VISA'],
              ['Card Holder', 'Mark Anderson'],
              ['Expire', '12/31'],
              ['Card Number', '0123 4567 8910 1112'],
              ['Balance', '$1,000,000'],
            ]}
          />
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-sm p-6 relative lg:col-span-2">
          <SectionHeader title="Shipping Address" />
          <InfoGrid
            data={[
              ['Address', '898 Joanne Lane Street'],
              ['City', 'Boston'],
              ['Country', 'United States'],
              ['State', 'Massachusetts'],
              ['Zip Code', '02110'],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable header with edit/delete icons
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="flex gap-2">
        <Edit2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-600" />
        <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
      </div>
    </div>
  );
}

// Key-value display grid
function InfoGrid({ data }: { data: [string, string][] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
      {data.map(([label, value], idx) => (
        <div key={idx}>
          <p className="text-gray-400">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      ))}
    </div>
  );
}
