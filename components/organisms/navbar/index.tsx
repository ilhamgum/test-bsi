"use client"

import Badge from "@/components/atoms/badge"

import { useAuthStore } from "@/features/auth/store"

import styles from "./styles.module.css"

interface NavbarProps {
    onMenuToggle: () => void
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
    const { currentRole, setRole } = useAuthStore()

    return (
        <header className={styles["header"]}>
            <div className={styles["brand-wrapper"]}>
                <button onClick={onMenuToggle} className={styles["menu-toggle"]} aria-label="Toggle menu">
                    <svg className={styles["toggle-icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className={styles["title"]}>Stock Management</h1>
            </div>

            <div className={styles["user-wrapper"]}>
                <span className={styles["user-label"]}>Logged in as:</span>
                <select
                    value={currentRole}
                    onChange={(e) => setRole(e.target.value as "staff" | "officer")}
                    className={styles["role-select"]}
                    aria-label="Switch role"
                    id="role-switcher"
                >
                    <option value="staff">Staff</option>
                    <option value="officer">Officer</option>
                </select>
                <Badge variant={currentRole === "officer" ? "info" : "default"}>
                    {currentRole === "officer" ? "Checker" : "Maker"}
                </Badge>
            </div>
        </header>
    )
}
