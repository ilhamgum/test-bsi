"use client"

import Badge from "@/components/atoms/badge"

import { useAuthStore } from "@/features/auth/store"

interface NavbarProps {
    onMenuToggle: () => void
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
    const { currentRole, setRole } = useAuthStore()

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuToggle}
                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Stock Management</h1>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Logged in as:</span>
                <select
                    value={currentRole}
                    onChange={(e) => setRole(e.target.value as "staff" | "officer")}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
