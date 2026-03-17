"use client"

import { type ChangeEvent, type InputHTMLAttributes } from "react"

import Input from "@/components/atoms/input"

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string
    type?: string
    value: string | number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string
    placeholder?: string
    required?: boolean
}

export default function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    required,
}: FormFieldProps) {
    return (
        <Input
            label={label}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            error={error}
            placeholder={placeholder}
            required={required}
            aria-required={required}
        />
    )
}
