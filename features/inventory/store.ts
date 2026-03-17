"use client"

import { v4 as uuidv4 } from "uuid"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import RequestStatus from "@/common/constants/request-status"
import RequestType from "@/common/constants/request-type"

import { SEED_INVENTORY } from "@/mocks/inventory/list"

import { InventoryState, PendingRequest, StockItem } from "./model"

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export const useInventoryStore = create<InventoryState>()(
    persist(
        (set, get) => ({
            items: SEED_INVENTORY,
            pendingRequests: [],
            isLoading: false,

            fetchItems: async () => {
                set({ isLoading: true })
                await delay()
                set({ isLoading: false })
            },

            createRequest: async (type: RequestType, payload: Partial<StockItem>, originalData?: StockItem | null) => {
                set({ isLoading: true })
                await delay()

                const newRequest: PendingRequest = {
                    id: uuidv4(),
                    type,
                    itemId: type === RequestType.CREATE ? null : (originalData?.id ?? null),
                    payload,
                    originalData: originalData ?? null,
                    status: RequestStatus.PENDING,
                    createdAt: new Date().toISOString(),
                }

                set((state) => ({
                    pendingRequests: [...state.pendingRequests, newRequest],
                    isLoading: false,
                }))
            },

            approveRequest: async (requestId: string) => {
                set({ isLoading: true })
                await delay()

                const state = get()
                const request = state.pendingRequests.find((r) => r.id === requestId)

                if (!request) {
                    set({ isLoading: false })
                    return
                }

                let updatedItems = [...state.items]

                switch (request.type) {
                    case RequestType.CREATE: {
                        const newItem: StockItem = {
                            id: uuidv4(),
                            sku: request.payload.sku ?? "",
                            productName: request.payload.productName ?? "",
                            category: request.payload.category ?? "",
                            price: request.payload.price ?? 0,
                            quantity: request.payload.quantity ?? 0,
                            supplier: request.payload.supplier ?? "",
                            createdAt: new Date().toISOString(),
                        }
                        updatedItems.push(newItem)
                        break
                    }
                    case RequestType.UPDATE: {
                        updatedItems = updatedItems.map((item) =>
                            item.id === request.itemId ? { ...item, ...request.payload } : item
                        )
                        break
                    }
                    case RequestType.DELETE: {
                        updatedItems = updatedItems.filter((item) => item.id !== request.itemId)
                        break
                    }
                }

                set({
                    items: updatedItems,
                    pendingRequests: state.pendingRequests.map((r) =>
                        r.id === requestId ? { ...r, status: RequestStatus.APPROVED } : r
                    ),
                    isLoading: false,
                })
            },

            rejectRequest: async (requestId: string, reason?: string) => {
                set({ isLoading: true })
                await delay()

                set((state) => ({
                    pendingRequests: state.pendingRequests.map((r) =>
                        r.id === requestId
                            ? {
                                  ...r,
                                  status: RequestStatus.REJECTED,
                                  rejectionReason: reason,
                              }
                            : r
                    ),
                    isLoading: false,
                }))
            },
        }),
        {
            name: "inventory-storage",
        }
    )
)
