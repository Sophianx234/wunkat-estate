"use client"

import { FaGooglePlay, FaApple } from "react-icons/fa"

export default function DownloadApp() {
  return (
    <section className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl md:text-5xl font-bold">Book your next room anytime, anywhere.</h2>
          <p className="text-gray-400">
            Download the WunkatHomes app to discover, book, and manage your stays easily on mobile.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              <FaGooglePlay /> Google Play
            </button>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              <FaApple /> App Store
            </button>
          </div>
        </div>
        <img
          src="/c-1.jpg"
          alt="WunkatHomes App"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />
      </div>
    </section>
  )
}
