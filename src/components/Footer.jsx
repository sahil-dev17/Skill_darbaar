import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok
} from "react-icons/fa";

import logo from "../assets/Images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-start ">
            <img
              src={logo}
              alt="Skill Darbar Logo"
              className="w-40 h-40 object-contain "
            />
          </div>

          <p className="text-lg leading-relaxed">
            Learn in-demand skills with expert-led courses and boost your career
            with practical knowledge.
          </p>

          <div className="flex gap-4 mt-2 text-xl">

            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61581912482367"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skill Darbar Facebook"
              >
                <FaFacebookF className="hover:text-yellow-400 cursor-pointer transition" />
              </a>

              <a
                href="https://www.instagram.com/skill_darbar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skill Darbar Instagram"
              >
                <FaInstagram className="hover:text-yellow-400 cursor-pointer transition" />
              </a>

              <a
                href="https://www.tiktok.com/@skill.darbar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skill Darbar TikTok"
              >
                <FaTiktok className="hover:text-yellow-400 cursor-pointer transition" />
              </a>
            </div>

          </div>
        </div>


        {/* COURSES */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Popular Courses
          </h3>
          <ul className="space-y-2 text-lg">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Graphic Designing
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Video Editing
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Web Development
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              App Development
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Meta Ads
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              More upcoming...
            </li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-lg">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              All Courses
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              Contact Us
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-lg">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Help Center
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Terms & Conditions
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-yellow-400 cursor-pointer transition">
              FAQs
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SkillDarbar. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
