"use client"

import { useEffect, useState } from "react"

import Button from "@/components/atoms/button"
import FormField from "@/components/molecules/form-field"
import Modal from "@/components/organisms/modal"

import { StockItem } from "@/features/inventory/model"

import styles from "./styles.module.css"

interface StockFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Partial<StockItem>) => void
    initialData?: StockItem | null
    isLoading?: boolean
}

interface FormData {
    sku: string
    productName: string
    category: string
    price: string
    quantity: string
    supplier: string
}

const EMPTY_FORM: FormData = {
    sku: "",
    productName: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
}

export default function StockFormModal({ isOpen, onClose, onSubmit, initialData, isLoading }: StockFormModalProps) {
    const [form, setForm] = useState<FormData>(EMPTY_FORM)
    const [errors, setErrors] = useState<Partial<FormData>>({})

    const isEdit = !!initialData

    useEffect(() => {
        if (initialData) {
            setForm({
                sku: initialData.sku,
                productName: initialData.productName,
                category: initialData.category,
                price: initialData.price.toString(),
                quantity: initialData.quantity.toString(),
                supplier: initialData.supplier,
            })
        } else {
            setForm(EMPTY_FORM)
        }
        setErrors({})
    }, [initialData, isOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {}
        if (!form.sku.trim()) newErrors.sku = "SKU is required"
        if (!form.productName.trim()) newErrors.productName = "Product name is required"
        if (!form.category.trim()) newErrors.category = "Category is required"
        if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) < 0)
            newErrors.price = "Valid price is required"
        if (!form.quantity.trim() || isNaN(Number(form.quantity)) || Number(form.quantity) < 0)
            newErrors.quantity = "Valid quantity is required"
        if (!form.supplier.trim()) newErrors.supplier = "Supplier is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        onSubmit({
            sku: form.sku.trim(),
            productName: form.productName.trim(),
            category: form.category.trim(),
            price: Number(form.price),
            quantity: Number(form.quantity),
            supplier: form.supplier.trim(),
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Stock Item" : "Add New Stock Item"}>
            <form onSubmit={handleSubmit} className={styles["form"]}>
                <FormField
                    label="SKU"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    error={errors.sku}
                    placeholder="e.g., WH-ELC-016"
                    required
                />
                <FormField
                    label="Product Name"
                    name="productName"
                    value={form.productName}
                    onChange={handleChange}
                    error={errors.productName}
                    placeholder="e.g., Industrial Motor 10HP"
                    required
                />
                <FormField
                    label="Category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    error={errors.category}
                    placeholder="e.g., Electronics"
                    required
                />
                <div className={styles["grid-cols-2"]}>
                    <FormField
                        label="Price ($)"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        error={errors.price}
                        placeholder="0.00"
                        required
                    />
                    <FormField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={handleChange}
                        error={errors.quantity}
                        placeholder="0"
                        required
                    />
                </div>
                <FormField
                    label="Supplier"
                    name="supplier"
                    value={form.supplier}
                    onChange={handleChange}
                    error={errors.supplier}
                    placeholder="e.g., PT. Supplier Name"
                    required
                />

                <div className={styles["actions-container"]}>
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEdit ? "Submit Update Request" : "Submit Creation Request"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
