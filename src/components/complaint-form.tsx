"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";

export default function ComplaintForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        alert(data.error || "Failed to submit complaint.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-100 via-white to-gray-100 overflow-hidden">
      {/* Left Image Section */}
      <div className="relative md:w-1/2 h-64 md:h-auto">
        <Image
          src="/c-2.jpg"
          alt="Complaint Art"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>
        <div className="absolute bottom-8 left-8 text-white md:left-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">We’re Listening</h2>
          <p className="text-gray-200 max-w-sm">
            Your voice matters. Tell us your concern and we’ll make it right.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white shadow-xl z-10">
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6 animate-fadeIn"
          >
            <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">
              Submit a Complaint
            </h3>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Your Complaint
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
                placeholder="Describe your complaint..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin text-white" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Submit
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4 animate-fadeIn">
            <h3 className="text-3xl font-bold text-gray-800">Thank You!</h3>
            <p className="text-gray-600">
              Your complaint has been received. We’ll get back to you soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
