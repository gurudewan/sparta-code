"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import {EmptyChart} from "./empty-chart"

interface PieChartProps {
    title: string
    description: string
    data: { name: string; value: number }[]
}

const PALETTE = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
]

export function PieChartCard({ title, description, data = [] }: PieChartProps) {


    const chartConfig = data.reduce((acc, item, idx) => {
        acc[item.name] = {
            label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            color: PALETTE[idx % PALETTE.length],
        }
        return acc
    }, {})

    const chartData = data.map((item, idx) => ({
        name: item.name,
        value: item.value,
        fill: PALETTE[idx % PALETTE.length],
    }))

    if (data.length == 0) {
        return <EmptyChart type="Pie Chart"/>
    }


    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="value" nameKey="name" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing all trades over the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
