"use client"

import { useState } from "react"

import Navbar from "@/components/organisms/navbar"
import Sidebar from "@/components/organisms/sidebar"

import styles from "./styles.module.css"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className={styles["container"]}>
            <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className={styles["content-wrapper"]}>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className={styles["main"]}>{children}</main>
            </div>
        </div>
    )
}
