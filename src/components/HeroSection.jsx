import React, { useEffect, useState } from "react";

// Slider Images
import img2 from "../assets/images/slider02.png";
import img3 from "../assets/images/slider03.png";
import HomeAbout from "./HomeAbout";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const images = [img2, img3];

  const heroContent = [
    {
      lines: [
        "Learn Skills",
        "That Get You Hired",
        "Build Your Future Today",
      ],
    },
    {
      lines: [
        "Upgrade Your Skills",
        "Upgrade Your Career",
        "Learn From Industry Experts",
      ],
    },
    {
      lines: [
        "Master In-Demand Skills",
        "Online & Offline Training",
        "Start Your Success Journey",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <section className="relative w-full h-[95vh] overflow-hidden">
        {/* SLIDER IMAGES */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Hero Slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* TEXT CONTENT */}
        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-24 z-10">
          <div className="text-left max-w-2xl">
            {heroContent[current].lines.map((line, index) => (
              <h1
                key={index}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                {line}
              </h1>
            ))}

            {/* SUB TEXT */}
            

            {/* CTA BUTTON */}
          <Link to="/courses">
  <button className="mt-8 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
    Explore Courses
  </button>
</Link>
          </div>
        </div>
      </section>

      <HomeAbout />
    </>
  );
};

export default HeroSection;
