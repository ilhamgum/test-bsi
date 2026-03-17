"use client"

import { createContext, useCallback, useContext, useState } from "react"

import styles from "./styles.module.css"

type ToastType = "success" | "error" | "info"

interface Toast {
    id: number
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} })

export function useToast() {
    return useContext(ToastContext)
}

let toastId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = ++toastId
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }, [])

    const typeStyles: Record<ToastType, string> = {
        success: styles["success"],
        error: styles["error"],
        info: styles["info"],
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className={styles["container"]}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${styles["toast"]} ${typeStyles[toast.type]}`}
                        role="alert"
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
