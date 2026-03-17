"use client"

import { type ButtonHTMLAttributes } from "react"

import styles from "./styles.module.css"

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    isLoading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: styles["primary"],
    secondary: styles["secondary"],
    danger: styles["danger"],
    ghost: styles["ghost"],
}

export default function Button({
    variant = "primary",
    isLoading = false,
    children,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles["button"]} ${variantStyles[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg className={styles["spinner"]} viewBox="0 0 24 24" fill="none">
                    <circle className={styles["opacity-25"]} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className={styles["opacity-75"]}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
            {children}
        </button>
    )
}
