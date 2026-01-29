import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = async () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;

    try {
      // If backend has logout API (recommended)
      await axiosInstance.post("/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage / auth data
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      // Redirect to admin login
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Icon Button (always visible) */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="
          h-10 w-10 rounded-full
          bg-gray-900 text-white
          flex items-center justify-center
          hover:bg-gray-800 transition
          shadow-sm
        "
        aria-label="Account menu"
        aria-expanded={open}
      >
        {/* Simple user icon (SVG) */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="opacity-95"
        >
          <path
            d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M20 22a8 8 0 0 0-16 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Dropdown / Expand Panel */}
      <div
        className={`
          absolute right-0 mt-3 w-44
          origin-top-right
          rounded-2xl bg-white shadow-lg border
          overflow-hidden
          transition-all duration-200 ease-out
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
        `}
      >
        <div className="px-4 py-3 border-b bg-gray-50">
          <p className="text-sm font-semibold text-gray-900">Admin</p>
          <p className="text-xs text-gray-500">Account menu</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full text-left px-4 py-3
            text-sm font-semibold
            text-red-700 hover:bg-red-50
            transition
            flex items-center gap-2
          "
        >
          {/* Logout icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 7V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 12H3m0 0 3-3m-3 3 3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
