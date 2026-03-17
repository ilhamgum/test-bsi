import { StockHistory, StockHistoryMap } from "@/features/charts/model"
import { StockItem } from "@/features/inventory/model"

function generateHistoryForItem(item: StockItem): StockHistory[] {
    const history: StockHistory[] = []
    const now = new Date()
    let quantity = item.quantity

    for (let i = 29; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        // RANDOM FLUCTUATION: -15% TO +15% OF CURRENT QUANTITY
        const change = Math.floor(quantity * (Math.random() * 0.3 - 0.15))
        quantity = Math.max(0, quantity + change)

        history.push({
            date: date.toISOString().split("T")[0],
            quantity,
        })
    }

    // MAKE THE LAST ENTRY MATCH THE CURRENT QUANTITY
    if (history.length > 0) {
        history[history.length - 1].quantity = item.quantity
    }

    return history
}

export function generateStockHistory(items: StockItem[]): StockHistoryMap {
    const historyMap: StockHistoryMap = {}

    for (const item of items) {
        historyMap[item.id] = generateHistoryForItem(item)
    }

    return historyMap
}
