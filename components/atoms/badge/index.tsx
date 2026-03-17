"use client"

import styles from "./styles.module.css"

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info"

interface BadgeProps {
    variant?: BadgeVariant
    children: React.ReactNode
    className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
    default: styles["default"],
    success: styles["success"],
    warning: styles["warning"],
    danger: styles["danger"],
    info: styles["info"],
}

export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
    return <span className={`${styles["badge"]} ${variantStyles[variant]} ${className}`}>{children}</span>
}
