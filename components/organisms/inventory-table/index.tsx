"use client"

import { useMemo, useState } from "react"

import Button from "@/components/atoms/button"
import SearchBar from "@/components/molecules/search-bar"
import SortHeader, { SortDirection } from "@/components/molecules/sort-header"

import { useAuthStore } from "@/features/auth/store"
import { StockItem } from "@/features/inventory/model"

import styles from "./styles.module.css"

interface InventoryTableProps {
    items: StockItem[]
    onAdd: () => void
    onEdit: (item: StockItem) => void
    onDelete: (item: StockItem) => void
}

const PAGE_SIZE = 10

export default function InventoryTable({ items, onAdd, onEdit, onDelete }: InventoryTableProps) {
    const [search, setSearch] = useState("")
    const [sortKey, setSortKey] = useState<string | null>(null)
    const [sortDir, setSortDir] = useState<SortDirection>(null)
    const [page, setPage] = useState(1)
    const currentRole = useAuthStore((s) => s.currentRole)

    const handleSort = (key: string) => {
        if (sortKey === key) {
            if (sortDir === "asc") setSortDir("desc")
            else if (sortDir === "desc") {
                setSortKey(null)
                setSortDir(null)
            }
        } else {
            setSortKey(key)
            setSortDir("asc")
        }
        setPage(1)
    }

    const filteredAndSorted = useMemo(() => {
        let result = items

        // SEARCH
        if (search) {
            const q = search.toLowerCase()
            result = result.filter(
                (item) =>
                    item.sku.toLowerCase().includes(q) ||
                    item.productName.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    item.supplier.toLowerCase().includes(q)
            )
        }

        // SORT
        if (sortKey && sortDir) {
            result = [...result].sort((a, b) => {
                const aVal = a[sortKey as keyof StockItem]
                const bVal = b[sortKey as keyof StockItem]
                if (typeof aVal === "string" && typeof bVal === "string") {
                    return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
                }
                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortDir === "asc" ? aVal - bVal : bVal - aVal
                }
                return 0
            })
        }

        return result
    }, [items, search, sortKey, sortDir])

    const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE))
    const paginatedItems = filteredAndSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const columns = [
        { key: "sku", label: "SKU" },
        { key: "productName", label: "Product Name" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "supplier", label: "Supplier" },
    ]

    return (
        <div className={styles["container"]}>
            <div className={styles["controls-container"]}>
                <div className={styles["search-wrapper"]}>
                    <SearchBar
                        value={search}
                        onChange={(val) => {
                            setSearch(val)
                            setPage(1)
                        }}
                        placeholder="Search by SKU, name, category, supplier..."
                    />
                </div>
                {currentRole === "staff" && (
                    <Button onClick={onAdd} className={styles["add-button-wrapper"]}>
                        + Add Stock
                    </Button>
                )}
            </div>

            <div className={styles["table-container"]}>
                <table className={styles["table"]} role="table">
                    <thead className={styles["table-head"]}>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className={styles["table-header-cell"]} scope="col">
                                    <SortHeader
                                        label={col.label}
                                        sortKey={col.key}
                                        currentSortKey={sortKey}
                                        currentDirection={sortDir}
                                        onSort={handleSort}
                                    />
                                </th>
                            ))}
                            {currentRole === "staff" && (
                                <th className={styles["table-header-cell-actions"]} scope="col">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className={styles["table-body"]}>
                        {paginatedItems.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (currentRole === "staff" ? 1 : 0)}
                                    className={styles["empty-cell"]}
                                >
                                    No items found.
                                </td>
                            </tr>
                        ) : (
                            paginatedItems.map((item) => (
                                <tr key={item.id} className={styles["table-row"]}>
                                    <td className={styles["cell-sku"]}>{item.sku}</td>
                                    <td className={styles["cell-name"]}>{item.productName}</td>
                                    <td className={styles["cell-category"]}>{item.category}</td>
                                    <td className={styles["cell-price-quantity"]}>${item.price.toFixed(2)}</td>
                                    <td className={styles["cell-price-quantity"]}>{item.quantity}</td>
                                    <td className={styles["cell-category"]}>{item.supplier}</td>
                                    {currentRole === "staff" && (
                                        <td className={styles["cell-actions"]}>
                                            <div className={styles["actions-wrapper"]}>
                                                <Button variant="ghost" onClick={() => onEdit(item)} className={styles["edit-button"]}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => onDelete(item)}
                                                    className={styles["delete-button"]}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className={styles["pagination-container"]}>
                <span>
                    Showing {Math.min((page - 1) * PAGE_SIZE + 1, filteredAndSorted.length)}-
                    {Math.min(page * PAGE_SIZE, filteredAndSorted.length)} of {filteredAndSorted.length}
                </span>
                <div className={styles["pagination-controls"]}>
                    <Button
                        variant="secondary"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={styles["edit-button"]}
                    >
                        Previous
                    </Button>
                    <span className={styles["page-info"]}>
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="secondary"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className={styles["edit-button"]}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
