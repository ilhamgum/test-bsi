"use client"

import { useState } from "react"

import Navbar from "@/components/organisms/navbar"
import Sidebar from "@/components/organisms/sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen flex-col">
            <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">{children}</main>
            </div>
        </div>
    )
}
