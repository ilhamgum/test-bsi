"use client"

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
            className="inline-flex items-center gap-1 text-left text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-700"
            aria-label={`Sort by ${label}`}
        >
            {label}
            <span className="flex flex-col">
                <svg
                    className={`h-3 w-3 ${isActive && currentDirection === "asc" ? "text-blue-600" : "text-gray-300"}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 5l7 7H5z" />
                </svg>
                <svg
                    className={`-mt-1 h-3 w-3 ${
                        isActive && currentDirection === "desc" ? "text-blue-600" : "text-gray-300"
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 19l-7-7h14z" />
                </svg>
            </span>
        </button>
    )
}
