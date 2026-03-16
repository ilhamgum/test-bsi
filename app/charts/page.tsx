"use client";

import React, { useMemo, useState, useEffect } from "react";
import DashboardLayout from "@/components/templates/dashboard-layout";
import StockChart from "@/components/organisms/stock-chart";
import { useInventoryStore } from "@/features/inventory/store";
import { generateStockHistory } from "@/mocks/charts/history";

export default function ChartsPage() {
  const items = useInventoryStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const historyMap = useMemo(() => {
    if (!mounted) return {};
    return generateStockHistory(items);
  }, [items, mounted]);

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-sm text-gray-500">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Stock Level History
          </h2>
          <p className="text-sm text-gray-500">
            View quantity trends over the last 30 days for any product.
          </p>
        </div>

        {items.length > 0 ? (
          <StockChart items={items} historyMap={historyMap} />
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-500">
            No inventory items available for charting.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
