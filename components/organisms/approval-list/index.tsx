"use client"

import { useState } from "react"

import Badge from "@/components/atoms/badge"
import ApprovalActions from "@/components/organisms/approval-actions"
import DiffView from "@/components/organisms/diff-view"

import RequestStatus from "@/common/constants/request-status"
import RequestType from "@/common/constants/request-type"

import { PendingRequest } from "@/features/inventory/model"

import styles from "./styles.module.css"

interface ApprovalListProps {
    requests: PendingRequest[]
    onApprove: (requestId: string) => void
    onReject: (requestId: string, reason?: string) => void
    isLoading?: boolean
}

export default function ApprovalList({ requests, onApprove, onReject, isLoading }: ApprovalListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const pendingRequests = requests.filter((r) => r.status === RequestStatus.PENDING)
    const processedRequests = requests.filter((r) => r.status !== RequestStatus.PENDING)

    const typeBadgeVariant = (type: RequestType) => {
        switch (type) {
            case RequestType.CREATE:
                return "success" as const
            case RequestType.UPDATE:
                return "warning" as const
            case RequestType.DELETE:
                return "danger" as const
            default:
                return "default" as const
        }
    }

    const renderRequestRow = (request: PendingRequest, showActions: boolean) => {
        const isExpanded = expandedId === request.id
        const itemName =
            request.type === RequestType.CREATE
                ? request.payload.productName || "New Item"
                : request.originalData?.productName || "Unknown"

        return (
            <div key={request.id} className={styles["row-wrapper"]}>
                <div
                    className={styles["row-summary"]}
                    onClick={() => setExpandedId(isExpanded ? null : request.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setExpandedId(isExpanded ? null : request.id)
                        }
                    }}
                    aria-expanded={isExpanded}
                >
                    <div className={styles["summary-left"]}>
                        <Badge variant={typeBadgeVariant(request.type)}>{request.type.toUpperCase()}</Badge>
                        <span className={styles["item-name"]}>{itemName}</span>
                        {request.status !== RequestStatus.PENDING && (
                            <Badge variant={request.status === RequestStatus.APPROVED ? "success" : "danger"}>
                                {request.status}
                            </Badge>
                        )}
                    </div>
                    <div className={styles["summary-right"]}>
                        <span className={styles["timestamp"]}>{new Date(request.createdAt).toLocaleDateString()}</span>
                        <svg
                            className={`${styles["expand-icon"]} ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {isExpanded && (
                    <div className={styles["row-details"]}>
                        {request.type === "create" && (
                            <div className={styles["details-group"]}>
                                <h4 className={styles["details-title"]}>New Item Details:</h4>
                                <div className={styles["details-grid"]}>
                                    <div>
                                        <span className={styles["label"]}>SKU:</span> {request.payload.sku}
                                    </div>
                                    <div>
                                        <span className={styles["label"]}>Name:</span> {request.payload.productName}
                                    </div>
                                    <div>
                                        <span className={styles["label"]}>Category:</span> {request.payload.category}
                                    </div>
                                    <div>
                                        <span className={styles["label"]}>Price:</span> $
                                        {Number(request.payload.price).toFixed(2)}
                                    </div>
                                    <div>
                                        <span className={styles["label"]}>Quantity:</span> {request.payload.quantity}
                                    </div>
                                    <div>
                                        <span className={styles["label"]}>Supplier:</span> {request.payload.supplier}
                                    </div>
                                </div>
                            </div>
                        )}

                        {request.type === RequestType.UPDATE && (
                            <DiffView original={request.originalData} updated={request.payload} />
                        )}

                        {request.type === RequestType.DELETE && request.originalData && (
                            <div className={styles["delete-warning"]}>
                                This will permanently delete <strong>{request.originalData.productName}</strong> (SKU:{" "}
                                {request.originalData.sku})
                            </div>
                        )}

                        {request.rejectionReason && (
                            <div className={styles["rejection-notice"]}>
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
        )
    }

    return (
        <div className={styles["container"]}>
            {/* Pending requests */}
            <div>
                <h3 className={styles["section-title"]}>Pending Requests ({pendingRequests.length})</h3>
                {pendingRequests.length === 0 ? (
                    <p className={styles["empty-state"]}>No pending requests.</p>
                ) : (
                    <div className={styles["list-container"]}>
                        {pendingRequests.map((r) => renderRequestRow(r, true))}
                    </div>
                )}
            </div>

            {/* Processed requests */}
            {processedRequests.length > 0 && (
                <div>
                    <h3 className={styles["section-title"]}>Processed Requests ({processedRequests.length})</h3>
                    <div className={styles["list-container"]}>
                        {processedRequests.map((r) => renderRequestRow(r, false))}
                    </div>
                </div>
            )}
        </div>
    )
}
