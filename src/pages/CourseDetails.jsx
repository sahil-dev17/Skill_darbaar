import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get("/courses"); // public API
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data;

        const found = list.find((c) => c.slug === slug);
        setCourse(found || null);
      } catch (err) {
        console.error("Fetch course failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold text-gray-500">
        Loading course...
      </div>
    );
  }

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
          {course.image && (
            <img
              src={`http://192.168.1.13:8000/storage/${course.image}`}
              alt={course.name}
              className="w-full h-56 sm:h-72 md:h-[360px] object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <h2 className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {course.name}
          </h2>
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
                ₹{course.fees}
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

         
         {/* SYLLABUS PDF */}
{course.syllabus_pdf && (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-semibold mb-2">
      Syllabus PDF
    </h3>
    <a
      href={`http://192.168.1.13:8000/storage/${course.syllabus_pdf}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm sm:text-base hover:underline"
    >
      📄 Download Syllabus (PDF)
    </a>
  </div>
)}


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
