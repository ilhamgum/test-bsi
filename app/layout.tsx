import { Inter } from "next/font/google"

import type { Metadata } from "next"

import "./globals.css"
import ClientProviders from "./providers"

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Stock Management Dashboard",
    description: "Internal stock management tool with maker-checker approval workflow",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    )
}
