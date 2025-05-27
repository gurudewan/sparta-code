export enum Commodity {
  GOLD = "Gold",
  OIL = "Oil",
  SILVER = "Silver",
}

export interface Trade {
  id: string;
  commodity: Commodity;
  traderId: string;
  price: number;
  quantity: number;
  timestamp: string;
}