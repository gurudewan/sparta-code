import { Trade } from '@/models/models';
import { atom } from 'jotai';

// for inputting a trade
export const commodityAtom = atom<string>('');
export const traderIdAtom = atom<string>('');
export const priceAtom = atom<number | null>(null);
export const quantityAtom = atom<number | null>(null);

// for trades
export const tradesAtom = atom<Trade[]>([]);

// for pagination
export const pageAtom = atom<number>(1);
export const pageSizeAtom = atom<number>(10);

// for insights
export const insightsAtom = atom<any>({});
