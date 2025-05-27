"use client"

import React from "react"
import { PieChart as RePieChart, Pie } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface SimplePieChartProps<T> {
  data: T[]
  dataKey: keyof T
  nameKey: keyof T
  config: ChartConfig
  title?: string
  description?: string
  footerContent?: React.ReactNode
  className?: string
}

export function SimplePieChart<T extends Record<string, any>>({
  data,
  dataKey,
  nameKey,
  config,
  title = "Pie Chart",
  description,
  footerContent,
  className = "mx-auto aspect-square max-h-[250px]",
}: SimplePieChartProps<T>) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={config} className={className}>
          <RePieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey={String(dataKey)}
              nameKey={String(nameKey)}
            />
          </RePieChart>
        </ChartContainer>
      </CardContent>
      {footerContent && (
        <CardFooter className="flex-col gap-2 text-sm">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  )
}
