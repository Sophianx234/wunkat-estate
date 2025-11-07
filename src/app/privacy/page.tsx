"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how WunkatHomes collects,
            uses, and protects your personal information when you use our platform.
          </p>
        </motion.div>
      </section>

      {/* Policy Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-12 text-gray-700 leading-relaxed">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-16"
        >
          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>WunkatHomes</strong>. We respect your privacy and are
              committed to protecting your personal data. This Privacy Policy outlines how
              we handle your information when you visit our website or use our services.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect information to provide better services to you. The types of
              information we may collect include:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li><strong>Personal details</strong> such as your name, email address, and contact number.</li>
              <li><strong>Account data</strong> like your login credentials and booking history.</li>
              <li><strong>Payment details</strong> processed securely via our payment partners.</li>
              <li><strong>Usage data</strong> such as your activity on our platform and device information.</li>
            </ul>
          </div>

          {/* 3. How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Process bookings and manage payments securely.</li>
              <li>Communicate with you regarding your reservations or account.</li>
              <li>Improve our website and services for a better experience.</li>
              <li>Comply with legal and regulatory requirements.</li>
            </ul>
          </div>

          {/* 4. Sharing of Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal data. However, we may share information with:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>
                <strong>Service providers</strong> who help us operate our platform (e.g., payment processors, hosting).
              </li>
              <li>
                <strong>Legal authorities</strong> if required by law or to protect our rights.
              </li>
            </ul>
          </div>

          {/* 5. Data Security */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Data Security
            </h2>
            <p>
              We implement strict security measures to protect your information from
              unauthorized access, alteration, disclosure, or destruction. However, no
              internet-based platform is 100% secure.
            </p>
          </div>

          {/* 6. Cookies and Tracking */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cookies & Tracking
            </h2>
            <p>
              WunkatHomes uses cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. You can adjust your browser settings to
              decline cookies, but some features may not function properly.
            </p>
          </div>

          {/* 7. Data Retention */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your personal information only as long as necessary to fulfill the
              purposes outlined in this policy, comply with legal obligations, or resolve
              disputes.
            </p>
          </div>

          {/* 8. Your Rights */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Access and update your personal information.</li>
              <li>Request deletion of your data (“right to be forgotten”).</li>
              <li>Withdraw consent for data processing at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{" "}
              <a href="mailto:info@wunkathomes.com" className="text-primary font-medium hover:underline">
                info@wunkathomes.com
              </a>
              .
            </p>
          </div>

          {/* 9. Third-Party Links */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. WunkatHomes is not
              responsible for the privacy practices or content of these external sites.
            </p>
          </div>

          {/* 10. Policy Updates */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our
              practices or for legal reasons. Any updates will be posted on this page with
              the effective date clearly stated.
            </p>
          </div>

          {/* 11. Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our team
              at{" "}
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
