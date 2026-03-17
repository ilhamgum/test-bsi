"use client"

import { StockItem } from "@/features/inventory/model"

import styles from "./styles.module.css"

interface DiffViewProps {
    original: StockItem | null
    updated: Partial<StockItem>
}

const DISPLAY_FIELDS: { key: keyof StockItem; label: string }[] = [
    { key: "sku", label: "SKU" },
    { key: "productName", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "quantity", label: "Quantity" },
    { key: "supplier", label: "Supplier" },
]

export default function DiffView({ original, updated }: DiffViewProps) {
    if (!original) return null

    return (
        <div className={styles["container"]}>
            <table className={styles["table"]}>
                <thead className={styles["thead"]}>
                    <tr>
                        <th className={styles["th"]}>Field</th>
                        <th className={styles["th"]}>Original</th>
                        <th className={styles["th"]}>New Value</th>
                    </tr>
                </thead>
                <tbody className={styles["tbody"]}>
                    {DISPLAY_FIELDS.map(({ key, label }) => {
                        const origVal = original[key]
                        const newVal = updated[key]
                        const hasChanged = newVal !== undefined && String(newVal) !== String(origVal)

                        return (
                            <tr key={key} className={hasChanged ? styles["row-changed"] : ""}>
                                <td className={styles["td-label"]}>{label}</td>
                                <td
                                    className={`${styles["td"]} ${
                                        hasChanged ? styles["val-old"] : styles["val-unchanged"]
                                    }`}
                                >
                                    {key === "price" ? `$${Number(origVal).toFixed(2)}` : String(origVal)}
                                </td>
                                <td
                                    className={`${styles["td"]} ${
                                        hasChanged ? styles["val-new"] : styles["val-unchanged"]
                                    }`}
                                >
                                    {hasChanged
                                        ? key === "price"
                                            ? `$${Number(newVal).toFixed(2)}`
                                            : String(newVal)
                                        : "—"}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
