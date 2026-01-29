import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import LogoutButton from "../components/admin/LogoutButton";
import { Outlet, useLocation } from "react-router-dom";
import DashboardCard from "../components/admin/DashboardCard";
import FooterAdmin from "../components/admin/FooterAdmin";

const Dashboard = () => {
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

  // ✅ track sidebar toggle here
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ pass toggle to sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <main
        className={`
          p-6 overflow-y-auto pb-20
          transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {/* Top Bar */}
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>

        {isDashboardHome ? <DashboardCard /> : <Outlet />}
      </main>

      {/* Footer full width */}
      <FooterAdmin />
    </div>
  );
};

export default Dashboard;
