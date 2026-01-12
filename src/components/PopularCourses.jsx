import React from "react";
import { useNavigate } from "react-router-dom";

// IMAGES
import graphicImg from "../assets/images/graphic.png";
import videoImg from "../assets/images/video01.png";
import appImg from "../assets/images/app.jpg";
import webImg from "../assets/images/web.jfif";
import metaImg from "../assets/images/meta.avif";

function PopularCourses() {
  const navigate = useNavigate();

  const courses = [
    {
      slug: "graphic-design",
      title: "Graphic Designing",
      img: graphicImg,
      duration: "3 Months",
      fees: "₹15,000",
    },
    {
      slug: "video-editing",
      title: "Video Editing",
      img: videoImg,
      duration: "2 Months",
      fees: "₹12,000",
    },
    {
      slug: "app-development",
      title: "App Development",
      img: appImg,
      duration: "6 Months",
      fees: "₹35,000",
    },
    {
      slug: "web-development",
      title: "Web Development",
      img: webImg,
      duration: "5 Months",
      fees: "₹30,000",
    },
    {
      slug: "meta-ads",
      title: "Meta Ads",
      img: metaImg,
      duration: "1 Month",
      fees: "₹8,000",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
          Popular Courses
        </h2>
        <div className="w-60 h-0.5 bg-[#ffb606] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {courses.map((course) => (
          <div
            key={course.slug}
            className="group rounded-xl overflow-hidden bg-white border border-black/20 shadow-md hover:-translate-y-2 transition"
          >
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-56 object-cover group-hover:scale-110 transition"
            />

            <div className="px-6 py-5">
              <h3 className="font-semibold text-xl">{course.title}</h3>

              <p className="mt-2 text-gray-600">
                <b>Duration:</b> {course.duration}
              </p>

              <p className="text-gray-600">
                <b>Fees:</b> {course.fees}
              </p>

              <button
                onClick={() => navigate(`/course/${course.slug}`)}
                className="mt-5 w-full border border-yellow-400 text-yellow-500 py-2.5 rounded-md hover:bg-yellow-400 hover:text-black transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {/* 🔔 UPCOMING COURSE CARD */}
        <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-dashed border-gray-400 flex items-center justify-center min-h-[420px] hover:-translate-y-2 transition">
          <div className="text-center px-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              More Courses
            </h3>
            <p className="text-gray-500 mb-4">
              New courses coming soon...
            </p>
            <button className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-300 hover:text-black transition">
              Stay Tuned
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PopularCourses;
