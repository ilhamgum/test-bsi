"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import ApprovalList from "@/components/organisms/approval-list"
import { useToast } from "@/components/organisms/toast"
import DashboardLayout from "@/components/templates/dashboard-layout"

import ToastType from "@/common/constants/toast-type"
import UserRole from "@/common/constants/user-role"

import { useAuthStore } from "@/features/auth/store"
import { useInventoryStore } from "@/features/inventory/store"

import styles from "./styles.module.css"

export default function ApprovalsPage() {
    const currentRole = useAuthStore((s) => s.currentRole)
    const { pendingRequests, isLoading, approveRequest, rejectRequest } = useInventoryStore()
    const { showToast } = useToast()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && currentRole !== UserRole.OFFICER) {
            router.push("/")
        }
    }, [currentRole, router, mounted])

    const handleApprove = async (requestId: string) => {
        await approveRequest(requestId)
        showToast("Request approved successfully", ToastType.SUCCESS)
    }

    const handleReject = async (requestId: string, reason?: string) => {
        await rejectRequest(requestId, reason)
        showToast("Request rejected", ToastType.INFO)
    }

    if (!mounted) {
        return (
            <DashboardLayout>
                <div className={styles["status-container"]}>Loading...</div>
            </DashboardLayout>
        )
    }

    if (currentRole !== UserRole.OFFICER) {
        return (
            <DashboardLayout>
                <div className={styles["status-container"]}>Redirecting...</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className={styles["container"]}>
                <div className={styles["header"]}>
                    <h2 className={styles["title"]}>Approval Dashboard</h2>
                    <p className={styles["description"]}>Review and approve or reject pending stock changes.</p>
                </div>

                <ApprovalList
                    requests={pendingRequests}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    isLoading={isLoading}
                />
            </div>
        </DashboardLayout>
    )
}
