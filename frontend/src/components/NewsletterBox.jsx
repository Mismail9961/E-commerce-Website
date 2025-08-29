import React from "react";
import { motion } from "framer-motion";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white py-20 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-gray-900">
          Subscribe & Enjoy 20% Off
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light">
          Join our exclusive newsletter for early access to new collections,
          curated style inspiration, and special member-only offers.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:flex-1 border-b border-gray-400 bg-transparent px-2 py-3 text-sm outline-none focus:border-black transition-all"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition-all"
          >
            SUBSCRIBE
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default NewsletterBox;
