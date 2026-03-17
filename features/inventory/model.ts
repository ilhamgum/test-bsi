import RequestStatus from "@/common/constants/request-status"
import RequestType from "@/common/constants/request-type"

export { RequestStatus, RequestType }

export interface StockItem {
    id: string
    sku: string
    productName: string
    category: string
    price: number
    quantity: number
    supplier: string
    createdAt: string
    lastUpdated?: string
}

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
    fetchItems: () => Promise<void>
    createRequest: (type: RequestType, payload: Partial<StockItem>, originalData?: StockItem | null) => Promise<void>
    approveRequest: (requestId: string) => Promise<void>
    rejectRequest: (requestId: string, reason?: string) => Promise<void>
}
