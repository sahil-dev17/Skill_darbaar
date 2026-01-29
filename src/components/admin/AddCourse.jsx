import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Modelbox from "./Modelbox";

const AddCourse = () => {
  const formRef = useRef(null);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    courseName: "",
    duration: "",
    fees: "",
    description: "",
    image: null,
    syllabus_pdf: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [courses, setCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  /* ================= AXIOS BASE URL (NO HARDCODE IP) ================= */
  const API_BASE =
    (axiosInstance?.defaults?.baseURL || "").replace(/\/$/, ""); // remove trailing /

  const getStorageUrl = (path) => {
    if (!path) return "";
    // if already full url, return directly
    if (/^https?:\/\//i.test(path)) return path;

    // else: baseURL + /storage + path
    return `${API_BASE}/storage/${encodeURI(path)}`;
  };

  /* ================= FETCH COURSES ================= */
  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses");
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

  /* ================= VALIDATION ================= */
  const isEmpty = (v) => !String(v ?? "").trim();

  const validateAll = (data = formData) => {
    const nextErrors = {};

    if (isEmpty(data.courseName)) nextErrors.courseName = "Field is Required";
    else if (String(data.courseName).length > 80)
      nextErrors.courseName = "Max 80 characters allowed";

    if (isEmpty(data.duration)) nextErrors.duration = "Field is Required";
    else if (String(data.duration).length > 25)
      nextErrors.duration = "Max 25 characters allowed";

    if (isEmpty(data.fees)) nextErrors.fees = "Field is Required";
    else {
      const n = Number(data.fees);
      if (Number.isNaN(n)) nextErrors.fees = "Fees must be a number";
      else if (n < 0) nextErrors.fees = "Fees cannot be negative";
      else if (n === 0) nextErrors.fees = "Fees must be greater than 0";
    }

    if (isEmpty(data.description)) nextErrors.description = "Field is Required";
    else if (String(data.description).trim().length < 20)
      nextErrors.description = "At least 20 characters required";

    if (!data.image) nextErrors.image = "Field is Required";
    else {
      const allowed = ["image/jpeg", "image/png", "image/webp"];
      if (!allowed.includes(data.image.type))
        nextErrors.image = "Only JPG / PNG / WEBP allowed";
      const max = 2 * 1024 * 1024;
      if (data.image.size > max) nextErrors.image = "Image must be under 2MB";
    }

    if (!data.syllabus_pdf) nextErrors.syllabus_pdf = "Fill this section";
    else {
      if (data.syllabus_pdf.type !== "application/pdf")
        nextErrors.syllabus_pdf = "Only PDF allowed";
      const max = 5 * 1024 * 1024;
      if (data.syllabus_pdf.size > max)
        nextErrors.syllabus_pdf = "PDF must be under 5MB";
    }

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

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setFormData((p) => ({ ...p, [name]: file }));

      if (name === "image") {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      }

      if (submitted)
        setTimeout(() => validateAll({ ...formData, [name]: file }), 0);
      return;
    }

    if (name === "courseName") {
      const v = value.slice(0, 80);
      setFormData((p) => ({ ...p, courseName: v }));
      if (submitted)
        setTimeout(() => validateAll({ ...formData, courseName: v }), 0);
      return;
    }

    if (name === "duration") {
      const v = value.slice(0, 25);
      setFormData((p) => ({ ...p, duration: v }));
      if (submitted)
        setTimeout(() => validateAll({ ...formData, duration: v }), 0);
      return;
    }

    if (name === "fees") {
      if (value === "") {
        setFormData((p) => ({ ...p, fees: "" }));
        if (submitted)
          setTimeout(() => validateAll({ ...formData, fees: "" }), 0);
        return;
      }
      const num = Number(value);
      const safe = Number.isNaN(num) ? "" : Math.max(0, num);
      setFormData((p) => ({ ...p, fees: String(safe) }));
      if (submitted)
        setTimeout(() => validateAll({ ...formData, fees: String(safe) }), 0);
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
    if (submitted)
      setTimeout(() => validateAll({ ...formData, [name]: value }), 0);
  };

  /* ================= ADD COURSE MODAL OPEN/CLOSE ================= */
  const openAddModal = () => {
    setShowForm(true);
    setSubmitted(false);
    setErrors({});
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const closeAddModal = () => {
    setShowForm(false);
    setSubmitted(false);
    setErrors({});
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && showForm) closeAddModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showForm]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  /* ================= ADD COURSE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const ok = validateAll();
    if (!ok) return;

    try {
      const data = new FormData();
      data.append("name", formData.courseName);
      data.append("duration", formData.duration);
      data.append("fees", formData.fees);
      data.append("description", formData.description);
      data.append("image", formData.image);
      data.append("syllabus_pdf", formData.syllabus_pdf);

      await axiosInstance.post("/admin/courses", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchCourses();

      setFormData({
        courseName: "",
        duration: "",
        fees: "",
        description: "",
        image: null,
        syllabus_pdf: null,
      });

      setErrors({});
      setSubmitted(false);

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);

      setSuccessMessage("Course added successfully ✅");
      setTimeout(() => setSuccessMessage(""), 3000);

      closeAddModal();
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axiosInstance.delete(`/admin/courses/${id}`);
      await fetchCourses();
      setDeleteMessage("Course deleted successfully 🗑️");
      setTimeout(() => setDeleteMessage(""), 3000);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (course) => {
    setEditCourse(course);
    setIsModalOpen(true);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (updated) => {
    if (!editCourse?.id) return;

    if (!updated.courseName || !updated.duration || !updated.fees || !updated.description) {
      alert("Please fill all required fields");
      return;
    }

    if (String(updated.courseName).length > 40) {
      alert("Course name max 40 characters");
      return;
    }
    if (String(updated.duration).length > 25) {
      alert("Duration max 25 characters");
      return;
    }
    if (Number(updated.fees) < 0) {
      alert("Fees cannot be negative");
      return;
    }

    try {
      const data = new FormData();
      data.append("_method", "PATCH");
      data.append("name", updated.courseName || "");
      data.append("duration", updated.duration || "");
      data.append("fees", updated.fees || "");
      data.append("description", updated.description || "");

      if (updated.image instanceof File) data.append("image", updated.image);
      if (updated.syllabus_pdf instanceof File) data.append("syllabus_pdf", updated.syllabus_pdf);

      await axiosInstance.post(`/admin/courses/${editCourse.id}`, data, {
        headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
      });

      await fetchCourses();
      setIsModalOpen(false);
      setEditCourse(null);

      setUpdateMessage("Course updated successfully ✨");
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* ✅ ADD COURSE MODAL OVERLAY */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeAddModal}
          />

          <div className="relative z-10 w-full max-w-3xl mx-4 bg-white rounded-xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Add Course</h2>

              <button
                onClick={closeAddModal}
                className="text-gray-600 hover:text-black text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {successMessage && (
              <div className="mb-4 text-center text-green-600 font-medium">
                {successMessage}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  placeholder="Course Name"
                  maxLength={80}
                  className={inputClass("courseName", "w-full border rounded px-4 py-2")}
                />
                <ErrorText name="courseName" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration"
                    maxLength={25}
                    className={inputClass("duration", "w-full border rounded px-4 py-2")}
                  />
                  <ErrorText name="duration" />
                </div>

                <div>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") e.preventDefault();
                    }}
                    placeholder="Fees"
                    className={inputClass("fees", "w-full border rounded px-4 py-2")}
                  />
                  <ErrorText name="fees" />
                </div>
              </div>

              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Course Description"
                  className={inputClass(
                    "description",
                    "w-full border rounded px-4 py-2 min-h-[100px]"
                  )}
                />
                <ErrorText name="description" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Course Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className={inputClass("image", "w-full border rounded px-3 py-2 bg-white")}
                />
                <ErrorText name="image" />

                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-28 h-28 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Syllabus PDF</label>
                <input
                  type="file"
                  name="syllabus_pdf"
                  accept="application/pdf"
                  onChange={handleChange}
                  className={inputClass("syllabus_pdf", "w-full border rounded px-3 py-2 bg-white")}
                />
                <ErrorText name="syllabus_pdf" />
              </div>

              <div className="text-right">
                <button className="bg-slate-700 text-white px-6 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= COURSES TABLE ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold">Courses</h2>

          <button onClick={openAddModal} className="bg-slate-700 text-white px-4 py-2 rounded">
            Add Course
          </button>
        </div>

        {updateMessage && (
          <div className="mb-3 text-center text-blue-600 font-medium">{updateMessage}</div>
        )}
        {deleteMessage && (
          <div className="mb-3 text-center text-red-600 font-medium">{deleteMessage}</div>
        )}

        <table className="w-full min-w-[900px] border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Syllabus PDF</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t align-top">
                <td className="p-3">
                  {course.image && (
                    <img
                      src={getStorageUrl(course.image)}
                      alt={course.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-3 font-medium">{course.name}</td>
                <td className="p-3">₹{course.fees}</td>
                <td className="p-3">{course.duration}</td>

                <td className="p-3 max-w-[250px]">
                  <p className="line-clamp-3 text-sm text-gray-700">
                    {course.description || "—"}
                  </p>
                </td>

                <td className="p-3">
                  {course.syllabus_pdf ? (
                    <a
                      href={getStorageUrl(course.syllabus_pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No PDF</span>
                  )}
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      <Modelbox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={editCourse}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default AddCourse;
