import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo01.png";

import {
  MdOutlinePostAdd,
  MdOutlineMail,
  MdDashboard,
  MdChevronLeft,
  MdChevronRight,
  MdPayments,
} from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
  },
  {
    name: "Courses",
    path: "/dashboard/add-course",
    icon: <MdOutlinePostAdd className="h-6 w-6" />,
  },
  {
    name: "Course-Enquiry",
    path: "/dashboard/enquiry",
    icon: <MdOutlineMail className="h-6 w-6" />,
  },
  {
    name: "Payment",
    path: "/dashboard/payment",
    icon: <MdPayments className="h-6 w-6" />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <IoSettingsSharp className="h-6 w-6" />,
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-black text-[#F0B100] px-3 py-1 rounded"
        onClick={() => setIsMobileOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#F0B100] text-black
          transition-all duration-300 z-40
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        {/* Desktop Toggle */}
        <button
          className="
            hidden md:flex absolute -right-3 top-6
            bg-black text-[#F0B100]
            rounded-full p-1 shadow-lg
          "
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MdChevronRight size={20} /> : <MdChevronLeft size={20} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Skill Darbar"
              className={`transition-all duration-300 ${
                collapsed ? "w-10" : "w-36"
              }`}
            />
          </Link>
        </div>

        {/* Menu */}
        <nav className="mt-2 px-2 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-lg px-3 py-2
                font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-black text-[#F0B100]"
                    : "text-black/80 hover:bg-black hover:text-[#F0B100]"
                }
              `
              }
            >
              {item.icon}
              {!collapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
