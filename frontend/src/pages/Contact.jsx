import React from 'react';
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      {/* Contact Us Section */}
      <section className="py-16 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-600 mb-8 flex items-center">
            CONTACT US
            <span className="ml-2 h-0.5 w-12 bg-gray-600"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-auto group">
              <img
                src={assets.contact_img}
                alt="Laptop and accessories"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/400')} // Fallback image
              />
            </div>
            {/* Text Section */}
            <div className="flex flex-col justify-center h-auto md:h-[400px] p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Our Store</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                54709 Willms Station
                <br />
                Suite 350, Washington, USA
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Tel: (415) 555-0132
                <br />
                Email: admin@forever.com
              </p>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Careers at Forever</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Learn more about our teams and job openings.
              </p>
              <button className="self-start px-6 py-2 border border-gray-600 text-gray-800 rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-300">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 md:px-1">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe now & get 20% off</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-l-md px-4 py-2 w-64 focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;