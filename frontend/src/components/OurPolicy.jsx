import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    desc: "Hassle-free and smooth product exchange.",
  },
  {
    icon: assets.quality_icon,
    title: "7 Day Return Policy",
    desc: "Return within 7 days, no questions asked.",
  },
  {
    icon: assets.support_img,
    title: "Premium Customer Support",
    desc: "Dedicated 24/7 support for our customers.",
  },
];

const OurPolicy = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center px-6">
        {policies.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="space-y-4"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-lg md:text-xl font-serif tracking-wide">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
