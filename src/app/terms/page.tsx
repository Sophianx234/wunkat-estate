"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function TermsAndConditions() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using WunkatHomes.  
            By accessing our services, you agree to these terms and conditions.
          </p>
        </motion.div>
      </section>

      {/* Terms Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-12 text-gray-700 leading-relaxed">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-16"
        >
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>WunkatHomes</strong>, a platform designed to simplify property
              bookings and management. By using our services, you acknowledge that you
              have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Eligibility
            </h2>
            <p>
              To use our services, you must be at least 18 years old or have the legal
              capacity to enter into a binding contract. By registering, you confirm that
              all information you provide is accurate and up to date.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials. WunkatHomes will not be liable for any loss or damage resulting
              from unauthorized use of your account.
            </p>
            <p className="mt-3">
              If we suspect fraudulent or abusive activity, we reserve the right to suspend
              or terminate your account without prior notice.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Bookings and Payments
            </h2>
            <p>
              When you book a property through WunkatHomes, you agree to pay all applicable
              fees and charges. Payments are securely processed through our trusted
              third-party payment partners.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>All payments are final unless otherwise stated.</li>
              <li>Cancellations may be subject to service or administrative fees.</li>
              <li>WunkatHomes is not liable for errors in user-entered payment details.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. User Responsibilities
            </h2>
            <p>
              As a user, you agree to use our platform ethically and lawfully. You must
              not:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Engage in fraudulent or misleading activity.</li>
              <li>Post, share, or upload inappropriate or illegal content.</li>
              <li>Interfere with or disrupt the operation of WunkatHomes.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Property Listings
            </h2>
            <p>
              All property details provided on WunkatHomes are supplied by the respective
              owners or managers. We do not guarantee the accuracy or completeness of such
              listings but strive to ensure reliability and transparency.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              WunkatHomes is not responsible for any direct or indirect damages arising
              from the use or inability to use our platform, including but not limited to
              data loss, service interruptions, or inaccurate listings.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Privacy & Data Protection
            </h2>
            <p>
              We value your privacy. All user data is handled in compliance with our{" "}
              <a href="/privacy-policy" className="text-primary font-medium hover:underline">
                Privacy Policy
              </a>
              . We never sell or share personal information without consent.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at
              any time if we believe you have violated these terms or engaged in
              misconduct.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Updates to These Terms
            </h2>
            <p>
              WunkatHomes may update these Terms & Conditions from time to time. Updates
              will be reflected on this page, and continued use of our services constitutes
              acceptance of the revised terms.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Contact Us
            </h2>
            <p>
              For any questions about these Terms & Conditions, please contact our support
              team at{" "}
              <a href="mailto:info@wunkathomes.com" className="text-primary font-medium hover:underline">
                info@wunkathomes.com
              </a>
              .
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
