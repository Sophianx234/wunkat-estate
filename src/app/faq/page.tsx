"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

const faqs = [
  {
    question: "How does WunkatHomes ensure property quality?",
    answer:
      "All listed properties are verified by our inspection team to meet our standards of safety, cleanliness, and comfort. Each room is maintained regularly to ensure a pleasant stay.",
  },
  {
    question: "Can I schedule a visit before booking?",
    answer:
      "Yes! You can schedule a property viewing directly from the property page. Our team will confirm the appointment and ensure you have a guided experience.",
  },
  {
    question: "How secure are my payments?",
    answer:
      "Your payments are processed through Paystack, a trusted payment gateway with bank-level encryption. WunkatHomes never stores your card details.",
  },
  {
    question: "What if I have a complaint or issue?",
    answer:
      "We take feedback seriously. You can submit a complaint through our contact page — every submission is reviewed and addressed promptly by our support team.",
  },
  {
    question: "Do you offer property management services?",
    answer:
      "Absolutely. Our property management service handles tenant placement, rent collection, maintenance, and inspections — making ownership stress-free.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-[url('/faq-bg.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

          <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-28 text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow">
              Everything you need to know about booking, payments, and support
              with <span className="font-semibold">WunkatHomes</span>.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative bg-neutral-50 py-28">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16 px-6 lg:px-12">
            {/* Image Side */}
            <div className="relative group">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/c-2.jpg"
                  alt="Modern living space representing WunkatHomes comfort"
                  className="w-full h-[600px] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-10" />
            </div>

            {/* FAQ List Side */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight">
                Got Questions? <br /> We’ve Got Answers.
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center text-left px-6 py-5 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <FaQuestionCircle className="text-primary w-5 h-5" />
                        <CardTitle className="text-lg font-medium text-gray-900">
                          {faq.question}
                        </CardTitle>
                      </div>
                      <motion.div
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <CardContent className="px-6 pb-6 text-gray-600 border-t border-gray-200">
                            {faq.answer}
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
