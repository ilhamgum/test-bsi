"use client"

import styles from "./styles.module.css"

export type SortDirection = "asc" | "desc" | null

interface SortHeaderProps {
    label: string
    sortKey: string
    currentSortKey: string | null
    currentDirection: SortDirection
    onSort: (key: string) => void
}

export default function SortHeader({ label, sortKey, currentSortKey, currentDirection, onSort }: SortHeaderProps) {
    const isActive = currentSortKey === sortKey

    return (
        <button
            onClick={() => onSort(sortKey)}
            className={styles["container"]}
            aria-label={`Sort by ${label}`}
        >
            {label}
            <span className={styles["icon-wrapper"]}>
                <svg
                    className={`${styles["icon"]} ${isActive && currentDirection === "asc" ? styles["icon-active"] : styles["icon-inactive"]}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 5l7 7H5z" />
                </svg>
                <svg
                    className={`${styles["icon"]} ${
                        isActive && currentDirection === "desc" ? styles["icon-active"] : styles["icon-inactive"]
                    } -mt-1`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 19l-7-7h14z" />
                </svg>
            </span>
        </button>
    )
}
