export interface StockItem {
    id: string
    sku: string
    productName: string
    category: string
    price: number
    quantity: number
    supplier: string
    createdAt: string
}

export type RequestType = "create" | "update" | "delete"
export type RequestStatus = "pending" | "approved" | "rejected"

export interface PendingRequest {
    id: string
    type: RequestType
    itemId: string | null
    payload: Partial<StockItem>
    originalData: StockItem | null
    status: RequestStatus
    createdAt: string
    rejectionReason?: string
}

export interface InventoryState {
    items: StockItem[]
    pendingRequests: PendingRequest[]
    isLoading: boolean

    // ASYNC MOCK API ACTIONS
    fetchItems: () => Promise<void>
    createRequest: (type: RequestType, payload: Partial<StockItem>, originalData?: StockItem | null) => Promise<void>
    approveRequest: (requestId: string) => Promise<void>
    rejectRequest: (requestId: string, reason?: string) => Promise<void>
}
