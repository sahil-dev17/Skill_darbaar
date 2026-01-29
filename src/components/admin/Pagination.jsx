// src/components/Pagination.jsx
import React, { useMemo } from "react";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  totalItems = 0,
  startIndex = 0,
  endIndex = 0,
}) => {
  const pages = useMemo(() => {
    if (totalPages <= 1) return [];

    const arr = [];
    const left = Math.max(1, page - 1);
    const right = Math.min(totalPages, page + 1);

    arr.push(1);
    if (left > 2) arr.push("...");

    for (let p = left; p <= right; p++) arr.push(p);

    if (right < totalPages - 1) arr.push("...");
    if (totalPages !== 1) arr.push(totalPages);

    // remove duplicates while keeping order
    const res = [];
    const seen = new Set();
    for (const x of arr) {
      const k = String(x);
      if (!seen.has(k)) {
        seen.add(k);
        res.push(x);
      }
    }
    return res;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 px-2">
      {/* LEFT TEXT */}
      <p className="text-sm text-gray-600 mb-3 text-left">
        Showing <span className="font-semibold">{startIndex}</span>–
        <span className="font-semibold">{endIndex}</span> of{" "}
        <span className="font-semibold">{totalItems}</span>
      </p>

      {/* CENTER BUTTONS */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded border text-sm ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {pages.map((p, idx) =>
              p === "..." ? (
                <span key={`dots-${idx}`} className="px-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1 rounded border text-sm ${
                    p === page
                      ? "bg-gray-900 text-white border-gray-900"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded border text-sm ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
