"use client";

import React, { useState } from "react";
import { PendingRequest } from "@/features/inventory/model";
import Badge from "@/components/atoms/badge";
import DiffView from "@/components/organisms/diff-view";
import ApprovalActions from "@/components/organisms/approval-actions";

interface ApprovalListProps {
  requests: PendingRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string, reason?: string) => void;
  isLoading?: boolean;
}

export default function ApprovalList({
  requests,
  onApprove,
  onReject,
  isLoading,
}: ApprovalListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const processedRequests = requests.filter((r) => r.status !== "pending");

  const typeBadgeVariant = (type: string) => {
    switch (type) {
      case "create":
        return "success" as const;
      case "update":
        return "warning" as const;
      case "delete":
        return "danger" as const;
      default:
        return "default" as const;
    }
  };

  const renderRequestRow = (request: PendingRequest, showActions: boolean) => {
    const isExpanded = expandedId === request.id;
    const itemName =
      request.type === "create"
        ? request.payload.productName || "New Item"
        : request.originalData?.productName || "Unknown";

    return (
      <div
        key={request.id}
        className="border-b border-gray-200 last:border-b-0"
      >
        <div
          className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
          onClick={() => setExpandedId(isExpanded ? null : request.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setExpandedId(isExpanded ? null : request.id);
            }
          }}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-3">
            <Badge variant={typeBadgeVariant(request.type)}>
              {request.type.toUpperCase()}
            </Badge>
            <span className="text-sm font-medium text-gray-900">
              {itemName}
            </span>
            {request.status !== "pending" && (
              <Badge
                variant={
                  request.status === "approved" ? "success" : "danger"
                }
              >
                {request.status}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              {new Date(request.createdAt).toLocaleDateString()}
            </span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 space-y-4">
            {request.type === "create" && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  New Item Details:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">SKU:</span>{" "}
                    {request.payload.sku}
                  </div>
                  <div>
                    <span className="text-gray-500">Name:</span>{" "}
                    {request.payload.productName}
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>{" "}
                    {request.payload.category}
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span> $
                    {Number(request.payload.price).toFixed(2)}
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>{" "}
                    {request.payload.quantity}
                  </div>
                  <div>
                    <span className="text-gray-500">Supplier:</span>{" "}
                    {request.payload.supplier}
                  </div>
                </div>
              </div>
            )}

            {request.type === "update" && (
              <DiffView
                original={request.originalData}
                updated={request.payload}
              />
            )}

            {request.type === "delete" && request.originalData && (
              <div className="text-sm text-red-600">
                This will permanently delete{" "}
                <strong>{request.originalData.productName}</strong> (SKU:{" "}
                {request.originalData.sku})
              </div>
            )}

            {request.rejectionReason && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                <strong>Rejection reason:</strong> {request.rejectionReason}
              </div>
            )}

            {showActions && (
              <ApprovalActions
                onApprove={() => onApprove(request.id)}
                onReject={(reason) => onReject(request.id, reason)}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Pending requests */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Pending Requests ({pendingRequests.length})
        </h3>
        {pendingRequests.length === 0 ? (
          <p className="rounded-md border border-gray-200 px-4 py-8 text-center text-sm text-gray-500">
            No pending requests.
          </p>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white">
            {pendingRequests.map((r) => renderRequestRow(r, true))}
          </div>
        )}
      </div>

      {/* Processed requests */}
      {processedRequests.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Processed Requests ({processedRequests.length})
          </h3>
          <div className="rounded-lg border border-gray-200 bg-white">
            {processedRequests.map((r) => renderRequestRow(r, false))}
          </div>
        </div>
      )}
    </div>
  );
}
