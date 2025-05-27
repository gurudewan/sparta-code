"use client"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { PieChartCard } from "@/components/pie-chart"
import { BarChartCard } from "@/components/bar-chart"
import { getInsights } from "@/networker/networker"
import { useEffect } from "react"
import { insightsAtom } from "@/store/atoms"
import { useAtom } from "jotai"

import { formatInsights } from "@/helpers/dataMorpher"

import { TopTraders } from "@/components/top-traders"

export default function InsightsPage() {

  const [insights, setInsights] = useAtom(insightsAtom)

  const fetchAndFormatInsights = async () => {
    let rawInsights = await getInsights()
    console.log(rawInsights)
    let formattedInsights = formatInsights(rawInsights)
    console.log(formattedInsights)
    setInsights(formattedInsights)
  }

  useEffect(() => {
    fetchAndFormatInsights()
  }, [])

  return (

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex flex-row gap-4">
                <PieChartCard data={insights.totalVolumeByCommodity} title="Total Volume By Commodity" description="Total volume of each commodity"/>
                <BarChartCard data={insights.averagePriceByCommodity} title="Average Price By Commodity" description="Average price of each commodity"/>
                <TopTraders data={insights.topTradersByVolume}/>

              </div>
              <div className="flex justify-center">
              </div>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>

            </div>
          </div>
        </div>
  )
}
