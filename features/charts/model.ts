export interface StockHistory {
  date: string;
  quantity: number;
}

export type StockHistoryMap = Record<string, StockHistory[]>;
