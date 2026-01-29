import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const EnquiryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH COURSE ID ================= */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get("/admin/courses");
        const list = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data;

        const found = list.find((c) => c.slug === slug);
        if (!found) throw new Error("Course not found");

        setCourseId(found.id);
      } catch (err) {
        console.error(err);
        setError("Invalid course");
      }
    };

    fetchCourse();
  }, [slug]);

  /* ================= VALIDATION (LIKE AddCourse) ================= */
  const isEmpty = (v) => !String(v ?? "").trim();

  const validateAll = (data = formData) => {
    const nextErrors = {};

    if (isEmpty(data.name)) nextErrors.name = "Field is Required";
    if (isEmpty(data.phone)) nextErrors.phone = "Field is Required";
    if (isEmpty(data.email)) nextErrors.email = "Field is Required";
    if (isEmpty(data.date)) nextErrors.date = "Field is Required";
    if (isEmpty(data.message)) nextErrors.message = "Field is Required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const inputClass = (name, base) =>
    `${base} ${
      submitted && errors[name]
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-300"
    }`;

  const ErrorText = ({ name }) =>
    submitted && errors[name] ? (
      <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
    ) : null;

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // phone: digits only
    if (name === "phone") {
      const v = value.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, phone: v }));
      if (submitted)
        setTimeout(() => validateAll({ ...formData, phone: v }), 0);
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
    if (submitted)
      setTimeout(() => validateAll({ ...formData, [name]: value }), 0);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    const ok = validateAll();
    if (!ok || !courseId) return;

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        `/courses/${courseId}/enquiry`,
        formData
      );

      if (!res.data?.success) throw new Error("Submission failed");

      navigate(`/qr/${slug}`);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2">
          Course Enquiry
        </h2>

        <p className="text-center text-gray-500 mb-6 capitalize">
          Enquiry for: <b>{slug.replace("-", " ")}</b>
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass(
                "name",
                "w-full border rounded-lg px-4 py-2"
              )}
            />
            <ErrorText name="name" />
          </div>

          {/* PHONE */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass(
                "phone",
                "w-full border rounded-lg px-4 py-2"
              )}
            />
            <ErrorText name="phone" />
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass(
                "email",
                "w-full border rounded-lg px-4 py-2"
              )}
            />
            <ErrorText name="email" />
          </div>

          {/* DATE */}
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClass(
                "date",
                "w-full border rounded-lg px-4 py-2"
              )}
            />
            <ErrorText name="date" />
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={inputClass(
                "message",
                "w-full border rounded-lg px-4 py-2"
              )}
            />
            <ErrorText name="message" />
          </div>

          <button
            type="submit"
            disabled={loading || !courseId}
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPage;
