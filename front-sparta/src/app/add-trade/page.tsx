"use client"
import React, {useEffect, useState} from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { useAtom } from 'jotai';
import { commodityAtom, traderIdAtom, priceAtom, quantityAtom } from '../../store/atoms';
import { postTrade } from '../../networker/networker';
import { Commodity } from '@/models/models';
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { PoundSterlingIcon } from 'lucide-react';

const tradeSchema = z.object({
  commodity: z.string().nonempty("Commodity required"),
  traderId: z.string().nonempty("Trader ID required"),
  price: z.number().min(0.01, "Price must be positive"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export default function AddTradePage() {
  const [commodity, setCommodity] = useAtom(commodityAtom);
  const [traderId, setTraderId] = useAtom(traderIdAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const [quantity, setQuantity] = useAtom(quantityAtom);
  const [validInputs, setValidInputs] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const result = tradeSchema.safeParse({ commodity, traderId, price, quantity });
    setValidInputs(result.success);
  }, [commodity, traderId, price, quantity]);

  const handleSubmit = async () => {
    try {
      await postTrade({commodity, traderId, price, quantity});
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to add trade: " + err.message,
        variant: "destructive",
        action: <ToastAction altText="Try again" onClick={handleSubmit}>Try again</ToastAction>,
      })
    } finally {
      setValidInputs(false);
      setCommodity("");
      setTraderId("");
      setPrice(null);
      setQuantity(null);
      toast({
        title: "Added",
        description: "Trade added successfully",
      })
    }
  };

  return (
    <div className="mt-20 space-y-4 w-full max-w-[500px] mx-auto">
      <div>
        <Select value={commodity} onValueChange={setCommodity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Commodity" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Commodity).map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input placeholder="Trader ID" value={traderId} onChange={e => setTraderId(e.target.value)} />
      </div>
      <div>
      <Input type="number" placeholder="Price" value={price == null ? '' : price} onChange={e => setPrice(e.target.value === '' ? null : Number(e.target.value))} />
      </div>
      <div>
        <Input type="number" placeholder="Quantity" value={quantity == null ? '' : quantity} onChange={e => setQuantity(e.target.value === '' ? null : Number(e.target.value))} />
      </div>  
      <Button onClick={handleSubmit} disabled={!validInputs}>Submit Trade</Button>
    </div>
  );
}
