import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PhoneIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// import logo from "../assets/images/logo.png";
import logo from "../assets/images/logo.png"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-25">

        {/* Logo */}
        <div className="flex items-center gap-2">
         <Link to="/">
          <img
            src={logo}
            alt="Course Logo"
             className="w-40 h-50 object-contain"
          />
         </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-10 font-bold text-sm text-[#ffc107]">
          <Link to="/" className="hover:text-orange-500 transition">HOME</Link>
          <Link to="/about" className="hover:text-orange-500 transition">ABOUT US</Link>
          <Link to="/courses" className="hover:text-orange-500 transition">COURSES</Link>
          <Link to="/contact" className="hover:text-orange-500 transition">CONTACT</Link>
        </nav>

        {/* Desktop Contact */}
        <div className="hidden md:flex items-center gap-2 bg-yellow-500 text-black px-6 h-full font-semibold">
          <PhoneIcon className="w-5 h-5" />
          <span>+977-8704050656</span>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="w-8 h-8" />
          ) : (
            <Bars3Icon className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-[#ffc107] px-6 py-4 space-y-4 font-semibold">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">HOME</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">ABOUT US</Link>
          <Link to="/courses" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">COURSES</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:text-orange-500">CONTACT</Link>

          <div className="flex items-center gap-2 text-white pt-4 border-t border-gray-700">
            <PhoneIcon className="w-5 h-5" />
            <span>+977-8704050656</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
