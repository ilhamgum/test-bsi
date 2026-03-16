"use client";

import React from "react";
import Modal from "@/components/organisms/modal";
import Button from "@/components/atoms/button";
import { StockItem } from "@/features/inventory/model";

interface DeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: StockItem | null;
  isLoading?: boolean;
}

export default function DeleteConfirm({
  isOpen,
  onClose,
  onConfirm,
  item,
  isLoading,
}: DeleteConfirmProps) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Stock Item">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to request deletion of{" "}
          <strong>{item.productName}</strong> (SKU: {item.sku})?
        </p>
        <p className="text-sm text-gray-500">
          This will create a pending deletion request that must be approved by an
          Officer.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            Request Deletion
          </Button>
        </div>
      </div>
    </Modal>
  );
}
