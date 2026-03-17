"use client"

import {
    type ChangeEvent,
    type InputHTMLAttributes,
    type SelectHTMLAttributes,
    type TextareaHTMLAttributes,
} from "react"

import styles from "./styles.module.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export default function Input({ label, error, className = "", id, ...props }: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
        <div className={styles["wrapper"]}>
            {label && (
                <label htmlFor={inputId} className={styles["label"]}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`${styles["input"]} ${error ? styles["input-error"] : ""} ${className}`}
                {...props}
            />
            {error && <p className={styles["error-text"]}>{error}</p>}
        </div>
    )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
    label?: string
    error?: string
    options: { value: string; label: string }[]
}

export function Select({ label, error, options, className = "", id, ...props }: SelectProps) {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
        <div className={styles["wrapper"]}>
            {label && (
                <label htmlFor={selectId} className={styles["label"]}>
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`${styles["select"]} ${error ? styles["select-error"] : ""} ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className={styles["error-text"]}>{error}</p>}
        </div>
    )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

export function Textarea({ label, error, className = "", id, ...props }: TextareaProps) {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
        <div className={styles["wrapper"]}>
            {label && (
                <label htmlFor={textareaId} className={styles["label"]}>
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={`${styles["textarea"]} ${error ? styles["textarea-error"] : ""} ${className}`}
                {...props}
            />
            {error && <p className={styles["error-text"]}>{error}</p>}
        </div>
    )
}
