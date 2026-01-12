import React from "react";
import contactImg from "../assets/images/contact.png";

const Contact = () => {
  return (
    <>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* RIGHT SIDE - IMAGE (TOP ON MOBILE) */}
          <div className="flex justify-center order-1 md:order-2">
            <img
              src={contactImg}
              alt="Contact"
              className="w-full max-w-md rounded-lg shadow-lg
              transform transition duration-500 hover:scale-105"
            />
          </div>

          {/* LEFT SIDE - FORM (BOTTOM ON MOBILE) */}
          <div className="order-2 md:order-1">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h2>

            <form className="space-y-5">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                rows="4"
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
              >
                Submit
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
