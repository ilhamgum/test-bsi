"use client"

import { createContext, useCallback, useContext, useState } from "react"

import ToastType from "@/common/constants/toast-type"

import styles from "./styles.module.css"

export { ToastType }

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

    const showToast = useCallback((message: string, type: ToastType = ToastType.SUCCESS) => {
        const id = ++toastId
        setToasts((prev) => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3000)
    }, [])

    const typeStyles: Record<ToastType, string> = {
        [ToastType.SUCCESS]: styles["success"],
        [ToastType.ERROR]: styles["error"],
        [ToastType.INFO]: styles["info"],
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className={styles["container"]}>
                {toasts.map((toast) => (
                    <div key={toast.id} className={`${styles["toast"]} ${typeStyles[toast.type]}`} role="alert">
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
