"use client";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600">
          Making house hunting in Bangladesh simple, fast, and trustworthy.
        </p>
      </section>

      {/* Mission & Vision */}
      <motion.section
        className="grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-600">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To connect tenants and landlords across Bangladesh through a
            reliable and transparent platform. We aim to reduce the hassle of
            finding flats, houses, or sublets by making everything accessible in
            one place.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-600">Our Vision</h2>
          <p className="text-gray-600">
            To become the most trusted to-let platform in Bangladesh, helping
            people find their ideal homes and enabling landlords to reach the
            right tenants quickly and safely.
          </p>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-6 rounded-xl text-center shadow-sm">
            <h3 className="font-semibold text-lg text-indigo-700">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Post, search, and communicate with flat owner with just a few
              clicks.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl text-center shadow-sm">
            <h3 className="font-semibold text-lg text-indigo-700">
              Verified Listings
            </h3>
            <p className="text-gray-600">
              We ensure listings are real and updated to save you time.
            </p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl text-center shadow-sm">
            <h3 className="font-semibold text-lg text-indigo-700">
              Trusted Platform
            </h3>
            <p className="text-gray-600">
              A community-driven marketplace where trust comes first.
            </p>
          </div>
        </div>
      </section>

      {/* Team / Contact */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-semibold">Meet the Team</h2>
        <p className="text-gray-600">
          We’re a small, passionate team dedicated to solving housing problems
          in Bangladesh.
        </p>
        {/* You can add team cards here */}
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white p-10 rounded-2xl text-center space-y-4 shadow-lg">
        <h2 className="text-2xl font-semibold">Looking for a flat?</h2>
        <p>Join our platform today and find your dream home with ease.</p>
        <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
