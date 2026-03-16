"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/templates/dashboard-layout";
import ApprovalList from "@/components/organisms/approval-list";
import { useAuthStore } from "@/features/auth/store";
import { useInventoryStore } from "@/features/inventory/store";
import { useToast } from "@/components/organisms/toast";

export default function ApprovalsPage() {
  const currentRole = useAuthStore((s) => s.currentRole);
  const { pendingRequests, isLoading, approveRequest, rejectRequest } =
    useInventoryStore();
  const { showToast } = useToast();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && currentRole !== "officer") {
      router.push("/");
    }
  }, [currentRole, router, mounted]);

  const handleApprove = async (requestId: string) => {
    await approveRequest(requestId);
    showToast("Request approved successfully", "success");
  };

  const handleReject = async (requestId: string, reason?: string) => {
    await rejectRequest(requestId, reason);
    showToast("Request rejected", "info");
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

  if (currentRole !== "officer") {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-sm text-gray-500">
          Redirecting...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Approval Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Review and approve or reject pending stock changes.
          </p>
        </div>

        <ApprovalList
          requests={pendingRequests}
          onApprove={handleApprove}
          onReject={handleReject}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
}
