"use client"

import { useEffect, useMemo, useState } from "react"

import StockChart from "@/components/organisms/stock-chart"
import DashboardLayout from "@/components/templates/dashboard-layout"

import { useInventoryStore } from "@/features/inventory/store"

import { generateStockHistory } from "@/mocks/charts/history"

import styles from "./styles.module.css"

export default function ChartsPage() {
    const items = useInventoryStore((s) => s.items)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const historyMap = useMemo(() => {
        if (!mounted) return {}
        return generateStockHistory(items)
    }, [items, mounted])

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
                    <h2 className={styles["title"]}>Stock Level History</h2>
                    <p className={styles["description"]}>View quantity trends over the last 30 days for any product.</p>
                </div>

                {items.length > 0 ? (
                    <StockChart items={items} historyMap={historyMap} />
                ) : (
                    <div className={styles["empty-container"]}>No inventory items available for charting.</div>
                )}
            </div>
        </DashboardLayout>
    )
}
