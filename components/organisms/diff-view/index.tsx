"use client";

import React from "react";
import { StockItem } from "@/features/inventory/model";

interface DiffViewProps {
  original: StockItem | null;
  updated: Partial<StockItem>;
}

const DISPLAY_FIELDS: { key: keyof StockItem; label: string }[] = [
  { key: "sku", label: "SKU" },
  { key: "productName", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "supplier", label: "Supplier" },
];

export default function DiffView({ original, updated }: DiffViewProps) {
  if (!original) return null;

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Field
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              Original
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-500">
              New Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {DISPLAY_FIELDS.map(({ key, label }) => {
            const origVal = original[key];
            const newVal = updated[key];
            const hasChanged =
              newVal !== undefined && String(newVal) !== String(origVal);

            return (
              <tr key={key} className={hasChanged ? "bg-yellow-50" : ""}>
                <td className="px-4 py-2 font-medium text-gray-700">
                  {label}
                </td>
                <td
                  className={`px-4 py-2 ${
                    hasChanged ? "text-red-600 line-through" : "text-gray-600"
                  }`}
                >
                  {key === "price" ? `$${Number(origVal).toFixed(2)}` : String(origVal)}
                </td>
                <td
                  className={`px-4 py-2 ${
                    hasChanged ? "font-medium text-green-600" : "text-gray-600"
                  }`}
                >
                  {hasChanged
                    ? key === "price"
                      ? `$${Number(newVal).toFixed(2)}`
                      : String(newVal)
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
