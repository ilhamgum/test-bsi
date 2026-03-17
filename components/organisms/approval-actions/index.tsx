"use client"

import { useState } from "react"

import Button from "@/components/atoms/button"
import { Textarea } from "@/components/atoms/input"

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
        <div className="space-y-3">
            <div className="flex gap-2">
                <Button onClick={onApprove} isLoading={isLoading}>
                    Approve
                </Button>
                <Button variant="danger" onClick={() => setShowRejectReason(!showRejectReason)} isLoading={isLoading}>
                    Reject
                </Button>
            </div>
            {showRejectReason && (
                <div className="space-y-2">
                    <Textarea
                        label="Rejection Reason (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for rejection..."
                        rows={2}
                    />
                    <div className="flex gap-2">
                        <Button variant="danger" onClick={handleReject} className="text-xs">
                            Confirm Reject
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setShowRejectReason(false)
                                setReason("")
                            }}
                            className="text-xs"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
