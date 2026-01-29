import React, { useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ show validation only after clicking Update
  const [touched, setTouched] = useState(false);

  const [show, setShow] = useState({
    old: false,
    next: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" }); // success | error

  const errors = useMemo(() => {
    const e = {};

    if (!form.oldPassword) e.oldPassword = "Old password is required";

    if (!form.newPassword) e.newPassword = "New password is required";
    else if (form.newPassword.length < 8)
      e.newPassword = "Password should be at least 8 characters";

    if (!form.confirmPassword)
      e.confirmPassword = "Confirm password is required";
    else if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (
      form.oldPassword &&
      form.newPassword &&
      form.oldPassword === form.newPassword
    ) {
      e.newPassword = "New password must be different from old password";
    }

    return e;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg({ type: "", text: "" });
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShow({ old: false, next: false, confirm: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setMsg({ type: "", text: "" });

    if (Object.keys(errors).length > 0) {
      setMsg({ type: "error", text: "Please fill the highlighted fields." });
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/admin/change-password", {
        old_password: form.oldPassword,
        new_password: form.newPassword,
        new_password_confirmation: form.confirmPassword,
      });

      const successText = res?.data?.message || "Password updated successfully.";
      setMsg({ type: "success", text: successText });

      // ✅ clear form and hide validation
      resetForm();
      setTouched(false);

      // ✅ recommended: clear token/admin and redirect to login
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      // ✅ redirect after 1s so user sees success msg
      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1000);
    } catch (err) {
      console.error(err?.response || err);

      const apiMsg =
        err?.response?.data?.message ||
        (err?.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()?.[0]
          : null) ||
        "Failed to update password. Please try again.";

      setMsg({ type: "error", text: apiMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            <h1 className="text-2xl md:text-3xl font-semibold">Settings</h1>
            <p className="text-sm text-gray-200 mt-1">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Change Password
              </h2>

              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border">
                Security
              </span>
            </div>

            {/* Alert */}
            {msg.text && (
              <div
                className={`mb-5 rounded-xl border p-4 text-sm ${
                  msg.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {msg.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Old Password
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 focus-within:ring-2 ${
                    touched && errors.oldPassword
                      ? "border-red-300 focus-within:ring-red-200"
                      : "border-gray-200 focus-within:ring-gray-200"
                  }`}
                >
                  <input
                    type={show.old ? "text" : "password"}
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter your old password"
                    className="w-full outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((p) => ({ ...p, old: !p.old }))}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    {show.old ? "Hide" : "Show"}
                  </button>
                </div>

                {touched && errors.oldPassword && (
                  <p className="text-xs text-red-600 mt-1">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  New Password
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 focus-within:ring-2 ${
                    touched && errors.newPassword
                      ? "border-red-300 focus-within:ring-red-200"
                      : "border-gray-200 focus-within:ring-gray-200"
                  }`}
                >
                  <input
                    type={show.next ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((p) => ({ ...p, next: !p.next }))}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    {show.next ? "Hide" : "Show"}
                  </button>
                </div>

                {touched && errors.newPassword && (
                  <p className="text-xs text-red-600 mt-1">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Confirm Password
                </label>
                <div
                  className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 focus-within:ring-2 ${
                    touched && errors.confirmPassword
                      ? "border-red-300 focus-within:ring-red-200"
                      : "border-gray-200 focus-within:ring-gray-200"
                  }`}
                >
                  <input
                    type={show.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter new password"
                    className="w-full outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShow((p) => ({ ...p, confirm: !p.confirm }))
                    }
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    {show.confirm ? "Hide" : "Show"}
                  </button>
                </div>

                {touched && errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`rounded-xl px-5 py-3 font-semibold text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Tip: Use a strong password with letters, numbers, and symbols.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
