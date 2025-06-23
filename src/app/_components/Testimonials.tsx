import { Star, Users } from "lucide-react"
import TestimonialCard from "./TestimonialCard"

function Testimonials() {
  return (
    <section className="sm:px-12 bg-gray-50   pb-32 pl-6 sm:pl-8  sm:pt-44 pt-32">
      <div className="flex sm:flex-row flex-col justify-between pr-24">

      <h1 className="section-title-secondary ">What our customers are <br className="hidden sm:block" /> saying about us?</h1>

       <div className="flex items-center space-x-8 mt-4 md:mt-0 text-gray-700 text-sm">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="font-bold text-xl text-black">1.2M+</p>
            <p className="text-xs text-gray-500">Active Users</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
          <div>
            <p className="font-bold text-xl text-black">4.8</p>
            <p className="text-xs text-gray-500">Average Rating</p>
          </div>
        </div>
        </div>
      </div>
    <div className="sm:flex grid grid-cols-2 sm:gap-6 gap-3 sm:justify-center  mr-2 sm:mx-0 pt-14">
      <TestimonialCard/>
      <TestimonialCard/>
      <TestimonialCard/>
      <div className=" sm:hidden">
      <TestimonialCard/>
      </div>

    </div>

      
    </section>
  )
}

export default Testimonials
