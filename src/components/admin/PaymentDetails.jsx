// src/pages/admin/PaymentDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

/* ================= DATE FORMAT ================= */
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-GB");
};

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded text-xs font-semibold";

  if (status === "approved")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>Approved</span>
    );

  if (status === "rejected")
    return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;

  return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
};

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]); // always keep array
  const [loading, setLoading] = useState(true);

  /* ================= AXIOS BASE URL ================= */
  // Uses the same baseURL you configured in axiosInstance (e.g. http://192.168.1.13:8000)
  const API_BASE =
    (axiosInstance?.defaults?.baseURL || "").replace(/\/$/, ""); // remove trailing /

  const getStorageUrl = (path) => {
    if (!path) return "";
    // if backend already returns full URL, use it directly
    if (/^https?:\/\//i.test(path)) return path;

    // otherwise build: <baseURL>/storage/<path>
    // (encodeURI to keep slashes but escape spaces etc.)
    return `${API_BASE}/storage/${encodeURI(path)}`;
  };

  /* ================= PAGINATION ================= */
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalItems = payments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return payments.slice(start, start + pageSize);
  }, [payments, page]);

  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  const getPageButtons = () => {
    const pages = [];
    const sibling = 1;

    const addPage = (p) => pages.push({ type: "page", value: p, key: `p-${p}` });
    const addDots = (key) => pages.push({ type: "dots", key });

    if (totalPages <= 7) {
      for (let p = 1; p <= totalPages; p++) addPage(p);
      return pages;
    }

    addPage(1);

    const left = Math.max(2, page - sibling);
    const right = Math.min(totalPages - 1, page + sibling);

    if (left > 2) addDots("dots-left");

    for (let p = left; p <= right; p++) addPage(p);

    if (right < totalPages - 1) addDots("dots-right");

    addPage(totalPages);

    return pages;
  };

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/payments");

      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data?.data?.data)
        ? res.data.data.data
        : [];

      setPayments(list);
    } catch (err) {
      console.error("Fetch payments failed", err);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, action) => {
    try {
      if (!action) return;

      if (action === "approved") {
        await axiosInstance.post(`/admin/payments/${id}/approve`);
      } else if (action === "rejected") {
        await axiosInstance.post(`/admin/payments/${id}/reject`);
      }

      setPayments((prev) =>
        Array.isArray(prev)
          ? prev.map((p) => (p.id === id ? { ...p, status: action } : p))
          : prev
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update payment status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-3xl font-semibold">Payment Details</h1>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading payments...</p>
      ) : (
        <div className="flex-grow flex flex-col">
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b text-left">
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Screenshot</th>
                </tr>
              </thead>

              <tbody>
                {payments.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-500">
                      No payment records found
                    </td>
                  </tr>
                )}

                {paginatedPayments.map((p, index) => (
                  <tr key={p.id ?? index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{(page - 1) * pageSize + index + 1}</td>
                    <td className="p-4">{p.name || "-"}</td>
                    <td className="p-4">{p.phone || "-"}</td>
                    <td className="p-4">{p.transaction_id || "-"}</td>
                    <td className="p-4">{p.course?.name || "-"}</td>
                    <td className="p-4 font-semibold">₹{p.course?.fees ?? "-"}</td>
                    <td className="p-4">{formatDate(p.created_at)}</td>

                    {/* STATUS COLUMN */}
                    <td className="p-4 text-center">
                      {p.status === "pending" ? (
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          defaultValue=""
                          onChange={(e) => updateStatus(p.id, e.target.value)}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                      ) : (
                        <StatusBadge status={p.status} />
                      )}
                    </td>

                    {/* SCREENSHOT */}
                    <td className="p-4 text-center">
                      {p.payment_image ? (
                        <a
                          href={getStorageUrl(p.payment_image)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length > 0 && (
            <div className="mt-auto pt-6 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-3">
                Showing <span className="font-semibold">{from}</span>–
                <span className="font-semibold">{to}</span> of{" "}
                <span className="font-semibold">{totalItems}</span>
              </p>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded border text-sm ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  Prev
                </button>

                {getPageButtons().map((item) => {
                  if (item.type === "dots") {
                    return (
                      <span key={item.key} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  const pNo = item.value;
                  const active = pNo === page;

                  return (
                    <button
                      key={item.key}
                      onClick={() => setPage(pNo)}
                      className={`px-3 py-1 rounded border text-sm ${
                        active
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {pNo}
                    </button>
                  );
                })}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`px-3 py-1 rounded border text-sm ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
