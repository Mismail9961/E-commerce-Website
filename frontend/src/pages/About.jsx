import React from 'react'
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* About Us Section */}
<section className="py-16 px-4 md:px-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl font-semibold text-gray-600 mb-8 flex items-center">
      ABOUT US
      <span className="ml-2 h-0.5 w-12 bg-gray-600"></span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="relative h-[500px] md:h-auto group">
        <img
          src={assets.about_img} // Replace with the actual image URL or local path
          alt="Clothing and accessories"
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Text Section */}
      <div className="flex flex-col justify-center h-auto md:h-[500px] p-6 duration-300">
        <p className="text-gray-600 mb-4 leading-relaxed">
          Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
        </p>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Since our inception, we’ve worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
        </p>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          Our mission at Forever is to empower customers with choice, convenience, and confidence. We’re dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
        </p>
      </div>
    </div>
  </div>
</section>
       {/* Why Choose Us Section */}
       <section className="py-16 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-600 mb-4 flex items-center">
            WHY CHOOSE US
            <span className="ml-2 h-0.5 w-12 bg-gray-600"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality Assurance Card */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">QUALITY ASSURANCE:</h3>
              <p className="text-gray-600">
                We meticulously select and vet each product to ensure it meets our stringent quality standards.
              </p>
            </div>
            {/* Convenience Card */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">CONVENIENCE:</h3>
              <p className="text-gray-600">
                With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
              </p>
            </div>
            {/* Exceptional Customer Service Card */}
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">EXCEPTIONAL CUSTOMER SERVICE:</h3>
              <p className="text-gray-600">
                Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Subscribe Section */}
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
  )
}

export default About