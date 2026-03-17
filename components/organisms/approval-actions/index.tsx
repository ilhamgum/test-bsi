"use client"

import { useState } from "react"

import Button from "@/components/atoms/button"
import { Textarea } from "@/components/atoms/input"

import styles from "./styles.module.css"

interface ApprovalActionsProps {
    onApprove: () => void
    onReject: (reason?: string) => void
    isLoading?: boolean
}

export default function ApprovalActions({ onApprove, onReject, isLoading }: ApprovalActionsProps) {
    const [showRejectReason, setShowRejectReason] = useState(false)
    const [reason, setReason] = useState("")

    const handleReject = () => {
        onReject(reason || undefined)
        setShowRejectReason(false)
        setReason("")
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["actions-row"]}>
                <Button onClick={onApprove} isLoading={isLoading}>
                    Approve
                </Button>
                <Button variant="danger" onClick={() => setShowRejectReason(!showRejectReason)} isLoading={isLoading}>
                    Reject
                </Button>
            </div>
            {showRejectReason && (
                <div className={styles["reject-form"]}>
                    <Textarea
                        label="Rejection Reason (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        rows={2}
                    />
                    <div className={styles["reject-actions"]}>
                        <Button variant="danger" onClick={handleReject} className={styles["btn-xs"]}>
                            Confirm Reject
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setShowRejectReason(false)
                                setReason("")
                            }}
                            className={styles["btn-xs"]}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
