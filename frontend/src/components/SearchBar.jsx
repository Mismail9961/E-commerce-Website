// SearchBar.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b border-gray-200 bg-gray-50 text-center py-4">
      <div className="inline-flex items-center justify-center border border-gray-300 py-2 px-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 outline-none bg-transparent text-sm text-gray-700"
        />
        <img className="w-5" src={assets.search_icon} alt="Search" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer ml-2"
        src={assets.cross_icon}
        alt="Close"
      />
    </div>
  ) : null; // Return null when showSearch is false
};

export default SearchBar;