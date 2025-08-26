import { Column } from "@/interfaces/interfaces";
import React, { useMemo, useState } from "react";

// Reusable DataTable component

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
  caption?: string;
}

export default function Table<T extends { _id: string }>({
  data,
  columns,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filtering
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = String(a[sortKey]);
      const bVal = String(b[sortKey]);
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData?.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageData = useMemo(
    () => sortedData?.slice(startIndex, endIndex),
    [sortedData, startIndex, endIndex]
  );

  const gotoPage = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full">
      {/* Top Controls */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-64 rounded-2xl border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-stone-500 focus:outline-none"
        />

        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-stone-600">
            Rows per page
          </label>
          <select
            id="pageSize"
            className="rounded-2xl border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-stone-500 focus:outline-none"
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              setPageSize(newSize);
              setPage(1);
            }}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="hidden overflow-hidden rounded-2xl border border-stone-200 shadow-sm md:block">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-stone-50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  onClick={() => handleSort(col.key)}
                  className={`cursor-pointer select-none sticky top-0 z-10 border-b border-stone-200 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-stone-600 ${
                    col.className ?? ""
                  }`}
                >
                  {col.header}
                  {sortKey === col.key && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData?.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-stone-500"
                >
                  No data to display
                </td>
              </tr>
            ) : (
              pageData?.map((row, rowIdx) => (
                <tr
                  key={(row as any).id ?? rowIdx}
                  className="odd:bg-white even:bg-stone-50 hover:bg-stone-100/70 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-3 text-sm text-stone-800 ${
                        col.className ?? ""
                      }`}
                    >
                      {col.render ? col.render(row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="md:hidden">
        {pageData?.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 p-6 text-center text-stone-500 shadow-sm">
            No data to display
          </div>
        ) : (
          <ul className="grid gap-3">
            {pageData?.map((row, idx) => (
              <li
                key={(row as any).id ?? idx}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="grid gap-2">
                  {columns.map((col) => (
                    <div
                      key={String(col.key)}
                      className="grid grid-cols-3 items-start gap-2 text-sm"
                    >
                      <div className="col-span-1 text-stone-500">
                        {col.header}
                      </div>
                      <div className="col-span-2 font-medium text-stone-800">
                        {col.render ? col.render(row) : String(row[col.key])}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 md:flex-row">
        {currentPage && totalPages ? (
          <div className="order-2 md:order-1 text-sm text-stone-600">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            {totalPages}{" "}
          </div>
        ) : null}

        <div className="order-1 md:order-2 inline-flex items-center gap-2">
          <button
            onClick={() => gotoPage(1)}
            disabled={currentPage === 1}
            className="rounded-2xl border border-stone-300 px-3 py-2 text-sm shadow-sm enabled:hover:bg-stone-50 disabled:opacity-40"
            aria-label="First page"
          >
            « First
          </button>
          <button
            onClick={() => gotoPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-2xl border border-stone-300 px-3 py-2 text-sm shadow-sm enabled:hover:bg-stone-50 disabled:opacity-40"
            aria-label="Previous page"
          >
            ‹ Prev
          </button>
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages
              )
              .reduce<number[]>((acc, p, idx, arr) => {
                if (idx === 0) return [p];
                const prev = arr[idx - 1];
                if (p - prev > 1) return [...acc, -1, p];
                return [...acc, p];
              }, [])
              .map((p, i) =>
                p === -1 ? (
                  <span key={`ell-${i}`} className="px-2 text-stone-500">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => gotoPage(p)}
                    className={`rounded-full px-3 py-1 text-sm shadow-sm border ${
                      p === currentPage
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
                    }`}
                    aria-current={p === currentPage ? "page" : undefined}
                    aria-label={`Page ${p}`}
                  >
                    {p}
                  </button>
                )
              )}
          </div>
          <button
            onClick={() => gotoPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-2xl border border-stone-300 px-3 py-2 text-sm shadow-sm enabled:hover:bg-stone-50 disabled:opacity-40"
            aria-label="Next page"
          >
            Next ›
          </button>
          <button
            onClick={() => gotoPage(totalPages)}
            disabled={currentPage === totalPages}
            className="rounded-2xl border border-stone-300 px-3 py-2 text-sm shadow-sm enabled:hover:bg-stone-50 disabled:opacity-40"
            aria-label="Last page"
          >
            Last »
          </button>
        </div>
      </div>
    </div>
  );
}
