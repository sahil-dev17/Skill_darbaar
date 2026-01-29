import React, { useEffect, useState } from "react";
import { FaBookOpen, FaEnvelopeOpenText, FaMoneyBillWave } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const DashboardCard = () => {
  const [data, setData] = useState({
    totalCourses: 0,
    totalEnquiries: 0,
    totalPayment: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH DASHBOARD DATA ================= */
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [coursesRes, enquiriesRes, paymentsRes] = await Promise.all([
        axiosInstance.get("/admin/courses"),
        axiosInstance.get("/admin/enquiries"),
        axiosInstance.get("/admin/payments"),
      ]);

      const coursesList =
        Array.isArray(coursesRes.data) ? coursesRes.data : coursesRes.data?.data || [];

      const enquiriesList =
        Array.isArray(enquiriesRes.data) ? enquiriesRes.data : enquiriesRes.data?.data || [];

      const paymentsList =
        Array.isArray(paymentsRes.data) ? paymentsRes.data : paymentsRes.data?.data || [];

      /* ✅ SUM ONLY APPROVED PAYMENTS */
      const totalPaymentAmount = paymentsList
        .filter((p) => p.status === "approved")
        .reduce(
          (sum, p) => sum + Number(p.course?.fees || 0),
          0
        );

      setData({
        totalCourses: coursesList.length,
        totalEnquiries: enquiriesList.length,
        totalPayment: totalPaymentAmount,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* ================= CARDS CONFIG ================= */
  const cards = [
    {
      title: "Total Courses",
      value: loading ? "..." : data.totalCourses || "-",
      icon: <FaBookOpen />,
      bg: "bg-blue-500",
    },
    {
      title: "Total Enquiries",
      value: loading ? "..." : data.totalEnquiries || "-",
      icon: <FaEnvelopeOpenText />,
      bg: "bg-green-500",
    },
    {
      title: "Total Payment",
      value: loading
        ? "..."
        : new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
          }).format(data.totalPayment),
      icon: <FaMoneyBillWave />,
      bg: "bg-purple-500",
    },
  ];

  return (
    <div className="p-4">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              rounded-xl shadow-lg text-white p-6 h-44
              flex flex-col items-center justify-center gap-3
              ${card.bg}
              border-[0.1rem] border-black/20
            `}
          >
            <div className="text-6xl opacity-90">{card.icon}</div>

            <div className="text-center">
              <h3 className="text-lg font-bold opacity-90">{card.title}</h3>
              <p className="text-3xl font-bold mt-1 truncate">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
