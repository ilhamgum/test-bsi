"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import RequestStatus from "@/common/constants/request-status"
import UserRole from "@/common/constants/user-role"

import { useAuthStore } from "@/features/auth/store"
import { useInventoryStore } from "@/features/inventory/store"

import styles from "./styles.module.css"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
    const currentRole = useAuthStore((s) => s.currentRole)
    const pendingCount = useInventoryStore(
        (s) => s.pendingRequests.filter((r) => r.status === RequestStatus.PENDING).length
    )

    const links = [
        { href: "/", label: "Inventory", icon: InventoryIcon, show: true },
        {
            href: "/approvals",
            label: "Approvals",
            icon: ApprovalIcon,
            show: currentRole === UserRole.OFFICER,
            badge: pendingCount > 0 ? pendingCount : null,
        },
        { href: "/charts", label: "Stock Charts", icon: ChartIcon, show: true },
    ]

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && <div className={styles["overlay"]} onClick={onClose} />}

            <aside className={`${styles["aside"]} ${isOpen ? styles["aside-open"] : ""}`}>
                <nav className={styles["nav"]} aria-label="Main navigation">
                    {links
                        .filter((link) => link.show)
                        .map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    className={`${styles["link"]} ${
                                        isActive ? styles["link-active"] : styles["link-inactive"]
                                    }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <link.icon />
                                    {link.label}
                                    {link.badge && <span className={styles["badge"]}>{link.badge}</span>}
                                </Link>
                            )
                        })}
                </nav>
            </aside>
        </>
    )
}

function InventoryIcon() {
    return (
        <svg className={styles["icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
        </svg>
    )
}

function ApprovalIcon() {
    return (
        <svg className={styles["icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    )
}

function ChartIcon() {
    return (
        <svg className={styles["icon"]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
        </svg>
    )
}
