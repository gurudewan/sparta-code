import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function InsightCard({ title, value }: { title: string, value: string }) {
    return (
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>{title}</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {value}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        
    )
  }
  