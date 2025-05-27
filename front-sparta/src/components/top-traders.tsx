"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EmptyChart } from "./empty-chart";

interface TopTradersProps {
  data: { traderId: string; volume: number }[];
}

export function TopTraders({ data = [] }: TopTradersProps) {
  if (data.length == 0) {
    return <EmptyChart type="Top Traders"/>
  }
  return (
    <div className="space-y-4">
      <CardHeader>
        <CardTitle>Top Traders By Volume</CardTitle>
        <CardDescription>from the past 6 months</CardDescription>
      </CardHeader>
      {data.map((item) => {
        const isUp = Math.random() < 0.5;
        return (
          <Card key={item.traderId} className="flex justify-between items-center w-[500px]">
            <CardHeader>
              <CardTitle>{item.traderId}</CardTitle>
              <CardDescription>{item.volume} trade volume</CardDescription>
            </CardHeader>
            <div className="p-2">
              {isUp ? (
                <ArrowUp className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-500" />
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}