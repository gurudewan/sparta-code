"use client"

import { DataTable } from "@/components/data-table"
import { useAtom } from 'jotai'
import { tradesAtom } from "@/store/atoms"
import { useEffect } from "react"
import { getTrades } from "@/networker/networker"

export default function TradesPage() {
  const [trades, setTrades] = useAtom(tradesAtom)

  const fetchTrades = async () => {
    let data = await getTrades()
    console.log(data)
    setTrades(data.trades)
  }

  useEffect(() => {
    fetchTrades()
  }, [])

  return (
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DataTable data={trades} />
            </div>
          </div>
  )
}
