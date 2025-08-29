import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative flex flex-col sm:flex-row min-h-[90vh] bg-white">
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-8 lg:px-16 py-16 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#111] space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-[1px] bg-[#111]"></span>
            <p className="tracking-widest text-sm font-light text-gray-600">
              NEW ARRIVALS
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif leading-tight tracking-wide">
            Elegance Redefined
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
            Discover our curated collection of timeless pieces crafted with
            precision and sophistication. Luxury that speaks for itself.
          </p>

          <div className="flex items-center gap-3 pt-4">
            <a
              href="#shop"
              className="relative font-medium tracking-wide group"
            >
              <span className="text-sm md:text-base">SHOP NOW</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full sm:w-1/2 h-[60vh] sm:h-auto"
      >
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Luxury collection"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
