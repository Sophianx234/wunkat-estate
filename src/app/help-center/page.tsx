"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ComplaintForm from "@/components/complaint-form";
import Link from "next/link";

export default function HelpCenterPage() {
  return (
    <>
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about booking, payments, and using WunkatHomes — 
              or reach out directly to our support team.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex justify-center items-center max-w-lg mx-auto mb-20 relative"
          >
            <FaSearch className="absolute left-4 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for help topics..."
              className="pl-12 pr-4 py-6 rounded-lg border-gray-300 focus-visible:ring-primary"
            />
            <Button className="ml-3 px-6 bg-primary hover:bg-primary/90 text-white">
              Search
            </Button>
          </motion.div>
        </div>

        {/* FAQ Accordion Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Booking Support */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Booking Support
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="booking1">
                  <AccordionTrigger>How do I book a room?</AccordionTrigger>
                  <AccordionContent>
                    Browse listings, select your preferred stay, and complete your booking securely on WunkatHomes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="booking2">
                  <AccordionTrigger>Can I modify or cancel my booking?</AccordionTrigger>
                  <AccordionContent>
                    Yes. You can modify or cancel your booking anytime before your stay begins through your dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="booking3">
                  <AccordionTrigger>Do bookings auto-renew?</AccordionTrigger>
                  <AccordionContent>
                    You’ll receive reminders when your stay period is ending, so you can renew or extend manually.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Payment & Billing */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment & Billing
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="pay1">
                  <AccordionTrigger>What payment methods are supported?</AccordionTrigger>
                  <AccordionContent>
                    WunkatHomes supports major debit and credit cards through secure Paystack and Stripe integration.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pay2">
                  <AccordionTrigger>Is my payment information safe?</AccordionTrigger>
                  <AccordionContent>
                    Yes. All transactions are encrypted and securely handled by our trusted payment partners.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pay3">
                  <AccordionTrigger>Will I be charged hidden fees?</AccordionTrigger>
                  <AccordionContent>
                    Never. WunkatHomes is transparent — what you see is exactly what you pay.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Account & Security */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Account & Security
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="account1">
                  <AccordionTrigger>Do I need an account to book?</AccordionTrigger>
                  <AccordionContent>
                    Yes, an account allows you to track bookings, payments, and manage renewals securely.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="account2">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    Go to your profile settings and click “Reset Password.” You’ll receive an email to update it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="account3">
                  <AccordionTrigger>How does WunkatHomes protect my data?</AccordionTrigger>
                  <AccordionContent>
                    We follow strict data protection and never share your information with third parties.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* General Inquiries */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                General Inquiries
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="general1">
                  <AccordionTrigger>How do I contact support?</AccordionTrigger>
                  <AccordionContent>
                    You can reach us anytime at{" "}
                    <Link href="mailto:info@wunkathomes.com" className="text-primary hover:underline">
                      info@wunkathomes.com
                    </Link>
                    . We typically respond within 24 hours.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="general2">
                  <AccordionTrigger>Where is WunkatHomes based?</AccordionTrigger>
                  <AccordionContent>
                    WunkatHomes is proudly based in Ghana, serving customers nationwide.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="general3">
                  <AccordionTrigger>Do you offer partnerships?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we collaborate with service partners. Reach out through our contact page to get started.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </motion.div>

        {/* Still need help? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-24"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Still need help?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Our support team is always ready to assist you with your booking or account questions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition"
          >
            Contact Support
          </Link>
        </motion.div>
      </section>

      {/* Complaint Form Section */}
      <div className="bg-gray-900">
        <ComplaintForm />
      </div>

      <Footer />
    </>
  );
}
