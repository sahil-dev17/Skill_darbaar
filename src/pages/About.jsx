import React from "react";
// import aboutImg from "../assets/Images/about.png";
import aboutImg from "../assets/images/about.png"



const About = () => {
  return (
    <>
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* IMAGE (TOP ON MOBILE) */}
          <div className="flex justify-center order-1 md:order-2">
            <img
              src={aboutImg}
              alt="About Skill Darbar"
              className="
                w-full max-w-md rounded-lg shadow-lg
                transform transition-all duration-500 ease-in-out
                hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
              "
            />
          </div>

          {/* TEXT (BOTTOM ON MOBILE) */}
          <div className="order-2 md:order-1">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              About Skill Darbar
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4 text-xl">
              Skill Darbar is a skill-based e-learning platform focused on
              practical and career-oriented education.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4 text-xl">
              We help learners gain real-world skills through simple, hands-on
              courses in design, development, and digital marketing.
            </p>

            <p className="text-gray-600 leading-relaxed text-xl">
              Our goal is to empower individuals to grow, earn, and succeed
              through skills.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;
