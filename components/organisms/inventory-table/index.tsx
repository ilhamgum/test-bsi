"use client";

import React, { useMemo, useState } from "react";
import { StockItem } from "@/features/inventory/model";
import SearchBar from "@/components/molecules/search-bar";
import SortHeader, { SortDirection } from "@/components/molecules/sort-header";
import Button from "@/components/atoms/button";
import { useAuthStore } from "@/features/auth/store";

interface InventoryTableProps {
  items: StockItem[];
  onAdd: () => void;
  onEdit: (item: StockItem) => void;
  onDelete: (item: StockItem) => void;
}

const PAGE_SIZE = 10;

export default function InventoryTable({
  items,
  onAdd,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);
  const currentRole = useAuthStore((s) => s.currentRole);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    let result = items;

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.sku.toLowerCase().includes(q) ||
          item.productName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.supplier.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortKey && sortDir) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey as keyof StockItem];
        const bVal = b[sortKey as keyof StockItem];
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDir === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
    }

    return result;
  }, [items, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const paginatedItems = filteredAndSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const columns = [
    { key: "sku", label: "SKU" },
    { key: "productName", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "supplier", label: "Supplier" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search by SKU, name, category, supplier..."
          />
        </div>
        {currentRole === "staff" && (
          <Button onClick={onAdd} className="shrink-0">
            + Add Stock
          </Button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200" role="table">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left" scope="col">
                  <SortHeader
                    label={col.label}
                    sortKey={col.key}
                    currentSortKey={sortKey}
                    currentDirection={sortDir}
                    onSort={handleSort}
                  />
                </th>
              ))}
              {currentRole === "staff" && (
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500" scope="col">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedItems.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (currentRole === "staff" ? 1 : 0)}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No items found.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-gray-900">
                    {item.sku}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.productName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {item.supplier}
                  </td>
                  {currentRole === "staff" && (
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => onEdit(item)}
                          className="text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => onDelete(item)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filteredAndSorted.length)}-
          {Math.min(page * PAGE_SIZE, filteredAndSorted.length)} of{" "}
          {filteredAndSorted.length}
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-xs"
          >
            Previous
          </Button>
          <span className="flex items-center px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-xs"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
