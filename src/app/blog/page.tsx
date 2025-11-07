"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogComingSoon() {
  return (
    <>
      <Header />

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Background Image */}
        <Image
          src="/images/blog-bg.jpg" // 🔹 Replace with your own banner image
          alt="Blog Coming Soon Background"
          fill
          className="object-cover object-center opacity-70"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 max-w-3xl px-6 text-center"
        >
          {/* Subheading */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="uppercase tracking-[4px] text-sm text-primary font-medium"
          >
            WunkatHomes Blog
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight font-serif"
          >
            Our Blog Is Coming Soon
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed"
          >
            Insightful stories, expert advice, and guides on modern rentals, interior design,
            and home living — curated by the WunkatHomes team. Stay tuned.
          </motion.p>

          {/* Email Notify Form */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Input
              type="email"
              placeholder="Enter your email to get updates"
              className="w-full sm:w-80 bg-white/10 border border-white/20 placeholder-gray-400 text-gray-100 focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent rounded-full px-5 py-3 backdrop-blur-md"
            />
            <Button
              type="submit"
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 py-3 font-semibold transition-all duration-300 hover:scale-105"
            >
              Notify Me
            </Button>
          </motion.form>

          {/* Divider Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mx-auto mt-12 w-24 h-[2px] bg-primary/70"
          />

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 text-sm text-gray-400 tracking-wide"
          >
            © {new Date().getFullYear()} WunkatHomes. All rights reserved.
          </motion.p>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
