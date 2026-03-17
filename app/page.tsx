"use client"

import { useEffect, useState } from "react"

import DeleteConfirm from "@/components/organisms/delete-confirm"
import InventoryTable from "@/components/organisms/inventory-table"
import StockFormModal from "@/components/organisms/stock-form-modal"
import { useToast } from "@/components/organisms/toast"
import DashboardLayout from "@/components/templates/dashboard-layout"

import RequestType from "@/common/constants/request-type"
import ToastType from "@/common/constants/toast-type"

import { StockItem } from "@/features/inventory/model"
import { useInventoryStore } from "@/features/inventory/store"

import styles from "./styles.module.css"

export default function InventoryPage() {
    const { items, isLoading, fetchItems, createRequest } = useInventoryStore()
    const { showToast } = useToast()

    const [showForm, setShowForm] = useState(false)
    const [editItem, setEditItem] = useState<StockItem | null>(null)
    const [deleteItem, setDeleteItem] = useState<StockItem | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetchItems()
    }, [fetchItems])

    const handleAdd = () => {
        setEditItem(null)
        setShowForm(true)
    }

    const handleEdit = (item: StockItem) => {
        setEditItem(item)
        setShowForm(true)
    }

    const handleDelete = (item: StockItem) => {
        setDeleteItem(item)
    }

    const handleFormSubmit = async (data: Partial<StockItem>) => {
        if (editItem) {
            await createRequest(RequestType.UPDATE, data, editItem)
            showToast("Update request submitted for approval", ToastType.SUCCESS)
        } else {
            await createRequest(RequestType.CREATE, data)
            showToast("Creation request submitted for approval", ToastType.SUCCESS)
        }
        setShowForm(false)
        setEditItem(null)
    }

    const handleDeleteConfirm = async () => {
        if (deleteItem) {
            await createRequest(RequestType.DELETE, {}, deleteItem)
            showToast("Deletion request submitted for approval", ToastType.SUCCESS)
        }
        setDeleteItem(null)
    }

    if (!mounted) {
        return (
            <DashboardLayout>
                <div className={styles["loading-container"]}>Loading...</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className={styles["container"]}>
                <div className={styles["header"]}>
                    <h2 className={styles["title"]}>Inventory</h2>
                    <p className={styles["description"]}>Manage stock items. Changes require officer approval.</p>
                </div>

                <InventoryTable items={items} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

            <StockFormModal
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false)
                    setEditItem(null)
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
    )
}
