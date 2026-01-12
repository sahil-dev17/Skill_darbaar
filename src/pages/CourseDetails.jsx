import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// IMAGES
import graphicImg from "../assets/Images/graphic.png";
import videoImg from "../assets/Images/video01.png";
import appImg from "../assets/Images/app.jpg";
import webImg from "../assets/Images/web.jfif";
import metaImg from "../assets/Images/meta.avif";


const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();


  const courseData = [
    {
      slug: "graphic-design",
      title: "Graphic Designing",
      img: graphicImg,
      duration: "3 Months",
      fees: "₹15,000",
      description:
        "Learn professional graphic design using Photoshop, Illustrator and real client projects.",
      syllabus: "/syllabus/graphic-design.pdf",
    },
    {
      slug: "video-editing",
      title: "Video Editing",
      img: videoImg,
      duration: "2 Months",
      fees: "₹12,000",
      description:
        "Master video editing with Premiere Pro, After Effects and motion graphics.",
      syllabus: "/syllabus/video-editing.pdf",
    },
    {
      slug: "app-development",
      title: "App Development",
      img: appImg,
      duration: "6 Months",
      fees: "₹35,000",
      description:
        "Build Android & iOS apps with real-time APIs and backend integration.",
      syllabus: "/syllabus/app-development.pdf",
    },
    {
      slug: "web-development",
      title: "Web Development",
      img: webImg,
      duration: "5 Months",
      fees: "₹30,000",
      description:
        "Full stack web development using HTML, CSS, JavaScript & React.",
      syllabus: "/syllabus/web-development.pdf",
    },
    {
      slug: "meta-ads",
      title: "Meta Ads",
      img: metaImg,
      duration: "1 Month",
      fees: "₹8,000",
      description:
        "Run profitable Facebook & Instagram ad campaigns with live practice.",
      syllabus: "/syllabus/meta-ads.pdf",
    },
  ];

  const course = courseData.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-600">
        Course Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* HERO IMAGE */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
          <img
            src={course.img}
            alt={course.title}
            className="w-full h-56 sm:h-72 md:h-[360px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {course.title}
          </h1>
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md mt-6 sm:mt-8 p-4 sm:p-6 md:p-8">

          {/* INFO BOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div className="border rounded-lg sm:rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">Duration</p>
              <p className="text-lg sm:text-xl font-semibold">
                {course.duration}
              </p>
            </div>

            <div className="border rounded-lg sm:rounded-xl p-4 text-center">
              <p className="text-gray-500 text-sm">Course Fees</p>
              <p className="text-lg sm:text-xl font-semibold text-green-600">
                {course.fees}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Course Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {course.description}
            </p>
          </div>

          {/* SYLLABUS */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Syllabus
            </h3>
            <a
              href={course.syllabus}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm sm:text-base hover:underline"
            >
              📄 Download Syllabus (PDF)
            </a>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/enquiry/${course.slug}`)}
            className="w-full bg-yellow-400 text-black py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-yellow-500 transition"
          >
            Enquiry Now
          </button>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
