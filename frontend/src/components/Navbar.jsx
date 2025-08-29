import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const context = useContext(ShopContext);
  const { setShowSearch, getCartCount, setToken, token } = context || {
    setShowSearch: () => {},
    getCartCount: () => 0,
    setToken: () => {},
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    navigate("/login");
  };

  const navLinkClass =
    "relative uppercase tracking-wider text-sm font-semibold transition-all duration-300 hover:text-black";

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6 md:px-12 font-medium">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} className="w-36" alt="Brand Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-10 text-gray-700">
          {[
            { to: "/", label: "Home" },
            { to: "/collection", label: "Collection" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? "text-black" : "text-gray-600"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  <span
                    className={`absolute left-0 bottom-[-4px] h-[2px] w-full bg-black transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer hover:opacity-70 transition"
            alt="Search"
          />

          {/* Profile Dropdown */}
          <div className="group relative">
            <img
              onClick={() => {
                if (!token) navigate("/login");
              }}
              className="w-5 cursor-pointer hover:opacity-70 transition"
              src={assets.profile_icon}
              alt="Profile"
            />
            {token && (
              <div className="group-hover:block hidden absolute right-0 mt-3 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <p className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Orders
                </p>
                <p
                  className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-5 min-w-5 hover:opacity-70 transition"
              alt="Cart"
            />
            {getCartCount() > 0 && (
              <span className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-bold">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden hover:opacity-70 transition"
            alt="Menu"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-500 ${
          visible ? "translate-x-0 w-72" : "translate-x-full w-72"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 cursor-pointer p-5 border-b"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p className="uppercase text-sm tracking-wide">Close</p>
          </div>
          <div className="flex flex-col gap-6 p-6 text-gray-700 font-semibold">
            <NavLink onClick={() => setVisible(false)} to="/">
              Home
            </NavLink>
            <NavLink onClick={() => setVisible(false)} to="/collection">
              Collection
            </NavLink>
            <NavLink onClick={() => setVisible(false)} to="/about">
              About
            </NavLink>
            <NavLink onClick={() => setVisible(false)} to="/contact">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
