import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function PopularCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses");
      const list = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];
      setCourses(list);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
            key={course.id}
            className="group rounded-xl overflow-hidden bg-white border border-black/20 shadow-md hover:-translate-y-2 transition"
          >
            {course.image ? (
              <img
                src={`http://192.168.1.13:8000/storage/${course.image}`}
                alt={course.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition"
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            <div className="px-6 py-5">
              <h3 className="font-semibold text-xl">{course.name}</h3>

              <p className="mt-2 text-gray-600">
                <b>Duration:</b> {course.duration}
              </p>

              <p className="text-gray-600">
                <b>Fees:</b> ₹{course.fees}
              </p>

              <button
                onClick={() => navigate(`/course/${course.slug || course.id}`)}
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
