"use client";

import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StockItem } from "@/features/inventory/model";
import { StockHistory } from "@/features/charts/model";
import { Select } from "@/components/atoms/input";

interface StockChartProps {
  items: StockItem[];
  historyMap: Record<string, StockHistory[]>;
}

export default function StockChart({ items, historyMap }: StockChartProps) {
  const [selectedItemId, setSelectedItemId] = useState<string>(
    items[0]?.id ?? ""
  );

  const options = useMemo(
    () =>
      items.map((item) => ({
        value: item.id,
        label: `${item.sku} - ${item.productName}`,
      })),
    [items]
  );

  const chartData = historyMap[selectedItemId] ?? [];
  const selectedItem = items.find((i) => i.id === selectedItemId);

  return (
    <div className="space-y-4">
      <div className="max-w-md">
        <Select
          label="Select Product"
          options={options}
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        />
      </div>

      {selectedItem && (
        <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
          <strong>{selectedItem.productName}</strong> — Current Stock:{" "}
          {selectedItem.quantity} | Category: {selectedItem.category} |
          Supplier: {selectedItem.supplier}
        </div>
      )}

      <div className="h-80 w-full rounded-lg border border-gray-200 bg-white p-4">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(val: string) => {
                  const d = new Date(val);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                labelFormatter={(label) =>
                  new Date(String(label)).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }
                formatter={(value) => [value, "Quantity"]}
              />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No history data available for this product.
          </div>
        )}
      </div>
    </div>
  );
}
