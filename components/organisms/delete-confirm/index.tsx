"use client"

import Button from "@/components/atoms/button"
import Modal from "@/components/organisms/modal"

import { StockItem } from "@/features/inventory/model"

import styles from "./styles.module.css"

interface DeleteConfirmProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    item: StockItem | null
    isLoading?: boolean
}

export default function DeleteConfirm({ isOpen, onClose, onConfirm, item, isLoading }: DeleteConfirmProps) {
    if (!item) return null

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Stock Item">
            <div className={styles["container"]}>
                <p className={styles["description"]}>
                    Are you sure you want to request deletion of <strong>{item.productName}</strong> (SKU: {item.sku})?
                </p>
                <p className={styles["disclaimer"]}>
                    This will create a pending deletion request that must be approved by an Officer.
                </p>
                <div className={styles["actions-wrapper"]}>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                        Request Deletion
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
