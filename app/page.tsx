"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/templates/dashboard-layout";
import InventoryTable from "@/components/organisms/inventory-table";
import StockFormModal from "@/components/organisms/stock-form-modal";
import DeleteConfirm from "@/components/organisms/delete-confirm";
import { useInventoryStore } from "@/features/inventory/store";
import { StockItem } from "@/features/inventory/model";
import { useToast } from "@/components/organisms/toast";

export default function InventoryPage() {
  const { items, isLoading, fetchItems, createRequest } = useInventoryStore();
  const { showToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<StockItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchItems();
  }, [fetchItems]);

  const handleAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: StockItem) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = (item: StockItem) => {
    setDeleteItem(item);
  };

  const handleFormSubmit = async (data: Partial<StockItem>) => {
    if (editItem) {
      await createRequest("update", data, editItem);
      showToast("Update request submitted for approval", "success");
    } else {
      await createRequest("create", data);
      showToast("Creation request submitted for approval", "success");
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteItem) {
      await createRequest("delete", {}, deleteItem);
      showToast("Deletion request submitted for approval", "success");
    }
    setDeleteItem(null);
  };

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
          <h2 className="text-xl font-semibold text-gray-900">Inventory</h2>
          <p className="text-sm text-gray-500">
            Manage stock items. Changes require officer approval.
          </p>
        </div>

        <InventoryTable
          items={items}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <StockFormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditItem(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editItem}
        isLoading={isLoading}
      />

      <DeleteConfirm
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteConfirm}
        item={deleteItem}
        isLoading={isLoading}
      />
    </DashboardLayout>
  );
}
